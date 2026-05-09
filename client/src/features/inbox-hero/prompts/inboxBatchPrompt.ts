/**
 * Jedno zapytanie do czatu — odpowiedź musi zawierać dokładnie 4 syntetyczne maile
 * z kompletnymi polami (symulator Inbox Hero / phishing vs. legitimacja).
 */

export const INBOX_BATCH_GENERATION_PROMPT = `Jesteś generatorem danych dla symulatora poczty biurowej (PL): „Phishing Simulator: Inbox Hero”.
Wygeneruj DOKŁADNIE 4 różne wiadomości e-mail jak poranna skrzynka — po polsku, naturalnie, jak prawdziwe krótkie maile robocze.

WYMAGANA KOLEJNOŚĆ I RODZAJ (indeks w tablicy 0→3):
1) Phishing „znana firma”: isPhishing true; nadawca z LEPIEJ PODCHWYTUJĄCYM mailem (literówka / homoglif w domenie np 1 zamiast l i tak dalej). Co najmniej jeden chunk typu „tip” (pole value = podejrzany fragment, pole lesson po polsku). Tablica „actions” z dokładnie jednym obiektem: label, apparentLabel (np. zaufany serwis), href (inna/dziwna adresacja), hoverLesson po polsku.
2) Neutralny komunikat LEGIT od firmowej domeny wymyślonej organizacji (np. @firma-przyklad.pl): isPhishing false; paragraphs tylko z chunkami „text”; żadnego „tip”; brak przycisków płatności (actions: [] lub pomijasz klucz); legitInsight 1–3 zdań czemu wygląda wiarygodnie.
3) Phishing kurierski / dostawa / mała dopłata: isPhishing true; domena osobna, np. .xyz lub .icu; presja czasu; co najmniej jeden „tip”; actions jak w (1).
4) Legit IT / biuro / kalendarz: isPhishing false; bez „tip”; paragraphs tylko „text”; bez obcych linków phishingowych; legitInsight jak w (2).

Dla WIADOMOŚCI FISHINGowych legitInsight ustaw jako pusty string "".
Każdy mail ma niepowtarzalne fromName/fromAddress/subject.
Kolejność elementów 1-4 możesz zamienić według uznania.

Zwróć WYŁĄCZNIE jeden obiekt JSON (bez znacznika markdown, bez tekstu poza JSON), schemat dokładnie:
{
  "emails": [
    {
      "id": "opcjonalny string; przy pominięciu klient nada identyfikator",
      "fromName": "",
      "fromAddress": "",
      "subject": "",
      "timeLabel": "HH:MM",
      "isPhishing": true,
      "legitInsight": "",
      "paragraphs": [ { "chunks": [ {"type":"text","value":"" }, {"type":"tip","value":"","lesson":"" } ] } ],
      "actions": [ { "label":"","apparentLabel":"","href":"","hoverLesson":"" } ]
    },
    { "... drugi mail — uczciwy, bez tip i bez lub pustej actions ..." },
    { "... trzeci — phishing kurierski ..." },
    { "... czwarty — legit IT ..." }
  ]
}

W tablicy „emails” MUSZĄ być RÓWNO 4 elementy. Zachowaj strukturę paragraphs (tablica akapitów → chunks). Nie dodawaj pól poza podanymi.`
