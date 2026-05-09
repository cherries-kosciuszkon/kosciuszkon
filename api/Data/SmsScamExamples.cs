namespace api.Data;

/// <summary>
/// Przykładowe treści phishingowe (edukacja) — wykorzystywane jako „ziarno” stylu w prompcie do Gemini.
/// </summary>
public static class SmsScamExamples
{
    public static IReadOnlyList<string> Examples { get; } =
    [
        """
        Twoja paczka nie moze
        zostac dostarczona
        ze wzgledu na brak
        adresu. Mozesz
        zaktualizowac swoj
        adres online i poprosic
        o nowa dostawe: https://inpost-zcr.top/fddgJh
        """.Trim().ReplaceLineEndings("\n"),

        """
        mObywatel: zarejestrowano
        przekroczenie predkosci pojazdu.
        Prosze sprawdzic status mandatu.
        https://gov-pl.cfd/pls
        """.Trim().ReplaceLineEndings("\n"),

        """
        Uwaga! Wykrylismy podejrzane ruchy
        na Pana koncie, prosze oczekiwac na
        konkontakt. Opiekun sprawy Pawel
        Malinowski ID 1318985 nr Sprawy
        SL9628. Nest Bank SA
        """.Trim().ReplaceLineEndings("\n"),

        """
        SKARGA NA CZYNNOSCI
        ADWOKATA

        na podstawie ustawy z dnia 26
        maja 1982 r. Prawo o
        adwokaturze

        https://adwokat

        Numer wpisu KRA/Adw/2057
        """.Trim().ReplaceLineEndings("\n"),

        """
        UWAGA! CSIRT
        NASK ostrzega
        przed kampania
        phishingowa
        wykorzystujaca
        wizerunek
        Ministerstwa
        Finansow!

        http://idz.do/735
        """.Trim().ReplaceLineEndings("\n"),
    ];

    public static string PickRandom()
    {
        var list = Examples;
        return list[Random.Shared.Next(list.Count)];
    }
}
