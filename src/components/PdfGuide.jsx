import React from 'react';
import {
  GithubRepoMockup, Terminal, VercelAddNewMockup, VercelFrameworkMockup,
  VercelDeployedMockup, CloudflareNSMockup, CloudflareDNSMockup,
  ProxyToggleMockup, VercelDomainsMockup, CloudflareSettingsMockup,
} from './Mockups';

const phaseColors = {
  '01': { bg: '#eef2ff', border: '#6366f1', text: '#4338ca', num: '#6366f1' },
  '02': { bg: '#f9fafb', border: '#374151', text: '#111827', num: '#374151' },
  '03': { bg: '#fff7ed', border: '#ea580c', text: '#9a3412', num: '#f6821f' },
  '04': { bg: '#ecfdf5', border: '#059669', text: '#065f46', num: '#10b981' },
};

const pdfPhases = [
  {
    number: '01',
    platform: 'GitHub',
    subtitle: 'Repozytorium — "folder projektowy w chmurze"',
    intro: 'GitHub to darmowe miejsce w internecie do przechowywania kodu Twojej strony. Działa jak folder na dysku, tylko że dostępny z każdego miejsca na świecie. Vercel łączy się z GitHubem i automatycznie aktualizuje stronę za każdym razem gdy wgrasz zmiany.',
    steps: [
      {
        title: 'Utwórz repozytorium publiczne lub prywatne',
        what: 'Repozytorium ("repo") to Twój folder projektowy na GitHubie. Publiczne = każdy może zobaczyć kod. Prywatne = tylko Ty masz dostęp.',
        how: 'Wejdź na github.com → zaloguj się lub zarejestruj → kliknij "+" w górnym menu → "New repository" → wpisz nazwę projektu (bez spacji i polskich znaków) → kliknij "Create repository".',
        tip: 'Na potrzeby nauki wybierz "Public" — jest prostsze i w pełni darmowe.',
        mockup: <GithubRepoMockup />,
      },
      {
        title: 'Zainicjuj Git lub eksportuj z Lovable / AI Studio',
        what: 'Git to program, który śledzi każdą zmianę w kodzie — jak historia edycji w Google Docs. "Inicjowanie" oznacza uruchomienie go w Twoim folderze.',
        how: 'Jeśli używasz Lovable: Project Settings → GitHub → "Connect to GitHub" — gotowe!\n\nJeśli masz kod na komputerze: otwórz Terminal, wejdź do folderu projektu i wpisz:\n  git init\n  git remote add origin [adres z GitHuba]',
        tip: 'Użytkownicy Lovable: eksport do GitHub działa jednym kliknięciem — nie musisz nic więcej robić.',
        mockup: <Terminal lines={['cd moj-projekt', 'git init', 'git remote add origin https://github.com/artur/moj-projekt.git']} />,
      },
      {
        title: 'Wykonaj pierwszy commit i push do origin/main',
        what: '"Commit" to zapis stanu kodu w danej chwili — jak zdjęcie. "Push" to wysłanie tego zdjęcia na GitHuba.',
        how: 'W terminalu wpisz kolejno:\n  git add .\n  git commit -m "Pierwsza wersja"\n  git push -u origin main',
        tip: 'Tekst po -m "..." to opis zmian — pisz po polsku jeśli chcesz.',
        mockup: <Terminal lines={['git add .', 'git commit -m "Pierwsza wersja"', 'git branch -M main', 'git push -u origin main']} />,
      },
    ],
  },
  {
    number: '02',
    platform: 'Vercel',
    subtitle: 'Hosting — "serwis który publikuje Twoją stronę automatycznie"',
    intro: 'Vercel to serwis hostingowy, który sam buduje i publikuje Twoją stronę. Gdy tylko wgrasz zmiany do GitHuba, Vercel automatycznie aktualizuje stronę — bez żadnych dodatkowych kroków z Twojej strony. Darmowy plan w zupełności wystarczy.',
    steps: [
      {
        title: 'Załóż konto na vercel.com (zaloguj przez GitHub)',
        what: 'Konto Vercel łączysz z GitHubem — dzięki temu Vercel automatycznie widzi Twoje projekty.',
        how: 'Wejdź na vercel.com → kliknij "Sign Up" → wybierz "Continue with GitHub" → zatwierdź uprawnienia. To wszystko — zajmuje minutę.',
        tip: 'Zawsze wybieraj "Continue with GitHub" zamiast e-mail — to połączy oba serwisy automatycznie.',
        mockup: null,
      },
      {
        title: 'Kliknij "Add New Project"',
        what: 'Projekt w Vercelu to połączenie Twojego repozytorium z serwerem.',
        how: 'W panelu Vercel kliknij biały przycisk "Add New..." w prawym górnym rogu → wybierz "Project".',
        tip: null,
        mockup: <VercelAddNewMockup />,
      },
      {
        title: 'Zaimportuj repozytorium z GitHub',
        what: 'Vercel wyświetli listę Twoich projektów z GitHuba — wybierz ten, który chcesz opublikować.',
        how: 'Znajdź swój projekt na liście i kliknij "Import". Jeśli projektu nie widać — kliknij "Configure GitHub App" i daj Vercelowi dostęp do swojego repozytorium.',
        tip: null,
        mockup: null,
      },
      {
        title: 'Skonfiguruj framework preset (Vite / Next.js)',
        what: '"Framework preset" to informacja dla Vercela jakiego rodzaju jest projekt. Zazwyczaj wykrywa to automatycznie.',
        how: 'Sprawdź czy pole "Framework Preset" jest poprawnie ustawione. W większości przypadków po prostu kliknij "Deploy".',
        tip: 'Aplikacje Lovable to zazwyczaj "Vite". Projekty Next.js Vercel wykrywa sam.',
        mockup: <VercelFrameworkMockup />,
      },
      {
        title: 'Kliknij Deploy — zanotuj domyślny URL .vercel.app',
        what: 'Vercel zbuduje i opublikuje Twoją stronę. Trwa to 30–120 sekund.',
        how: 'Poczekaj aż zobaczysz zielone "Ready". Twoja strona jest dostępna pod adresem kończącym się na .vercel.app — skopiuj go.',
        tip: 'Od tej chwili każdy push do GitHuba = automatyczna aktualizacja strony na Vercelu!',
        mockup: <VercelDeployedMockup />,
      },
    ],
  },
  {
    number: '03',
    platform: 'Cloudflare DNS',
    subtitle: 'DNS — "system adresów internetowych"',
    intro: 'Cloudflare zarządza "systemem adresów" w internecie (DNS). Gdy ktoś wpisuje Twoją domenę w przeglądarce, DNS mówi komputerowi gdzie szukać strony. Cloudflare jest darmowy, szybki i ochroni Twoją stronę przed atakami. Konfigurujesz go tylko raz.',
    steps: [
      {
        title: 'Dodaj domenę do Cloudflare',
        what: 'Cloudflare musi najpierw "poznać" Twoją domenę zanim będzie mógł nią zarządzać.',
        how: 'Wejdź na cloudflare.com → zaloguj się lub zarejestruj → kliknij "Add a Site" → wpisz swoją domenę (np. moja-strona.pl) → wybierz plan "Free" → kliknij Continue.',
        tip: 'Darmowy plan Cloudflare w 100% wystarczy do tego setupu.',
        mockup: null,
      },
      {
        title: 'Skopiuj Nameservery i wklej w panelu rejestratora',
        what: '"Nameservery" to adresy serwerów zarządzających Twoją domeną. Musisz zmienić je u rejestratora (firmy gdzie kupiłeś domenę) na te z Cloudflare.',
        how: 'Cloudflare pokaże Ci 2 adresy (np. "amir.ns.cloudflare.com"). Zaloguj się do panelu rejestratora (home.pl, nazwa.pl, OVH...) → znajdź "DNS" lub "Nameservery" → usuń stare → wpisz oba z Cloudflare → zapisz.',
        tip: 'Każdy rejestrator wygląda inaczej. Szukaj zakładki "DNS", "Nameservery" lub "Serwery nazw".',
        mockup: <CloudflareNSMockup />,
      },
      {
        title: 'Poczekaj na propagację DNS',
        what: '"Propagacja DNS" to czas w jakim cały internet dowiaduje się o zmianie. To normalny proces — jak aktualizacja książki telefonicznej.',
        how: 'Po prostu poczekaj — Cloudflare wyśle Ci e-mail gdy domena będzie aktywna. Możesz sprawdzić postęp na whatsmydns.net (wpisz domenę, zaznacz "NS").',
        tip: 'Zazwyczaj trwa 5–30 minut, maksymalnie 48 godzin. Nie musisz nic robić — to dzieje się automatycznie.',
        mockup: null,
      },
      {
        title: 'Skonfiguruj SSL, Speed i HTTPS redirect',
        what: 'Trzy ustawienia w Cloudflare które znacząco poprawiają bezpieczeństwo i szybkość strony. Zajmą łącznie 2 minuty.',
        how: '1. SSL/TLS → Overview → ustaw tryb na "Full (strict)"\n2. Speed → Optimization → włącz "Auto Minify" (HTML + CSS + JS)\n3. SSL/TLS → Edge Certificates → włącz "Always Use HTTPS"',
        tip: '⚠️ Tryb "Full (strict)" jest ważny — weryfikuje certyfikat Vercel. Bez tego mogą pojawiać się ostrzeżenia o bezpieczeństwie.',
        mockup: <CloudflareSettingsMockup />,
      },
    ],
  },
  {
    number: '04',
    platform: 'Vercel ↔ Cloudflare',
    subtitle: 'Połączenie — "skieruj domenę na Twoją stronę"',
    intro: 'Ostatni etap: powiedzenie Vercelowi jakiej domeny używasz i skierowanie tej domeny w Cloudflare na serwery Vercela. UWAGA: w Cloudflare musisz WYŁĄCZYĆ pomarańczową chmurkę (Proxy) — to najczęstszy błąd!',
    steps: [
      {
        title: 'W Vercel → Project Settings → Domains dodaj własną domenę',
        what: 'Musisz powiedzieć Vercelowi, że Twoja domena ma wskazywać na ten projekt.',
        how: 'Otwórz projekt w Vercelu → kliknij "Settings" → "Domains" → wpisz domenę (np. moja-strona.pl, bez https://) → kliknij "Add".',
        tip: null,
        mockup: <VercelDomainsMockup />,
      },
      {
        title: 'Skopiuj rekordy CNAME / A wskazane przez Vercela',
        what: '"Rekord DNS" to wpis mówiący dokąd wskazuje domena. Rekord A to adres IP, CNAME to skrót do innego adresu.',
        how: 'Vercel pokaże tabelkę z rekordami. Zazwyczaj: Typ A, Nazwa @, Wartość 76.76.21.21 LUB Typ CNAME, Nazwa www, Wartość cname.vercel-dns.com. Zanotuj lub zostaw stronę otwartą.',
        tip: null,
        mockup: null,
      },
      {
        title: 'Wklej rekordy w Cloudflare → DNS → Records',
        what: 'Teraz wpisujesz te adresy w Cloudflare żeby domena wskazywała na Vercela.',
        how: 'W Cloudflare otwórz domenę → kliknij "DNS" w lewym menu → "Records" → "Add record". Wybierz Typ, wpisz Nazwę i Wartość z Vercela. Dla każdego rekordu osobno kliknij "Save".',
        tip: null,
        mockup: <CloudflareDNSMockup />,
      },
      {
        title: '⚠️ Wyłącz pomarańczową chmurę (Proxy OFF → DNS only)',
        what: 'Cloudflare ma funkcję "Proxy" — pomarańczowa chmurka. Gdy jest WŁĄCZONA, Vercel nie może wystawić certyfikatu SSL (https://). To najczęstszy błąd!',
        how: 'Przy każdym rekordzie zobaczysz kolumnę "Proxy status" z ikoną chmurki. MUSI być SZARA (DNS only). Kliknij pomarańczową chmurkę — zamieni się w szarą. Dopiero teraz kliknij "Save".',
        tip: '⚠️ Bez tego kroku Twoja strona nie będzie działać. To jest najczęstszy błąd — nie pomijaj!',
        mockup: <ProxyToggleMockup />,
      },
      {
        title: 'Zweryfikuj domenę po stronie Vercel',
        what: 'Po dodaniu rekordów Vercel automatycznie sprawdza ustawienia i wystawia certyfikat bezpieczeństwa SSL (https://).',
        how: 'Wróć do Vercel → Settings → Domains. Poczekaj kilka minut. Status powinien zmienić się na zielony "Valid Configuration".',
        tip: 'Jeśli po 10 minutach nadal "Invalid" — sprawdź czy chmurka w Cloudflare jest szara, nie pomarańczowa.',
        mockup: <VercelDeployedMockup />,
      },
    ],
  },
];

