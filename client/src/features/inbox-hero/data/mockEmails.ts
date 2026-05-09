import type { SimulatedEmail } from '../types'

export const INBOX_HERO_EMAILS: SimulatedEmail[] = [
  {
    id: 'e1',
    fromName: 'PayPal Support',
    fromAddress: 'support@paypa1.com',
    subject: 'Action required: unusual login attempt',
    timeLabel: '08:12',
    isPhishing: true,
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value: 'We noticed a sign-in to your account from a new device.',
          },
        ],
      },
      {
        chunks: [
          { type: 'text', value: 'If this was not you, confirm here: sender ' },
          {
            type: 'tip',
            value: 'support@paypa1.com',
            lesson:
              'Spójrz na literówkę w adresie: „paypa1” zamiast „paypal” — podmiana wizualnie podobnej cyfry lub litery (homoglify) to klasyka phishingu.',
          },
          {
            type: 'text',
            value:
              '. Zaufaj tylko domenie oficjalnej nadawcy, nie samemu wyglądowi logo w treści.',
          },
        ],
      },
    ],
    actions: [
      {
        label: 'Potwierdź bezpieczeństwo konta',
        apparentLabel: 'paypal.com',
        href: 'https://paypa1-secure.net/login',
        hoverLesson:
          'Po najechaniu kursorem widać, że link nie prowadzi do paypal.com — zawsze sprawdzaj pełny adres docelowy przed kliknięciem.',
      },
    ],
  },
  {
    id: 'e2',
    fromName: 'HR — Biuro',
    fromAddress: 'hr@firma-przyklad.pl',
    subject: 'Potwierdzenie urlopu — bez zmian',
    timeLabel: '08:18',
    isPhishing: false,
    legitInsight:
      'Korespondencja wewnętrzna z firmowej domeny, bez presji ani podejrzanego linku — typowy, spokojny ton.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'Cześć, urlop z 12–16 maja jest zatwierdzony w systemie. Jeśli coś się zmieni, daj znać na tym wątku.',
          },
        ],
      },
      {
        chunks: [
          {
            type: 'text',
            value:
              'Nadawca jest w naszej domenie firmowej, brak presji czasowej i nietypowych linków — typowa, spokojna korespondencja wewnętrzna.',
          },
        ],
      },
    ],
  },
  {
    id: 'e3',
    fromName: 'Dostawa paczki',
    fromAddress: 'info@kurier-express.xyz',
    subject: 'Płatność 2 PLN — odbiór dzisiaj',
    timeLabel: '08:24',
    isPhishing: true,
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'Twoja paczka czeka. Ureguluj koszt dostawy, inaczej zostanie zwrócona nadawcy.',
          },
        ],
      },
      {
        chunks: [
          { type: 'text', value: 'Nadawca używa domeny ' },
          {
            type: 'tip',
            value: '.xyz',
            lesson:
              'Domeny .xyz są często używane masowo przez oszustów — sama treść „kurier” nie gwarantuje wiarygodności; weryfikuj nadawcę przez oficjalną aplikację przewoźnika.',
          },
          { type: 'text', value: ' i pilnej płatności — klasyczna mieszanka presji czasowej.', },
        ],
      },
    ],
    actions: [
      {
        label: 'Opłać dostawę (2 PLN)',
        apparentLabel: 'inpost.pl',
        href: 'https://track-session.xyz/pay?id=9821',
        hoverLesson:
          'Przycisk sugeruje znaną markę („inpost.pl”), ale realny adres to podejrzana domena .xyz — sprawdzaj faktyczny URL w podglądzie linku.',
      },
    ],
  },
  {
    id: 'e4',
    fromName: 'IT Helpdesk',
    fromAddress: 'helpdesk.it@firma-przyklad.pl',
    subject: 'Planowe okno konserwacji — sobota 22:00',
    timeLabel: '08:31',
    isPhishing: false,
    legitInsight:
      'Powiadomienie IT bez żądania pośpiechu i bez obcej domeny — spójne z codzienną pracą.',
    paragraphs: [
      {
        chunks: [
          {
            type: 'text',
            value:
              'W sobotę o 22:00 planujemy krótką przerwę VPN (do 30 min). Szczegóły na wiki wewnętrznym bez logowania z zewnątrz.',
          },
        ],
      },
    ],
  },
]
