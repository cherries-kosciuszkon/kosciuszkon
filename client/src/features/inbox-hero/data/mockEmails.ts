import type { SimulatedEmail } from '../types'

export const INBOX_HERO_EMAILS: SimulatedEmail[] = [
  {
    id: 'e1',
    fromName: 'Microsoft Support',
    fromAddress: 'no-reply@mIcrosoft.com.pl',
    subject: 'Wykryto nietypowe logowanie do Twojego konta',
    timeLabel: '08:12',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Zauważyliśmy logowanie do Twojej poczty z nowej lokalizacji (Singapur). Jeśli to nie Ty, musisz natychmiast zabezpieczyć profil.',
          },
        ],
      },
      {
        chunks: [
          {
            type: 'text',
            value: 'Sprawdź dokładnie adres nadawcy: ',
          },
          {
            type: 'tip',
            value: 'mIcrosoft.com.pl',
            lesson:
              'W nazwie użyto wielkiej litery „I” zamiast małej litery „l”. To popularny trik wizualny. Dodatkowo globalna korporacja nie używałaby lokalnej subdomeny .com.pl do alertów bezpieczeństwa.',
          },
        ],
      },
    ],
    actions: [
      {
        label: 'Zabezpiecz konto teraz',
        apparentLabel: 'microsoft.com/security',
        href: 'https://mIcrosoft-security-fix.net/login',
        hoverLesson:
          'Podgląd linku wskazuje na domenę mIcrosoft-security-fix.net, która nie należy do firmy Microsoft. Etykieta przycisku ma jedynie uśpić Twoją czujność.',
      },
    ],
  },
  {
    id: 'e2',
    fromName: 'Katarzyna Wiśniewska (HR)',
    fromAddress: 'k.wisniewska@firma-przyklad.pl',
    subject: 'Aktualizacja regulaminu pracy',
    timeLabel: '08:45',
    isPhishing: false,
    legitInsight:
      'Wiadomość pochodzi z poprawnej domeny firmowej, a nadawca jest osobą faktycznie pracującą w dziale HR tej organizacji.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'Cześć, w załączniku przesyłam zaktualizowany regulamin pracy, o którym wspominaliśmy na ostatnim spotkaniu ogólnym. Proszę o zapoznanie się z sekcją dotyczącą pracy hybrydowej.',
          },
        ],
      },
    ],
    actions: [],
  },
  {
    id: 'e3',
    fromName: 'Centrum Dostaw',
    fromAddress: 'paczka@kurier-info.xyz',
    subject: 'Twoja przesyłka została wstrzymana',
    timeLabel: '09:15',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'Twoja paczka o numerze PL9928172 wymaga dopłaty 1,50 PLN z tytułu niedopłaty celnej. Brak wpłaty w ciągu 2 godzin spowoduje zwrot przesyłki.',
          },
        ],
      },
      {
        chunks: [
          {
            type: 'text',
            value: 'Zwróć uwagę na końcówkę adresu nadawcy: ',
          },
          {
            type: 'tip',
            value: '.xyz',
            lesson:
              'Domeny .xyz, .icu czy .top są często wykorzystywane przez oszustów, ponieważ są bardzo tanie w rejestracji. Oficjalne firmy kurierskie używają znanych rozszerzeń krajowych jak .pl.',
          },
        ],
      },
    ],
    actions: [
      {
        label: 'Dopłać 1,50 PLN',
        apparentLabel: 'paczkomaty.pl/platnosc',
        href: 'https://bramka-platnosci-paczka.xyz/pay',
        hoverLesson:
          'Link prowadzi do nieznanego serwisu w domenie .xyz. Oszuści stosują presję czasu i niską kwotę, aby skłonić do szybkiego podania danych karty.',
      },
    ],
  },
  {
    id: 'e4',
    fromName: 'IT Helpdesk',
    fromAddress: 'helpdesk@firma-przyklad.pl',
    subject: 'Zaproszenie: Nowa polityka haseł (Kalendarz)',
    timeLabel: '10:30',
    isPhishing: false,
    legitInsight:
      'Mail jest spójny z wewnętrzną komunikacją techniczną firmy i odnosi się do realnych systemów używanych wewnątrz organizacji.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'Cześć, wysłałem Ci zaproszenie do kalendarza na krótkie szkolenie z obsługi nowego menedżera haseł. Spotkanie odbędzie się w czwartek o 14:00 na Teamsach.',
          },
        ],
      },
    ],
    actions: [],
  },
  {
    id: 'e5',
    fromName: 'Netflix Polska',
    fromAddress: 'no-reply@netfIix.pl',
    subject: 'Twoje członkostwo wygaśnie za 24 godziny',
    timeLabel: '11:05',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Wystąpił problem z Twoją ostatnią metodą płatności. Zaktualizuj dane, aby uniknąć przerwy w dostępie do serwisu.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Przyjrzyj się domenie: ' },
          {
            type: 'tip',
            value: 'netfIix.pl',
            lesson: 'Zastosowano wielką literę „I” zamiast małej „l” (netfIix). To klasyczny atak typu typo-squatting, mający na celu zmylenie wzroku użytkownika.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zaktualizuj konto',
        apparentLabel: 'netflix.com/billing',
        href: 'https://netflix-billing-update.com.pl/verify',
        hoverLesson: 'Mimo że przycisk obiecuje przejście do oficjalnej strony, link prowadzi do zewnętrznej domeny .com.pl, która nie jest własnością Netflixa.'
      }
    ]
  },
  {
    id: 'e6',
    fromName: 'Administracja Budynku',
    fromAddress: 'biuro@firma-przyklad.pl',
    subject: 'Test systemów przeciwpożarowych – środa',
    timeLabel: '11:42',
    isPhishing: false,
    legitInsight: 'Wiadomość dotyczy spraw administracyjnych biura, wysłana z domeny firmowej i nie zawiera żadnych linków zewnętrznych ani próśb o logowanie.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Informujemy, że w najbliższą środę o godzinie 10:00 odbędzie się testowy alarm przeciwpożarowy. Prosimy o zachowanie spokoju, test potrwa około 15 minut.'
          }
        ]
      }
    ],
    actions: []
  },
  {
    id: 'e7',
    fromName: 'InPost Powiadomienia',
    fromAddress: 'paczka@inpost-weryfikacja.icu',
    subject: 'Twoja paczka trafiła do punktu zwrotnego',
    timeLabel: '12:15',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Próba doręczenia paczki nr 522100928 nie powiodła się. Wymagana jest weryfikacja adresu dostawy przez poniższy formularz.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na podejrzaną domenę: ' },
          {
            type: 'tip',
            value: '.icu',
            lesson: 'Oficjalne firmy logistyczne nigdy nie korzystają z egzotycznych domen jak .icu czy .top. To sygnał alarmowy wskazujący na oszustwo.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Potwierdź adres',
        apparentLabel: 'inpost.pl/sledzenie',
        href: 'https://inpost-weryfikacja-danych.icu/form',
        hoverLesson: 'Presja czasu i wymóg „weryfikacji” danych to częsta technika phishingu mająca na celu wyłudzenie danych osobowych lub płatniczych.'
      }
    ]
  },
  {
    id: 'e8',
    fromName: 'Dział Marketingu',
    fromAddress: 'marketing@firma-przyklad.pl',
    subject: 'Nowe materiały graficzne do pobrania',
    timeLabel: '13:02',
    isPhishing: false,
    legitInsight: 'Wiadomość kieruje do wewnętrznego serwera plików (Intranet) i jest zgodna z bieżącymi działaniami firmy.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Cześć wszystkim, na naszym dysku wspólnym w folderze /BRANDING znajdziecie zaktualizowane logotypy i szablony prezentacji na rok 2026. Proszę o korzystanie tylko z tych wersji.'
          }
        ]
      }
    ],
    actions: []
  },
  {
    id: 'e9',
    fromName: 'Zespół Allegro',
    fromAddress: 'powiadomienia@allegro-pl.security',
    subject: 'Twoje konto zostało tymczasowo zawieszone',
    timeLabel: '14:20',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Wykryliśmy nieautoryzowaną próbę zakupu na Twoim koncie. Ze względów bezpieczeństwa zablokowaliśmy dostęp do portalu.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Spójrz na adres nadawcy: ' },
          {
            type: 'tip',
            value: 'allegro-pl.security',
            lesson: 'Oszuści często tworzą domeny, które brzmią bezpiecznie (np. z dopiskiem „security”), ale nie mają nic wspólnego z oficjalną stroną allegro.pl.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odblokuj konto',
        apparentLabel: 'allegro.pl/moje-konto',
        href: 'https://weryfikacja-uzytkownika-allegro.top/login',
        hoverLesson: 'Przycisk prowadzi do niebezpiecznej strony przechwytującej dane logowania. Pamiętaj, aby zawsze wpisywać adres banku lub portalu aukcyjnego ręcznie w przeglądarce.'
      }
    ]
  },
  {
    id: 'e10',
    fromName: 'System Kadrowy',
    fromAddress: 'kadry@firma-przyklad.pl',
    subject: 'Przypomnienie: Zaległe szkolenie BHP',
    timeLabel: '15:10',
    isPhishing: false,
    legitInsight: 'Standardowe przypomnienie systemowe wysyłane automatycznie do pracowników, którzy nie ukończyli obowiązkowych kursów.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Przypominamy o konieczności ukończenia okresowego szkolenia BHP w formie e-learningu. Termin upływa z końcem tego miesiąca. Link do platformy znajdziesz w panelu pracownika.'
          }
        ]
      }
    ],
    actions: []
  },

  {
    id: 'e11',
    fromName: 'Netflix Subskrypcja',
    fromAddress: 'no-reply@netflix-platnosci.net',
    subject: 'Twoje konto zostało zawieszone - wymagana aktualizacja płatności',
    timeLabel: '08:30',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Mamy problem z Twoją aktualną metodą płatności. Aby uniknąć przerwy w dostępie do serwisu, zaktualizuj swoje dane rozliczeniowe.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na domenę nadawcy: ' },
          {
            type: 'tip',
            value: 'netflix-platnosci.net',
            lesson: 'Oficjalne e-maile od Netflixa zawsze pochodzą z domeny netflix.com. Oszuści dodają słowa pomocnicze jak „platnosci”, aby uśpić Twoją czujność.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zaktualizuj konto',
        apparentLabel: 'netflix.com/payment',
        href: 'https://netflix-login-secure.net/update',
        hoverLesson: 'Link prowadzi do fałszywej strony logowania, która służy do kradzieży danych karty kredytowej.'
      }
    ]
  },
  {
    id: 'e12',
    fromName: 'Microsoft Teams',
    fromAddress: 'noreply@email.teams.microsoft.com',
    subject: 'Twoi koledzy wysyłają wiadomości w Teams',
    timeLabel: '09:15',
    isPhishing: false,
    legitInsight: 'Wiadomość pochodzi z oficjalnej subdomeny microsoft.com i zawiera standardowe podsumowanie aktywności bez podejrzanych linków zewnętrznych.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Masz 3 nieprzeczytane wiadomości od Anna Nowak i Tomasz Wilk. Zaloguj się, aby odpowiedzieć.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Otwórz Microsoft Teams',
        apparentLabel: 'teams.microsoft.com',
        href: 'https://teams.microsoft.com/',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e13',
    fromName: 'PGE Obsługa Klienta',
    fromAddress: 'biuro@pge-faktura24.pl',
    subject: 'Informacja o zaległości w płatnościach - faktura nr 882/2026',
    timeLabel: '10:05',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Informujemy, że na Twoim koncie widnieje zaległość w wysokości 4,50 PLN. Prosimy o niezwłoczne uregulowanie należności, aby uniknąć odłączenia energii.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Sygnał alarmowy: ' },
          {
            type: 'tip',
            value: 'Niska kwota dopłaty',
            lesson: 'Scam „na dopłatę” (często rzędu kilku złotych) ma na celu skłonienie Cię do szybkiego kliknięcia bez zastanowienia, by „mieć to z głowy”.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zapłać teraz',
        apparentLabel: 'pge-obrot.pl/platnosci',
        href: 'https://pge-faktura-online.com/pay',
        hoverLesson: 'Link kieruje do fałszywej bramki płatności, która wyłudza dane do bankowości elektronicznej.'
      }
    ]
  },
  {
    id: 'e14',
    fromName: 'Dział IT',
    fromAddress: 'it-support@firma-przyklad.pl',
    subject: 'Planowana przerwa techniczna - sobota',
    timeLabel: '11:40',
    isPhishing: false,
    legitInsight: 'Wiadomość z wewnętrznego adresu firmowego, informująca o rutynowych pracach. Nie prosi o logowanie ani podawanie danych.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'W najbliższą sobotę w godzinach 22:00 - 04:00 nastąpi przerwa w dostępie do poczty e-mail ze względu na aktualizację serwerów. Przepraszamy za utrudnienia.'
          }
        ]
      }
    ],
    actions: []
  },
  {
    id: 'e15',
    fromName: 'mBank',
    fromAddress: 'kontakt@mbank-weryfikacja.pl',
    subject: 'Wykryto podejrzane logowanie do Twojego konta',
    timeLabel: '13:22',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Ktoś próbował zalogować się do Twojego konta z urządzenia w miejscowości: Madryt (Hiszpania). Jeśli to nie Ty, natychmiast zablokuj dostęp.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Błąd w adresie: ' },
          {
            type: 'tip',
            value: 'mbank-weryfikacja.pl',
            lesson: 'Banki nigdy nie używają osobnych domen do „weryfikacji”. Oficjalny adres to mbank.pl. Dodatkowe człony w nazwie domeny to typowa cecha phishingu.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'To nie ja - zablokuj',
        apparentLabel: 'online.mbank.pl/bezpieczenstwo',
        href: 'https://secure-mbank-login.info/auth',
        hoverLesson: 'Przycisk gra na Twoich emocjach (strach przed kradzieżą), aby zmusić Cię do podania loginu i hasła na podstawionej stronie.'
      }
    ]
  },
  {
    id: 'e16',
    fromName: 'LinkedIn',
    fromAddress: 'messages-noreply@linkedin.com',
    subject: 'Otrzymałeś nową wiadomość od rekrutera',
    timeLabel: '14:45',
    isPhishing: false,
    legitInsight: 'Poprawny adres nadawcy (linkedin.com) oraz standardowa procedura powiadomień serwisu społecznościowego.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Cześć, przeglądałem Twój profil i jestem pod wrażeniem Twojego doświadczenia. Chciałbym zaprosić Cię na krótką rozmowę dotyczącą nowej roli.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odpowiedz w LinkedIn',
        apparentLabel: 'linkedin.com/messaging',
        href: 'https://www.linkedin.com/messaging/',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e17',
    fromName: 'Microsoft 365',
    fromAddress: 'admin@m365-office.com',
    subject: 'Twoje hasło wygaśnie za 24 godziny',
    timeLabel: '16:10',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Zasady bezpieczeństwa Twojej organizacji wymagają regularnej zmiany hasła. Jeśli nie dokonasz zmiany w ciągu 24h, utracisz dostęp do plików w chmurze.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na domenę: ' },
          {
            type: 'tip',
            value: 'm365-office.com',
            lesson: 'Microsoft nie używa domeny m365-office.com. Prawdziwe powiadomienia systemowe przychodzą z domeny microsoft.com lub bezpośrednio od Twojego działu IT.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zachowaj obecne hasło',
        apparentLabel: 'mysignins.microsoft.com',
        href: 'https://microsoft-password-reset.xyz/login',
        hoverLesson: 'Strona pod linkiem to kopia panelu logowania Office 365. Wpisanie tam starego hasła daje oszustowi dostęp do całej Twojej poczty firmowej.'
      }
    ]
  },
  {
    id: 'e18',
    fromName: 'Google Security',
    fromAddress: 'no-reply@accounts.google.com',
    subject: 'Alert bezpieczeństwa: Nowe logowanie w systemie Windows',
    timeLabel: '17:50',
    isPhishing: false,
    legitInsight: 'Autentyczny alert od Google. Adres nadawcy jest poprawny, a wiadomość zawiera instrukcje, jak sprawdzić aktywność bezpośrednio w ustawieniach konta.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Właśnie zalogowano się na Twoje konto Google z nowego urządzenia (Chrome na Windows). Jeśli to Ty, nie musisz nic robić.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Sprawdź aktywność',
        apparentLabel: 'myaccount.google.com/notifications',
        href: 'https://myaccount.google.com/notifications',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e19',
    fromName: 'e-Urząd Skarbowy',
    fromAddress: 'powiadomienia@podatki-gov.pl.net',
    subject: 'Zwrot nadpłaty podatku za rok 2025',
    timeLabel: '19:05',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Z Twojego rozliczenia rocznego wynika nadpłata w wysokości 642,10 PLN. Aby odebrać środki na kartę, wypełnij wniosek w poniższym portalu.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Pułapka w adresie: ' },
          {
            type: 'tip',
            value: 'gov.pl.net',
            lesson: 'Polskie strony rządowe zawsze kończą się na .gov.pl. Domena .pl.net to próba podszycia się pod instytucję państwową przy użyciu podobnie brzmiącej końcówki.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odbierz zwrot',
        apparentLabel: 'urzadskarbowy.gov.pl/zwrot',
        href: 'https://podatki-gov-pl.online/refund',
        hoverLesson: 'Urzędy nigdy nie proszą o podanie danych karty płatniczej (CVV) w celu wypłaty nadpłaty podatku.'
      }
    ]
  },
  {
    id: 'e20',
    fromName: 'Adobe Creative Cloud',
    fromAddress: 'mail@adobemessages.com',
    subject: 'Twoja faktura jest już dostępna',
    timeLabel: '20:00',
    isPhishing: false,
    legitInsight: 'Adobe używa domeny adobemessages.com do komunikacji transakcyjnej. Linki prowadzą do oficjalnej, bezpiecznej domeny adobe.com.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Dziękujemy za subskrypcję planu Adobe. Faktura za ostatni miesiąc została wystawiona i możesz ją pobrać ze swojego panelu klienta.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Wyświetl fakturę',
        apparentLabel: 'account.adobe.com/orders',
        href: 'https://account.adobe.com/orders',
        hoverLesson: ''
      }
    ]
  },

