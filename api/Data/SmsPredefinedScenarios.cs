using api.Models;

namespace api.Data;

/// <summary>
/// Predyfiniowane scenariusze SMS Lab (edukacja). Format zgodny z API: id, sender, content, isScam, explanation.
/// </summary>
public static class SmsPredefinedScenarios
{
    public static readonly IReadOnlyList<SmsScenario> All =
    [
        new()
        {
            Id = "inpost-fake-tracking",
            Sender = "InPost",
            Content =
                """
                Twoja paczka nie moze
                zostac dostarczona
                ze wzgledu na brak
                adresu. Mozesz
                zaktualizowac swoj
                adres online i poprosic
                o nowa dostawe: https://inpost-zcr.top/fddgJh
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Fałszywa domena (inpost-zcr.top zamiast oficjalnej InPost). Kurierzy nie proszą o dopłatę przez losowy link w SMS. Sprawdź przesyłkę tylko w aplikacji lub na znanym adresie firmy.",
        },
        new()
        {
            Id = "mobywatel-mandate-fake",
            Sender = "mObywatel",
            Content =
                """
                mObywatel: zarejestrowano
                przekroczenie predkosci pojazdu.
                Prosze sprawdzic status mandatu.
                https://gov-pl.cfd/pls
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Mandaty w Polsce nie są obsługiwane przez domeny typu gov-pl.cfd. Urzędowe komunikaty idą przez ePUAP, e-TOLL lub listy polecone — nie przez SMS z linkiem do nieznanej strony.",
        },
        new()
        {
            Id = "nest-bank-phish",
            Sender = "Nest Bank",
            Content =
                """
                Uwaga! Wykrylismy podejrzane ruchy
                na Pana koncie, prosze oczekiwac na
                konkontakt. Opiekun sprawy Pawel
                Malinowski ID 1318985 nr Sprawy
                SL9628. Nest Bank SA
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Bank nie informuje o „podejrzanych ruchach” SMS-em bez numeru infolinii i bez możliwości weryfikacji w aplikacji. Podejrzane jest wymuszanie kontaktu z „opiekunem” i podawanie numerów spraw bez oficjalnego kanału.",
        },
        new()
        {
            Id = "fake-lawyer-complaint",
            Sender = "KRA Adwokatura",
            Content =
                """
                SKARGA NA CZYNNOSCI
                ADWOKATA

                na podstawie ustawy z dnia 26
                maja 1982 r. Prawo o
                adwokaturze

                https://adwokat

                Numer wpisu KRA/Adw/2057
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Prawdziwe postępowania nie zaczynają się od SMS-a z niekompletnym linkiem (https://adwokat). To wywołanie lęku i kliknięcie w nieznany adres — klasyczny wzorzec phishingu.",
        },
        new()
        {
            Id = "fake-csirt-mf",
            Sender = "CSIRT NASK",
            Content =
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
            IsScam = true,
            Explanation =
                "Skrócone linki (idz.do) w SMS o „kampanii phishingowej” są sprzeczne z praktyką CERT — ostrzeżenia publikuje się na oficjalnych stronach, nie przez anonimowe skracacze.",
        },
        new()
        {
            Id = "mbank-2fa-legit",
            Sender = "mBank",
            Content =
                "mBank: Twój kod jednorazowy do logowania to 583914. Nie udostępniaj go nikomu. Kod ważny 3 min. Operacja: LOGOWANIE",
            IsScam = false,
            Explanation =
                "Typowa wiadomość 2FA: sam kod, krótki czas ważności, zakaz udostępniania, brak linku i brak żądania przelewu. Nadawca jest spójny z operacją.",
        },
        new()
        {
            Id = "paczkomat-pickup-no-link",
            Sender = "Paczkomaty 24/7",
            Content =
                "Paczka nr PL884920173 czeka w automacie przy ul. Słowackiego 12. Kod odbioru: 7391. Odbiór możliwy do niedzieli 22:00. W punkcie obowiązuje kolejka — prosimy o cierpliwość.",
            IsScam = false,
            Explanation =
                "Brak linku i płatności online, konkretna lokalizacja i kod skrytki — typowy wzorzec uczciwego powiadomienia (w razie wątpliwości sprawdź status w aplikacji przewoźnika).",
        },
    ];

    public static SmsScenario PickRandom()
    {
        var list = All;
        return list[Random.Shared.Next(list.Count)];
    }
}
