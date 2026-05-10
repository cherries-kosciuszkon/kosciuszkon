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
  }
]