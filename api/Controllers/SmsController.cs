using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using api.Data;
using api.Models;
using Google.GenAI;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/sms")]
public class SmsController : ControllerBase
{
    private readonly Client _geminiClient;

    private const string GeminiModel = "models/gemini-3.1-flash-lite";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    /// <summary>
    /// Buduje prompt z losowym przykładem scamu z <see cref="SmsScamExamples"/> (inspiracja stylu, nie kopia 1:1).
    /// </summary>
    private static string BuildGeneratorPrompt(string scamExampleSeed)
    {
        var sb = new StringBuilder();
        sb.AppendLine(
            """
            Jesteś generatorem scenariuszy edukacyjnych dla polskiej gry „SMS Lab”.
            Wygeneruj DOKŁADNIE JEDEN przykład SMS (krótki, realistyczny, po polsku).

            Losowo (około 50/50) ustaw isScam na true albo false.

            Gdy isScam jest true:
            - Symuluj phishing / oszustwo SMS: presja czasu, fałszywy „link” w treści (WPISZ GO JAK ZWYKŁY TEKST — domeny podejrzane, NIE kopiuj oficjalnych adresów instytucji).
            - Nadawca może udawać InPost, mObywatel, bank, operatora, PGE itd.
            - Możesz czerpać inspirację z poniższego LOSOWEGO przykładu z bazy (format wieloliniowy, skróty, podejrzany URL) — ale WYMYŚL NOWĄ treść i nadawcę; NIE kopiuj przykładu dosłownie ani słowo w słowo.

            Gdy isScam jest false:
            - Typowa uczciwa wiadomość: np. kod 2FA bez linku, przypomnienie o paczce w punkcie BEZ linku, krótka informacja serwisowa bez żądania płatności.
            - Zignoruj styl phishingu z przykładu poniżej — nie naśladuj go w treści.

            explanation: po polsku, 2–4 zdania — dlaczego to oszustwo albo dlaczego uczciwe (wskaż sygnały: domena, presja, brak linku, styl).

            id: krótki identyfikator po angielsku, kebab-case, np. "fake-inpost-01".

            Odpowiedz WYŁĄCZNIE jednym obiektem JSON. Bez markdown, bez ```, bez komentarzy, bez tekstu przed ani po.
            Schema:
            {"id":"string","sender":"string","content":"string","isScam":true,"explanation":"string"}
            """);
        sb.AppendLine();
        sb.AppendLine("---");
        sb.AppendLine("LOSOWY PRZYKŁAD SCAMU Z BAZY (inspiracja — nie duplikuj):");
        sb.AppendLine(scamExampleSeed);
        sb.AppendLine("---");
        return sb.ToString();
    }

    public SmsController(Client geminiClient)
    {
        _geminiClient = geminiClient;
    }

    [HttpGet("random")]
    [ProducesResponseType(typeof(SmsScenario), StatusCodes.Status200OK)]
    public async Task<ActionResult<SmsScenario>> GetRandom()
    {
        try
        {
            var scamExample = SmsScamExamples.PickRandom();
            var prompt = BuildGeneratorPrompt(scamExample);

            var response = await _geminiClient.Models.GenerateContentAsync(
                model: GeminiModel,
                contents: prompt);

            var raw = response.Candidates?[0]?.Content?.Parts?[0]?.Text;
            if (string.IsNullOrWhiteSpace(raw))
                return StatusCode(502, new { error = "Pusta odpowiedź modelu Gemini." });

            var json = ExtractJsonObject(raw);
            var scenario = JsonSerializer.Deserialize<SmsScenario>(json, JsonOptions);

            if (scenario is null || string.IsNullOrWhiteSpace(scenario.Content))
                return StatusCode(502, new { error = "Nie udało się sparsować scenariusza SMS z odpowiedzi modelu." });

            if (string.IsNullOrWhiteSpace(scenario.Id))
                scenario.Id = Guid.NewGuid().ToString("n")[..12];

            if (string.IsNullOrWhiteSpace(scenario.Sender))
                scenario.Sender = "Nieznany";

            if (string.IsNullOrWhiteSpace(scenario.Explanation))
                scenario.Explanation = scenario.IsScam
                    ? "Wiadomość została oznaczona jako próba oszustwa — zweryfikuj nadawcę i nie klikaj podejrzanych linków."
                    : "Wiadomość wygląda na typową, uczciwą komunikację — nadal zachowaj ostrożność w sieci.";

            return Ok(scenario);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    /// <summary>
    /// Wycina pierwszy obiekt JSON z odpowiedzi (model czasem owija w ```json).
    /// </summary>
    private static string ExtractJsonObject(string raw)
    {
        var t = raw.Trim();

        var fence = Regex.Match(
            t,
            @"```(?:json)?\s*([\s\S]*?)\s*```",
            RegexOptions.IgnoreCase);
        if (fence.Success)
            t = fence.Groups[1].Value.Trim();

        var start = t.IndexOf('{');
        var end = t.LastIndexOf('}');
        if (start >= 0 && end > start)
            return t[start..(end + 1)];

        return t;
    }
}
