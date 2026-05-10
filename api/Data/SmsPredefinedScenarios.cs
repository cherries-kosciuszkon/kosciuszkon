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
        new()
        {
            Id = "fake-pge-bill",
            Sender = "PGE Polska",
            Content =
                """
                Informujemy o
                zaleglosci na kwote
                12,47 PLN. Brak
                platnosci do godz.
                18:00 spowoduje
                odciecie energii.

                https://pge-oplata.net/oplac
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Fałszywa domena i wywieranie presji czasu. Operatorzy energetyczni nie wysyłają gróźb odłączenia prądu przez linki do przypadkowych stron.",
        },
        new()
        {
            Id = "fake-zus-refund",
            Sender = "ZUS",
            Content =
                """
                ZUS: wykryto nadplate
                skladki zdrowotnej.
                Aby odebrac zwrot
                prosimy potwierdzic
                dane rachunku:

                https://zus-pl.cc/zwrot
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Podejrzana domena i próba wyłudzenia danych bankowych. Zwroty z ZUS są realizowane oficjalnymi kanałami, bez takich linków.",
        },
        new()
        {
            Id = "fake-netflix-payment",
            Sender = "Netflix",
            Content =
                """
                Twoja subskrypcja
                zostala wstrzymana
                z powodu bledu
                platnosci. Zweryfikuj
                metode platnosci:

                http://netflix-user.info/pay
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Nietypowa domena i link HTTP bez szyfrowania. Serwisy streamingowe nie używają takich adresów do logowania.",
        },
        new()
        {
            Id = "fake-orlen-voucher",
            Sender = "ORLEN",
            Content =
                """
                Gratulacje!
                Wygrales voucher
                paliwowy 300 PLN.
                Odbierz nagrode
                do konca dnia:

                https://orlen-bonus.click
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Typowa wiadomość phishingowa oparta o fałszywą wygraną i presję czasu. Oficjalne konkursy mają regulaminy i znane domeny.",
        },
        new()
        {
            Id = "fake-dhl-customs",
            Sender = "DHL Express",
            Content =
                """
                Przesylka oczekuje
                na oplate celna
                8,99 PLN. Brak
                doplaty zatrzyma
                dostawe paczki.

                https://dhl-track24.top/pay
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Fałszywa domena i drobna dopłata mająca skłonić do szybkiego kliknięcia. Firmy kurierskie nie używają losowych domen.",
        },
        new()
        {
            Id = "fake-whatsapp-security",
            Sender = "WhatsApp",
            Content =
                """
                Wykryto logowanie
                z nowego urzadzenia.
                Jesli to nie Ty,
                zabezpiecz konto:

                https://wa-secure-login.cfd
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Podszywanie się pod komunikator i użycie nieoficjalnej domeny. Tego typu linki służą zwykle do wyłudzania danych logowania.",
        },
        new()
        {
            Id = "fake-allegro-lock",
            Sender = "Allegro",
            Content =
                """
                Konto Allegro
                zostalo tymczasowo
                zablokowane z
                powodow bezpieczenstwa.

                Potwierdz dane:
                https://allegro-login.biz
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Nieoficjalna domena i próba wzbudzenia paniki. Allegro kieruje użytkowników do aplikacji lub oficjalnej strony.",
        },
        new()
        {
            Id = "fake-pko-token",
            Sender = "PKO BP",
            Content =
                """
                Wymagana ponowna
                aktywacja aplikacji
                IKO. Potwierdz dane
                klienta w ciagu
                30 minut.

                https://iko-logowanie.fit
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Bank nie wysyła takich próśb przez losowe domeny. Presja czasu i link do zewnętrznej strony są podejrzane.",
        },
        new()
        {
            Id = "fake-spotify-gift",
            Sender = "Spotify",
            Content =
                """
                Otrzymales darmowe
                Spotify Premium
                na 6 miesiecy.
                Aktywuj dostep:

                https://spotify-premium-free.sbs
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Podejrzana promocja i nieoficjalna domena. To częsty schemat phishingowy wykorzystujący darmowe oferty.",
        },
        new()
        {
            Id = "fake-pekao-verification",
            Sender = "Bank Pekao",
            Content =
                """
                Ze wzgledu na nowe
                przepisy wymagamy
                aktualizacji danych
                klienta do godziny
                20:00.

                https://pekao-secure.monster
                """.Trim().ReplaceLineEndings("\n"),
            IsScam = true,
            Explanation =
                "Fałszywa domena i pilny ton wiadomości. Aktualizacje danych bankowych wykonuje się po zalogowaniu do oficjalnej bankowości.",
        },
        new()
        {
            Id = "orange-roaming-legit",
            Sender = "Orange",
            Content =
                "Orange: Witamy w Czechach. Od 15.06 korzystasz z roamingu UE bez dodatkowych oplat zgodnie z posiadanym pakietem. Szczegoly w aplikacji Moj Orange.",
            IsScam = false,
            Explanation =
                "Typowy komunikat operatora po przekroczeniu granicy. Brak linków i próśb o dane logowania.",
        },
        new()
        {
            Id = "ikea-order-legit",
            Sender = "IKEA",
            Content =
                "IKEA: Zamowienie nr 441928 zostalo przygotowane do odbioru w punkcie Krakow Plaza. Odbior mozliwy do 14 maja po okazaniu numeru zamowienia.",
            IsScam = false,
            Explanation =
                "Standardowe powiadomienie o odbiorze zamówienia. Brak linków, płatności i podejrzanych działań.",
        },
        new()
        {
            Id = "google-code-legit",
            Sender = "Google",
            Content =
                "Google: Kod weryfikacyjny konta to 814225. Nie udostepniaj go nikomu. Jesli nie probowales sie logowac, zmien haslo.",
            IsScam = false,
            Explanation =
                "Typowa wiadomość bezpieczeństwa 2FA bez linków i bez próśb o kliknięcie.",
        },
        new()
        {
            Id = "dpd-delivery-legit",
            Sender = "DPD",
            Content =
                "DPD: Kurier dostarczy paczke dzisiaj w godzinach 13:15-14:15. Numer przesylki: 0092348821. Dziekujemy za skorzystanie z uslug DPD.",
            IsScam = false,
            Explanation =
                "Zwykłe powiadomienie kurierskie zawierające przedział czasowy i numer przesyłki bez linków.",
        },
        new()
        {
            Id = "pkp-ticket-legit",
            Sender = "PKP Intercity",
            Content =
                "PKP Intercity: Przypominamy o podrozy IC 3812 Krakow Glowny -> Warszawa Centralna dnia 12.05 o godz. 08:14. Milej podrozy.",
            IsScam = false,
            Explanation =
                "Naturalne przypomnienie o podróży. Brak linków i prób wyłudzenia danych.",
        },
        new()
        {
            Id = "medicover-visit-legit",
            Sender = "Medicover",
            Content =
                "Przypomnienie: wizyta u dr Anny Kowalskiej dnia 13.05 o godz. 16:20 w placowce Medicover przy ul. Opolskiej 114.",
            IsScam = false,
            Explanation =
                "Typowy SMS medyczny z datą i miejscem wizyty, bez podejrzanych linków.",
        },
        new()
        {
            Id = "revolut-transfer-legit",
            Sender = "Revolut",
            Content =
                "Revolut: Wyslano przelew na kwote 240,00 PLN do odbiorcy Jan Nowak. Jesli to nie Ty, zablokuj karte w aplikacji.",
            IsScam = false,
            Explanation =
                "Standardowe powiadomienie o operacji finansowej kierujące do aplikacji, bez linków.",
        },
        new()
        {
            Id = "upc-maintenance-legit",
            Sender = "Play",
            Content =
                "Play: W nocy z 14 na 15 maja w godz. 00:00-03:00 moga wystapic chwilowe przerwy w dostepie do internetu z powodu prac serwisowych.",
            IsScam = false,
            Explanation =
                "Informacja techniczna od operatora bez żądania danych i bez podejrzanych adresów.",
        },
        new()
        {
            Id = "bolt-ride-legit",
            Sender = "Bolt",
            Content =
                "Bolt: Kierowca Michal jest na miejscu odbioru. Toyota Corolla, KR7F219. Koszt przejazdu zostanie pobrany automatycznie po zakonczeniu kursu.",
            IsScam = false,
            Explanation =
                "Typowa wiadomość aplikacji przewozowej z danymi kierowcy i pojazdu.",
        },
        new()
        {
            Id = "cinema-city-legit",
            Sender = "Cinema City",
            Content =
                "Cinema City: Bilety na seans 'Diuna 3' dnia 17.05 o godz. 19:40 zostaly potwierdzone. Sala 7, miejsca F11-F12.",
            IsScam = false,
            Explanation =
                "Naturalne potwierdzenie rezerwacji kinowej bez linków i prób wyłudzenia informacji.",
        },
    ];

    public static SmsScenario PickRandom()
    {
        var list = All;
        return list[Random.Shared.Next(list.Count)];
    }
}