export default function PdfGuide({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto" style={{ fontFamily: '"EB Garamond", Garamond, "Times New Roman", ui-serif, serif' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { background: white !important; }
          #pdf-root { position: static !important; overflow: visible !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-gray-800">Wersja do druku / PDF</p>
          <p className="text-xs text-gray-500">Ctrl+P → „Zapisz jako PDF" → rozmiar A4</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
            🖨 Drukuj / Zapisz PDF
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
            ✕ Zamknij
          </button>
        </div>
      </div>

      {/* Document */}
      <div id="pdf-root" className="max-w-[760px] mx-auto px-10 py-12">

        {/* Cover */}
        <div className="text-center mb-14 pb-10 border-b-2 border-gray-200">
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium uppercase tracking-widest mb-6">
            WebToLearn
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 leading-tight">Pipeline Wdrożeniowy</h1>
          <p className="text-xl text-gray-500 mb-8">Od kodu do własnej domeny — instrukcja krok po kroku</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>GitHub</span><span>→</span><span>Vercel</span><span>→</span><span>Cloudflare</span><span>→</span><span>Własna domena</span>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-12 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm font-semibold text-amber-800 mb-2">Zanim zaczniesz — czego potrzebujesz?</p>
          <ul className="text-sm text-amber-900 space-y-1">
            <li>✓ Konto na <strong>github.com</strong> (darmowe)</li>
            <li>✓ Konto na <strong>vercel.com</strong> (darmowe, plan Hobby)</li>
            <li>✓ Konto na <strong>cloudflare.com</strong> (darmowe, plan Free) — tylko jeśli masz własną domenę</li>
            <li>✓ Własna domena — opcjonalne; strona działa też na bezpłatnym adresie .vercel.app</li>
            <li>✓ Twój projekt — z Lovable, AI Studio lub własnoręcznie napisany</li>
          </ul>
        </div>

        {/* Phases */}
        {pdfPhases.map((phase, phaseIdx) => {
          const c = phaseColors[phase.number];
          return (
            <div key={phase.number} className={phaseIdx > 0 ? 'page-break' : ''}>
              <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: c.bg, borderLeft: `4px solid ${c.border}` }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: c.num }}>
                    {phase.number}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-0.5" style={{ color: c.text }}>{phase.platform}</h2>
                    <p className="text-sm font-medium" style={{ color: c.text, opacity: 0.7 }}>{phase.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">{phase.intro}</p>
              </div>

              <div className="space-y-8 mb-12">
                {phase.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.num }}>
                        {i + 1}
                      </div>
                      {i < phase.steps.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ backgroundColor: c.border, opacity: 0.2, minHeight: 20 }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Co to znaczy?</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{step.what}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Jak to zrobić?</p>
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{step.how}</p>
                        </div>
                        {step.tip && (
                          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">💡 Wskazówka</p>
                            <p className="text-sm text-amber-800 leading-relaxed">{step.tip}</p>
                          </div>
                        )}
                        {step.mockup && (
                          <div className="rounded-xl overflow-hidden border border-gray-200 bg-[#0a0a0a] p-3">
                            {step.mockup}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Glossary */}
        <div className="page-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Słowniczek pojęć</h2>
          <div className="grid gap-3">
            {[
              { term: 'Git', def: 'Program śledzący zmiany w kodzie. Jak historia edycji — możesz wrócić do każdej poprzedniej wersji.' },
              { term: 'Repozytorium (repo)', def: 'Folder z kodem projektu śledzony przez Git. Może być lokalny (na komputerze) lub zdalny (na GitHubie).' },
              { term: 'Commit', def: 'Zapis stanu kodu w danej chwili — jak zdjęcie. Każdy commit ma opis co zostało zmienione.' },
              { term: 'Push', def: 'Wysłanie lokalnych commitów na serwer (GitHub). "Wypchnięcie" kodu do internetu.' },
              { term: 'Deploy', def: 'Uruchomienie aplikacji na serwerze — opublikowanie jej tak żeby użytkownicy mogli ją zobaczyć.' },
              { term: 'DNS (Domain Name System)', def: 'System tłumaczący nazwy domen (moja-strona.pl) na adresy IP serwerów. Jak książka telefoniczna internetu.' },
              { term: 'Rekord A', def: 'Wpis DNS łączący domenę z konkretnym adresem IP serwera.' },
              { term: 'Rekord CNAME', def: 'Wpis DNS będący "aliasem" — zamiast adresu IP wskazuje na inną nazwę domenową.' },
              { term: 'Nameservery (NS)', def: 'Adresy serwerów zarządzających DNS dla Twojej domeny. Zmiana NS u rejestratora przekazuje zarządzanie do innego serwisu (np. Cloudflare).' },
              { term: 'SSL / https://', def: 'Szyfrowane połączenie między przeglądarką a serwerem. Zielona kłódka przy adresie URL. Vercel wydaje certyfikat SSL automatycznie.' },
              { term: 'Proxy (Cloudflare)', def: 'Opcja w Cloudflare (pomarańczowa chmurka). Gdy WŁĄCZONA, Vercel nie może wystawić SSL. Musi być wyłączona (szara chmurka).' },
              { term: 'Terminal / Wiersz Polecenia', def: 'Okno tekstowe do wydawania poleceń komputerowi. Na Windows: PowerShell lub cmd. Na Mac: Terminal.' },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="flex-shrink-0 font-semibold text-sm text-indigo-700 w-44">{term}</span>
                <span className="text-sm text-gray-700 leading-relaxed">{def}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-gray-200 text-center space-y-1.5">
          <p className="text-sm text-gray-600">
            Created by{' '}
            <a href="mailto:artur.nawrowski@gmail.com" className="text-indigo-600 font-medium">ArChi</a>
            {' '}for{' '}
            <a href="https://webtolearn.pl" className="text-indigo-600 font-medium">WebToLearn</a>
          </p>
          <p className="text-xs text-gray-400">
            Copyright by Krajowe Centrum Badań Sztucznej Inteligencji{' '}
            <a href="https://kcbsi.pl" className="text-gray-500">kcbsi.pl</a>
            {' '}2026
          </p>
        </div>

      </div>
    </div>
  );
}