{
    id: 'e21',
    fromName: 'DHL Express',
    fromAddress: 'no-reply@dhl-paczka.top',
    subject: 'Twoja przesyłka oczekuje na opłacenie cła',
    timeLabel: '09:05',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Przesyłka o numerze DHL9920311 została zatrzymana w sortowni. Aby kontynuować proces doręczenia, wymagana jest płatność za formalności celne w wysokości 8,99 PLN.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na domenę: ' },
          {
            type: 'tip',
            value: '.top',
            lesson: 'Oszuści masowo wykupują tanie domeny typu .top, .xyz czy .site. Oficjalne firmy kurierskie w Polsce korzystają z domeny .com lub .pl.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Opłać cło',
        apparentLabel: 'dhl.com.pl/platnosc',
        href: 'https://dhl-odprawa-celna.top/pay',
        hoverLesson: 'Fałszywy panel płatności wyłudzi dane Twojej karty. Prawdziwy kurier nigdy nie prosi o dopłaty przez podejrzane linki w mailach.'
      }
    ]
  },
  {
    id: 'e22',
    fromName: 'Slack',
    fromAddress: 'notifications@slack.com',
    subject: 'Nowe powiadomienie na kanale #projekt-X',
    timeLabel: '10:15',
    isPhishing: false,
    legitInsight: 'Wiadomość pochodzi z autentycznej domeny slack.com i zawiera standardowy link do aplikacji.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Użytkownik Marek Kowalski wspomniał o Tobie na kanale #projekt-X: "Czy możecie sprawdzić najnowsze poprawki w kodzie?"'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Otwórz w Slack',
        apparentLabel: 'app.slack.com',
        href: 'https://app.slack.com/',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e23',
    fromName: 'Zespół Facebook',
    fromAddress: 'security@meta-helpcenter.pl',
    subject: 'Ktoś mógł uzyskać dostęp do Twoich zdjęć',
    timeLabel: '11:45',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Zauważyliśmy nietypową aktywność na Twoim koncie. Jeśli nie potwierdzisz swojej tożsamości w ciągu 12 godzin, Twoje konto zostanie trwale usunięte zgodnie z nowym regulaminem Meta.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Sygnał ostrzegawczy: ' },
          {
            type: 'tip',
            value: 'Presja czasu (12 godzin)',
            lesson: 'Oszuści używają technik socjotechnicznych, takich jak strach i pośpiech, abyś podjął działanie bez zastanowienia.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Potwierdź tożsamość',
        apparentLabel: 'facebook.com/security-check',
        href: 'https://meta-weryfikacja-konta.info/login',
        hoverLesson: 'Kliknięcie prowadzi do formularza, który wyłudza hasło do Facebooka oraz kod z SMS (2FA).'
      }
    ]
  },
  {
    id: 'e24',
    fromName: 'Dział Benefitów',
    fromAddress: 'hr@firma-przyklad.pl',
    subject: 'Nowe karty sportowe na rok 2026',
    timeLabel: '12:30',
    isPhishing: false,
    legitInsight: 'Wiadomość wewnętrzna, zgodna z firmowym cyklem zamawiania benefitów pracowniczych.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Cześć! Od przyszłego miesiąca przechodzimy na nowy system kart sportowych. Proszę o sprawdzenie swoich danych w systemie kadrowym do piątku.'
          }
        ]
      }
    ],
    actions: []
  },
  {
    id: 'e25',
    fromName: 'Amazon Rewards',
    fromAddress: 'nagrody@amazon-survey.xyz',
    subject: 'Zostałeś wybrany! Odbierz Bon 500 PLN',
    timeLabel: '14:10',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Jesteś jednym z 10 szczęśliwców, którzy otrzymują bon upominkowy do Amazon.pl. Wystarczy wypełnić krótką ankietę o satysfakcji klienta.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Spójrz na adres: ' },
          {
            type: 'tip',
            value: 'amazon-survey.xyz',
            lesson: 'Darmowe bony o wysokiej wartości w zamian za krótką ankietę to klasyczna metoda na wyłudzanie danych osobowych.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odbierz bon',
        apparentLabel: 'amazon.pl/rewards',
        href: 'https://odbierz-nagrode-amazon.xyz/start',
        hoverLesson: 'Link prowadzi do strony "phishingowej", która pod pretekstem wysyłki nagrody prosi o dane karty płatniczej.'
      }
    ]
  },
  {
    id: 'e26',
    fromName: 'GitHub',
    fromAddress: 'noreply@github.com',
    subject: '[GitHub] Nowy klucz SSH został dodany do Twojego konta',
    timeLabel: '15:20',
    isPhishing: false,
    legitInsight: 'Oficjalny adres nadawcy i standardowy alert bezpieczeństwa po wykonaniu akcji na koncie.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Następujący klucz SSH został właśnie powiązany z Twoim kontem: "Work-Laptop-2026". Jeśli to Ty dodałeś klucz, możesz zignorować tę wiadomość.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Sprawdź ustawienia',
        apparentLabel: 'github.com/settings/keys',
        href: 'https://github.com/settings/keys',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e27',
    fromName: 'PayPal Security',
    fromAddress: 'service@intl-paypaI.com',
    subject: 'Twoje konto zostało ograniczone',
    timeLabel: '16:45',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Zauważyliśmy, że korzystasz z konta w sposób naruszający nasz regulamin. Do czasu wyjaśnienia sprawy, Twoje środki zostały zamrożone.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na literówkę: ' },
          {
            type: 'tip',
            value: 'paypaI.com (przez duże I)',
            lesson: 'Oszuści używają tzw. typosquattingu – zamieniają małą literę "l" na wielką literę "I", co w wielu czcionkach wygląda identycznie.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Usuń ograniczenie',
        apparentLabel: 'paypal.com/resolution-center',
        href: 'https://weryfikacja-paypal-user.com/secure',
        hoverLesson: 'Strona docelowa to idealna kopia PayPala, która służy do kradzieży loginu i hasła.'
      }
    ]
  },
  {
    id: 'e28',
    fromName: 'Zoom Meetings',
    fromAddress: 'no-reply@zoom.us',
    subject: 'Zaproszenie na spotkanie: Planowanie sprintu',
    timeLabel: '17:30',
    isPhishing: false,
    legitInsight: 'Wiadomość z domeny zoom.us, zawierająca standardowy link do spotkania z identyfikatorem (Meeting ID).',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Tomasz Nowak zaprasza Cię na zaplanowane spotkanie Zoom. Temat: Planowanie sprintu Q3. Czas: Jutro, 10:00.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Dołącz do spotkania',
        apparentLabel: 'zoom.us/j/123456789',
        href: 'https://zoom.us/j/123456789',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e29',
    fromName: 'Revolut Support',
    fromAddress: 'no-reply@revolut-update.info',
    subject: 'Wymagana weryfikacja dokumentu tożsamości',
    timeLabel: '18:15',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Zgodnie z unijną dyrektywą AML, musimy odświeżyć skan Twojego dowodu osobistego. Brak aktualizacji w ciągu 48h spowoduje zablokowanie karty.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zła domena: ' },
          {
            type: 'tip',
            value: 'revolut-update.info',
            lesson: 'Revolut (i inne banki) prosi o aktualizację dokumentów wyłącznie wewnątrz swojej zabezpieczonej aplikacji mobilnej, a nie przez linki w mailach.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Prześlij dokument',
        apparentLabel: 'revolut.com/identity',
        href: 'https://revolut-portal-weryfikacji.info/upload',
        hoverLesson: 'Przesłanie tu zdjęcia dowodu to gotowy przepis na kradzież tożsamości i wzięcie kredytu na Twoje dane.'
      }
    ]
  },
  {
    id: 'e30',
    fromName: 'Spotify Family',
    fromAddress: 'no-reply@spotify.com',
    subject: 'Twoja rodzina na Spotify czeka',
    timeLabel: '20:00',
    isPhishing: false,
    legitInsight: 'Wiadomość z oficjalnej domeny Spotify, zachęcająca do skorzystania z funkcji premium bez wymuszania natychmiastowego logowania.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Cześć! Wygląda na to, że nadal korzystasz z planu Individual. Czy wiedziałeś, że w planie Family możesz dodać 5 osób i płacić mniej?'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Sprawdź ofertę',
        apparentLabel: 'spotify.com/family',
        href: 'https://www.spotify.com/pl/family/',
        hoverLesson: ''
      }
    ]
  },

  {
    id: 'e31',
    fromName: 'Booking.com Support',
    fromAddress: 'noreply@booking-reservation-id82.com',
    subject: 'Ważna informacja dotycząca Twojej rezerwacji w Zakopanem',
    timeLabel: '09:20',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Twoja płatność za pobyt w obiekcie "Willa pod Tatrami" nie została autoryzowana. Masz 24 godziny na ponowne wprowadzenie danych karty, w przeciwnym razie rezerwacja zostanie anulowana.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zwróć uwagę na domenę: ' },
          {
            type: 'tip',
            value: 'booking-reservation-id82.com',
            lesson: 'Oszuści tworzą domeny z losowymi numerami ID, aby ominąć filtry antyspamowe. Oficjalne maile pochodzą zawsze z głównej domeny booking.com.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zaktualizuj płatność',
        apparentLabel: 'booking.com/secure-payment',
        href: 'https://booking-payment-verification.net/pay',
        hoverLesson: 'To bardzo popularny atak. Link prowadzi do strony, która wygląda jak panel Booking, ale służy do kradzieży danych karty płatniczej.'
      }
    ]
  },
  {
    id: 'e32',
    fromName: 'Poczta Polska',
    fromAddress: 'informacja@poczta-polska.pl',
    subject: 'Twoja przesyłka kurierska została nadana',
    timeLabel: '10:10',
    isPhishing: false,
    legitInsight: 'Autentyczna wiadomość informacyjna z poprawnej domeny rządowej (.pl), zawierająca jedynie numer śledzenia i link do oficjalnej strony.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Dzień dobry, przesyłka o numerze PX99002138 została odebrana od nadawcy i jest w drodze do sortowni. Przewidywany termin doręczenia: jutro.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Śledź przesyłkę',
        apparentLabel: 'poczta-polska.pl/sledzenie',
        href: 'https://emonitoring.poczta-polska.pl/',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e33',
    fromName: 'Apple iCloud',
    fromAddress: 'support@cloud-storage-apple.icu',
    subject: 'Twoja przestrzeń dyskowa jest pełna',
    timeLabel: '11:05',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Osiągnąłeś limit 5GB w usłudze iCloud. Twoje zdjęcia i kopie zapasowe nie są już synchronizowane. Kliknij poniżej, aby odebrać darmowe 50GB w ramach promocji lojalnościowej.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Podejrzany element: ' },
          {
            type: 'tip',
            value: 'Darmowe 50GB w promocji',
            lesson: 'Firmy technologiczne rzadko rozdają darmową przestrzeń dyskową bezterminowo. Obietnica "prezentu" to haczyk, by skłonić Cię do logowania na fałszywej stronie.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odbierz dodatkowe miejsce',
        apparentLabel: 'icloud.com/upgrade',
        href: 'https://apple-storage-promo.info/login',
        hoverLesson: 'Przycisk przekierowuje do strony wyłudzającej Apple ID oraz hasło, co daje hakerom dostęp do Twoich zdjęć i lokalizacji urządzenia.'
      }
    ]
  },
  {
    id: 'e34',
    fromName: 'Dział Administracji',
    fromAddress: 'recepcja@firma-przyklad.pl',
    subject: 'Zagubiona karta dostępu do biura',
    timeLabel: '12:40',
    isPhishing: false,
    legitInsight: 'Typowa wiadomość wewnętrzna dotycząca spraw biurowych, wysłana z autentycznego konta pracownika firmy.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Cześć wszystkim, na recepcji czeka znaleziona w kuchni karta dostępu. Jeśli ktoś z Was ją zgubił, zapraszam po odbiór.'
          }
        ]
      }
    ],
    actions: []
  },
  {
    id: 'e35',
    fromName: 'Instytut ZUS',
    fromAddress: 'portal-pue@zus-weryfikacja.org',
    subject: 'Informacja o nowej decyzji w sprawie składek',
    timeLabel: '13:15',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Na Twoim profilu PUE ZUS została wystawiona nowa decyzja dotycząca przeliczenia kapitału początkowego. Dokument można pobrać po zalogowaniu do systemu.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Analiza nadawcy: ' },
          {
            type: 'tip',
            value: 'zus-weryfikacja.org',
            lesson: 'ZUS korzysta wyłącznie z domeny zus.pl. Końcówka .org oraz dodatek "weryfikacja" w nazwie jednoznacznie wskazują na próbę oszustwa.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Zaloguj się do PUE',
        apparentLabel: 'zus.pl/portal-pue',
        href: 'https://zus-portal-logowanie.pl.net/login',
        hoverLesson: 'Fałszywy panel logowania, który udaje Profil Zaufany, by przejąć Twoje dane dostępowe do banku.'
      }
    ]
  },
  {
    id: 'e36',
    fromName: 'Steam Support',
    fromAddress: 'noreply@steampowered.com',
    subject: 'Potwierdzenie zakupu w sklepie Steam',
    timeLabel: '14:50',
    isPhishing: false,
    legitInsight: 'Standardowa faktura po zakupie gry. Nadawca i linki prowadzą do oficjalnej domeny Valve (steampowered.com).',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Dziękujemy za zakup! Gra "Cyberpunk 2077" została dodana do Twojej biblioteki. Kwota 99,00 PLN została pobrana z Twojego Portfela Steam.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Szczegóły transakcji',
        apparentLabel: 'help.steampowered.com',
        href: 'https://help.steampowered.com/',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e37',
    fromName: 'OLX - Sprzedaż',
    fromAddress: 'no-reply@olx-poczta.pl',
    subject: 'Twoje ogłoszenie zostało kupione! Odbierz pieniądze',
    timeLabel: '15:30',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Gratulacje! Kupujący zapłacił za Twój przedmiot przez "Przesyłkę OLX". Kliknij przycisk poniżej, aby otrzymać środki na swoją kartę bankową.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Zasada bezpieczeństwa: ' },
          {
            type: 'tip',
            value: 'Odbiór pieniędzy na kartę',
            lesson: 'OLX nigdy nie prosi o podanie danych karty (numeru, CVV) w celu wypłaty środków. Pieniądze ze sprzedaży trafiają bezpośrednio na podany wcześniej numer konta.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Odbierz środki',
        apparentLabel: 'olx.pl/platnosci',
        href: 'https://olx-odbierz-wyplate.online/transfer',
        hoverLesson: 'To oszustwo "na kupującego". Link prowadzi do strony, która poprosi o dane logowania do Twojego banku.'
      }
    ]
  },
  {
    id: 'e38',
    fromName: 'Dropbox',
    fromAddress: 'no-reply@dropbox.com',
    subject: 'Użytkownik Jan Kowalski udostępnił Ci folder',
    timeLabel: '16:10',
    isPhishing: false,
    legitInsight: 'Oficjalna wiadomość od Dropbox. Zawiera nazwę użytkownika, którego możesz znać, i prowadzi do autentycznej domeny usługi.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Jan Kowalski udostępnił Ci folder "Materiały Konferencyjne". Możesz go teraz przeglądać i edytować w swojej aplikacji Dropbox.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Wyświetl folder',
        apparentLabel: 'dropbox.com/sh/folders',
        href: 'https://www.dropbox.com/home',
        hoverLesson: ''
      }
    ]
  },
  {
    id: 'e39',
    fromName: 'Santander Bank',
    fromAddress: 'alert@santander-security-center.com',
    subject: 'Wymagana natychmiastowa autoryzacja danych',
    timeLabel: '17:45',
    isPhishing: true,
    legitInsight: '',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Wprowadziliśmy nowy system zabezpieczeń zgodny z dyrektywą PSD2. Każdy klient zobowiązany jest do ponownego powiązania numeru telefonu z kontem.'
          }
        ]
      },
      {
        chunks: [
          { type: 'text', value: 'Fałszywy adres: ' },
          {
            type: 'tip',
            value: 'santander-security-center.com',
            lesson: 'Banki nie używają domen opisowych typu "security-center". Prawdziwe strony bankowe mają proste, znane domeny (np. santander.pl).'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Autoryzuj dane',
        apparentLabel: 'santander.pl/logowanie',
        href: 'https://santander-weryfikacja.cc/login',
        hoverLesson: 'Wprowadzenie tu danych logowania spowoduje przekazanie ich oszustom, którzy w tle spróbują okraść Twoje konto.'
      }
    ]
  },
  {
    id: 'e40',
    fromName: 'Uber',
    fromAddress: 'uber.poland@uber.com',
    subject: 'Podsumowanie Twojego przejazdu',
    timeLabel: '19:00',
    isPhishing: false,
    legitInsight: 'Autentyczny rachunek za usługę. Domena nadawcy jest poprawna, a wiadomość zawiera konkretne dane o odbytym kursie.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'Dziękujemy za wspólną podróż. Twoja opłata wyniosła 24,50 PLN i została pobrana z karty kończącej się na 1234.'
          }
        ]
      }
    ],
    actions: [
      {
        label: 'Twoje przejazdy',
        apparentLabel: 'riders.uber.com',
        href: 'https://riders.uber.com/',
        hoverLesson: ''
      }
    ]
  }


]