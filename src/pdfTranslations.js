export const pdfTranslations = {
  pl: {
    ui: {
      toolbar: {
        title: 'Wersja do druku / PDF',
        hint: 'Ctrl+P → „Zapisz jako PDF" → rozmiar A4',
        printBtn: '🖨 Drukuj / Zapisz PDF',
        closeBtn: '✕ Zamknij',
      },
      cover: {
        badge: 'WebToLearn',
        title: 'Ścieżka Wdrożeniowa',
        subtitle: 'Od kodu do własnej domeny — instrukcja krok po kroku',
        flow: ['GitHub', '→', 'Vercel', '→', 'Cloudflare', '→', 'Własna domena'],
      },
      prerequisites: {
        title: 'Zanim zaczniesz — czego potrzebujesz?',
        items: [
          'Konto na <strong>github.com</strong> (darmowe)',
          'Konto na <strong>vercel.com</strong> (darmowe, plan Hobby)',
          'Konto na <strong>cloudflare.com</strong> (darmowe, plan Free) — tylko jeśli masz własną domenę',
          'Własna domena — opcjonalne; strona działa też na bezpłatnym adresie .vercel.app',
          'Twój projekt — z Lovable, AI Studio lub własnoręcznie napisany',
        ],
      },
      labels: {
        what: 'Co to znaczy?',
        how: 'Jak to zrobić?',
        tip: '💡 Wskazówka',
      },
      glossary: {
        title: 'Słowniczek pojęć',
        items: [
          { term: 'Git', def: 'Program śledzący zmiany w kodzie. Jak historia edycji — możesz wrócić do każdej poprzedniej wersji.' },
          { term: 'Repozytorium (repo)', def: 'Folder z kodem projektu śledzony przez Git. Może być lokalny (na komputerze) lub zdalny (na GitHubie).' },
          { term: 'Commit', def: 'Zapis stanu kodu w danej chwili — jak zdjęcie. Każdy commit ma opis co zostało zmienione.' },
          { term: 'Push', def: 'Wysłanie lokalnych commitów na serwer (GitHub). "Wypchnięcie" kodu do internetu.' },
          { term: 'Wdrożenie (Deploy)', def: 'Uruchomienie aplikacji na serwerze — opublikowanie jej tak żeby użytkownicy mogli ją zobaczyć.' },
          { term: 'DNS (Domain Name System)', def: 'System tłumaczący nazwy domen (moja-strona.pl) na adresy IP serwerów. Jak książka telefoniczna internetu.' },
          { term: 'Rekord A', def: 'Wpis DNS łączący domenę z konkretnym adresem IP serwera.' },
          { term: 'Rekord CNAME', def: 'Wpis DNS będący "aliasem" — zamiast adresu IP wskazuje na inną nazwę domenową.' },
          { term: 'Nameservery (NS)', def: 'Adresy serwerów zarządzających DNS dla Twojej domeny. Zmiana NS u rejestratora przekazuje zarządzanie do innego serwisu (np. Cloudflare).' },
          { term: 'SSL / https://', def: 'Szyfrowane połączenie między przeglądarką a serwerem. Zielona kłódka przy adresie URL. Vercel wydaje certyfikat SSL automatycznie.' },
          { term: 'Proxy (Cloudflare)', def: 'Opcja w Cloudflare (pomarańczowa chmurka). Gdy WŁĄCZONA, Vercel nie może wystawić SSL. Musi być wyłączona (szara chmurka).' },
          { term: 'Terminal / Wiersz Polecenia', def: 'Okno tekstowe do wydawania poleceń komputerowi. Na Windows: PowerShell lub cmd. Na Mac: Terminal.' },
        ],
      },
    },
    phases: [
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
          },
          {
            title: 'Zainicjuj Git lub eksportuj z Lovable / AI Studio',
            what: 'Git to program, który śledzi każdą zmianę w kodzie — jak historia edycji w Google Docs. "Inicjowanie" oznacza uruchomienie go w Twoim folderze.',
            how: 'Jeśli używasz Lovable: Project Settings → GitHub → "Connect to GitHub" — gotowe!\n\nJeśli masz kod na komputerze: otwórz Terminal, wejdź do folderu projektu i wpisz:\n  git init\n  git remote add origin [adres z GitHuba]',
            tip: 'Użytkownicy Lovable: eksport do GitHub działa jednym kliknięciem — nie musisz nic więcej robić.',
          },
          {
            title: 'Wykonaj pierwszy commit i push do origin/main',
            what: '"Commit" to zapis stanu kodu w danej chwili — jak zdjęcie. "Push" to wysłanie tego zdjęcia na GitHuba.',
            how: 'W terminalu wpisz kolejno:\n  git add .\n  git commit -m "Pierwsza wersja"\n  git push -u origin main',
            tip: 'Tekst po -m "..." to opis zmian — pisz po polsku jeśli chcesz.',
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
          },
          {
            title: 'Kliknij "Add New Project"',
            what: 'Projekt w Vercelu to połączenie Twojego repozytorium z serwerem.',
            how: 'W panelu Vercel kliknij biały przycisk "Add New..." w prawym górnym rogu → wybierz "Project".',
            tip: null,
          },
          {
            title: 'Zaimportuj repozytorium z GitHub',
            what: 'Vercel wyświetli listę Twoich projektów z GitHuba — wybierz ten, który chcesz opublikować.',
            how: 'Znajdź swój projekt na liście i kliknij "Import". Jeśli projektu nie widać — kliknij "Configure GitHub App" i daj Vercelowi dostęp do swojego repozytorium.',
            tip: null,
          },
          {
            title: 'Skonfiguruj framework preset (Vite / Next.js)',
            what: '"Framework preset" to informacja dla Vercela jakiego rodzaju jest projekt. Zazwyczaj wykrywa to automatycznie.',
            how: 'Sprawdź czy pole "Framework Preset" jest poprawnie ustawione. W większości przypadków po prostu kliknij "Wdróż".',
            tip: 'Aplikacje Lovable to zazwyczaj "Vite". Projekty Next.js Vercel wykrywa sam.',
          },
          {
            title: 'Kliknij Wdróż — zanotuj domyślny URL .vercel.app',
            what: 'Vercel zbuduje i opublikuje Twoją stronę. Trwa to 30–120 sekund.',
            how: 'Poczekaj aż zobaczysz zielone "Ready". Twoja strona jest dostępna pod adresem kończącym się na .vercel.app — skopiuj go.',
            tip: 'Od tej chwili każdy push do GitHuba = automatyczna aktualizacja strony na Vercelu!',
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
          },
          {
            title: 'Skopiuj Nameservery i wklej w panelu rejestratora',
            what: '"Nameservery" to adresy serwerów zarządzających Twoją domeną. Musisz zmienić je u rejestratora (firmy gdzie kupiłeś domenę) na te z Cloudflare.',
            how: 'Cloudflare pokaże Ci 2 adresy (np. "amir.ns.cloudflare.com"). Zaloguj się do panelu rejestratora (home.pl, nazwa.pl, OVH...) → znajdź "DNS" lub "Nameservery" → usuń stare → wpisz oba z Cloudflare → zapisz.',
            tip: 'Każdy rejestrator wygląda inaczej. Szukaj zakładki "DNS", "Nameservery" lub "Serwery nazw".',
          },
          {
            title: 'Poczekaj na propagację DNS',
            what: '"Propagacja DNS" to czas w jakim cały internet dowiaduje się o zmianie. To normalny proces — jak aktualizacja książki telefonicznej.',
            how: 'Po prostu poczekaj — Cloudflare wyśle Ci e-mail gdy domena będzie aktywna. Możesz sprawdzić postęp na whatsmydns.net (wpisz domenę, zaznacz "NS").',
            tip: 'Zazwyczaj trwa 5–30 minut, maksymalnie 48 godzin. Nie musisz nic robić — to dzieje się automatycznie.',
          },
          {
            title: 'Skonfiguruj SSL, Speed i HTTPS redirect',
            what: 'Trzy ustawienia w Cloudflare które znacząco poprawiają bezpieczeństwo i szybkość strony. Zajmą łącznie 2 minuty.',
            how: '1. SSL/TLS → Overview → ustaw tryb na "Full (strict)"\n2. Speed → Optimization → włącz "Auto Minify" (HTML + CSS + JS)\n3. SSL/TLS → Edge Certificates → włącz "Always Use HTTPS"',
            tip: '⚠️ Tryb "Full (strict)" jest ważny — weryfikuje certyfikat Vercel. Bez tego mogą pojawiać się ostrzeżenia o bezpieczeństwie.',
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
          },
          {
            title: 'Skopiuj rekordy CNAME / A wskazane przez Vercela',
            what: '"Rekord DNS" to wpis mówiący dokąd wskazuje domena. Rekord A to adres IP, CNAME to skrót do innego adresu.',
            how: 'Vercel pokaże tabelkę z rekordami. Zazwyczaj: Typ A, Nazwa @, Wartość 76.76.21.21 LUB Typ CNAME, Nazwa www, Wartość cname.vercel-dns.com. Zanotuj lub zostaw stronę otwartą.',
            tip: null,
          },
          {
            title: 'Wklej rekordy w Cloudflare → DNS → Records',
            what: 'Teraz wpisujesz te adresy w Cloudflare żeby domena wskazywała na Vercela.',
            how: 'W Cloudflare otwórz domenę → kliknij "DNS" w lewym menu → "Records" → "Add record". Wybierz Typ, wpisz Nazwę i Wartość z Vercela. Dla każdego rekordu osobno kliknij "Save".',
            tip: null,
          },
          {
            title: '⚠️ Wyłącz pomarańczową chmurę (Proxy OFF → DNS only)',
            what: 'Cloudflare ma funkcję "Proxy" — pomarańczowa chmurka. Gdy jest WŁĄCZONA, Vercel nie może wystawić certyfikatu SSL (https://). To najczęstszy błąd!',
            how: 'Przy każdym rekordzie zobaczysz kolumnę "Proxy status" z ikoną chmurki. MUSI być SZARA (DNS only). Kliknij pomarańczową chmurkę — zamieni się w szarą. Dopiero teraz kliknij "Save".',
            tip: '⚠️ Bez tego kroku Twoja strona nie będzie działać. To jest najczęstszy błąd — nie pomijaj!',
          },
          {
            title: 'Zweryfikuj domenę po stronie Vercel',
            what: 'Po dodaniu rekordów Vercel automatycznie sprawdza ustawienia i wystawia certyfikat bezpieczeństwa SSL (https://).',
            how: 'Wróć do Vercel → Settings → Domains. Poczekaj kilka minut. Status powinien zmienić się na zielony "Valid Configuration".',
            tip: 'Jeśli po 10 minutach nadal "Invalid" — sprawdź czy chmurka w Cloudflare jest szara, nie pomarańczowa.',
          },
        ],
      },
    ],
  },

  en: {
    ui: {
      toolbar: {
        title: 'Print / PDF version',
        hint: 'Ctrl+P → "Save as PDF" → A4 size',
        printBtn: '🖨 Print / Save as PDF',
        closeBtn: '✕ Close',
      },
      cover: {
        badge: 'WebToLearn',
        title: 'Deployment Pipeline',
        subtitle: 'From code to your own domain — step-by-step guide',
        flow: ['GitHub', '→', 'Vercel', '→', 'Cloudflare', '→', 'Custom Domain'],
      },
      prerequisites: {
        title: 'Before you start — what do you need?',
        items: [
          'A <strong>github.com</strong> account (free)',
          'A <strong>vercel.com</strong> account (free, Hobby plan)',
          'A <strong>cloudflare.com</strong> account (free, Free plan) — only if you have a custom domain',
          'A custom domain — optional; your site also works on the free .vercel.app address',
          'Your project — from Lovable, AI Studio, or hand-written code',
        ],
      },
      labels: {
        what: 'What does it mean?',
        how: 'How to do it?',
        tip: '💡 Tip',
      },
      glossary: {
        title: 'Glossary',
        items: [
          { term: 'Git', def: 'A program that tracks changes in your code — like edit history. You can revert to any previous version.' },
          { term: 'Repository (repo)', def: 'A folder containing your project code tracked by Git. Can be local (on your computer) or remote (on GitHub).' },
          { term: 'Commit', def: 'A snapshot of the code at a given moment. Each commit has a message describing what changed.' },
          { term: 'Push', def: 'Sending local commits to the server (GitHub). "Pushing" your code to the internet.' },
          { term: 'Deploy / Deployment', def: 'Running the application on a server — publishing it so users can access it.' },
          { term: 'DNS (Domain Name System)', def: "The system that translates domain names (mysite.com) into server IP addresses. Like the internet's phone book." },
          { term: 'A Record', def: 'A DNS entry that connects a domain to a specific server IP address.' },
          { term: 'CNAME Record', def: 'A DNS entry that acts as an "alias" — instead of an IP address it points to another domain name.' },
          { term: 'Nameservers (NS)', def: "Addresses of servers that manage DNS for your domain. Changing NS at your registrar hands management to another service (e.g. Cloudflare)." },
          { term: 'SSL / https://', def: 'An encrypted connection between the browser and the server. The padlock icon in the URL bar. Vercel issues SSL certificates automatically.' },
          { term: 'Proxy (Cloudflare)', def: 'An option in Cloudflare (orange cloud icon). When ON, Vercel cannot issue SSL. Must be OFF (grey cloud).' },
          { term: 'Terminal / Command Line', def: 'A text window for issuing commands to your computer. On Windows: PowerShell or cmd. On Mac: Terminal.' },
        ],
      },
    },
    phases: [
      {
        number: '01',
        platform: 'GitHub',
        subtitle: 'Repository — "a project folder in the cloud"',
        intro: 'GitHub is a free place on the internet to store your website\'s code. It works like a folder on your drive, but accessible from anywhere in the world. Vercel connects to GitHub and automatically updates your site every time you upload changes.',
        steps: [
          {
            title: 'Create a public or private repository',
            what: 'A repository ("repo") is your project folder on GitHub. Public = anyone can see the code. Private = only you have access.',
            how: 'Go to github.com → sign in or register → click "+" in the top menu → "New repository" → enter a project name (no spaces or special characters) → click "Create repository".',
            tip: 'For learning, choose "Public" — it\'s simpler and completely free.',
          },
          {
            title: 'Initialize Git or export from Lovable / AI Studio',
            what: 'Git is a program that tracks every change in your code — like edit history in Google Docs. "Initializing" means starting it in your folder.',
            how: 'If you use Lovable: Project Settings → GitHub → "Connect to GitHub" — done!\n\nIf you have code on your computer: open Terminal, navigate to your project folder and type:\n  git init\n  git remote add origin [URL from GitHub]',
            tip: 'Lovable users: export to GitHub works with one click — you don\'t need to do anything else.',
          },
          {
            title: 'Make your first commit and push to origin/main',
            what: '"Commit" is a snapshot of the code at a given moment. "Push" is sending that snapshot to GitHub.',
            how: 'In the terminal, type the following commands:\n  git add .\n  git commit -m "First version"\n  git push -u origin main',
            tip: 'The text after -m "..." is your change description — write it in any language you like.',
          },
        ],
      },
      {
        number: '02',
        platform: 'Vercel',
        subtitle: 'Hosting — "a service that publishes your site automatically"',
        intro: 'Vercel is a hosting service that builds and publishes your site automatically. As soon as you push changes to GitHub, Vercel updates the site — no additional steps needed on your part. The free plan is more than enough.',
        steps: [
          {
            title: 'Create an account at vercel.com (sign in with GitHub)',
            what: 'You link your Vercel account with GitHub — this way Vercel automatically sees your projects.',
            how: 'Go to vercel.com → click "Sign Up" → choose "Continue with GitHub" → approve the permissions. That\'s it — takes about a minute.',
            tip: 'Always choose "Continue with GitHub" instead of email — it connects both services automatically.',
          },
          {
            title: 'Click "Add New Project"',
            what: 'A project in Vercel is the link between your repository and the server.',
            how: 'In the Vercel dashboard, click the white "Add New..." button in the top-right corner → select "Project".',
            tip: null,
          },
          {
            title: 'Import the repository from GitHub',
            what: 'Vercel will show a list of your GitHub projects — choose the one you want to publish.',
            how: 'Find your project on the list and click "Import". If you can\'t see it — click "Configure GitHub App" and grant Vercel access to your repository.',
            tip: null,
          },
          {
            title: 'Configure the framework preset (Vite / Next.js)',
            what: '"Framework preset" tells Vercel what kind of project it is. It usually detects this automatically.',
            how: 'Check that the "Framework Preset" field is set correctly. In most cases, just click "Deploy".',
            tip: 'Lovable apps are usually "Vite". Next.js projects are detected automatically by Vercel.',
          },
          {
            title: 'Click Deploy — note the default .vercel.app URL',
            what: 'Vercel will build and publish your site. This takes 30–120 seconds.',
            how: 'Wait until you see a green "Ready" status. Your site is available at an address ending in .vercel.app — copy it.',
            tip: 'From now on, every push to GitHub = automatic update of your site on Vercel!',
          },
        ],
      },
      {
        number: '03',
        platform: 'Cloudflare DNS',
        subtitle: 'DNS — "the internet address system"',
        intro: 'Cloudflare manages the "address system" of the internet (DNS). When someone types your domain in a browser, DNS tells the computer where to find the site. Cloudflare is free, fast, and will protect your site from attacks. You configure it just once.',
        steps: [
          {
            title: 'Add your domain to Cloudflare',
            what: 'Cloudflare needs to "meet" your domain before it can manage it.',
            how: 'Go to cloudflare.com → sign in or register → click "Add a Site" → enter your domain (e.g. mysite.com) → choose the "Free" plan → click Continue.',
            tip: 'The free Cloudflare plan is 100% sufficient for this setup.',
          },
          {
            title: 'Copy the Nameservers and paste them in your registrar panel',
            what: '"Nameservers" are the addresses of the servers that manage your domain. You need to change them at your registrar (the company where you bought the domain) to the ones from Cloudflare.',
            how: 'Cloudflare will show you 2 addresses (e.g. "amir.ns.cloudflare.com"). Log in to your registrar panel (GoDaddy, Namecheap, OVH...) → find "DNS" or "Nameservers" → remove the old ones → enter both from Cloudflare → save.',
            tip: 'Every registrar looks different. Look for a "DNS", "Nameservers", or "Name servers" tab.',
          },
          {
            title: 'Wait for DNS propagation',
            what: '"DNS propagation" is the time it takes for the entire internet to learn about the change. This is a normal process — like updating a phone book.',
            how: 'Just wait — Cloudflare will email you when the domain is active. You can check progress at whatsmydns.net (enter your domain, select "NS").',
            tip: 'Usually takes 5–30 minutes, up to 48 hours maximum. You don\'t need to do anything — it happens automatically.',
          },
          {
            title: 'Configure SSL, Speed, and HTTPS redirect',
            what: 'Three settings in Cloudflare that significantly improve the security and speed of your site. Takes about 2 minutes total.',
            how: '1. SSL/TLS → Overview → set mode to "Full (strict)"\n2. Speed → Optimization → enable "Auto Minify" (HTML + CSS + JS)\n3. SSL/TLS → Edge Certificates → enable "Always Use HTTPS"',
            tip: '⚠️ "Full (strict)" mode is important — it verifies Vercel\'s certificate. Without it, browsers may show security warnings.',
          },
        ],
      },
      {
        number: '04',
        platform: 'Vercel ↔ Cloudflare',
        subtitle: 'Connection — "point your domain at your site"',
        intro: 'The final step: telling Vercel which domain you\'re using and pointing that domain in Cloudflare to Vercel\'s servers. WARNING: in Cloudflare you MUST DISABLE the orange cloud (Proxy) — this is the most common mistake!',
        steps: [
          {
            title: 'In Vercel → Project Settings → Domains, add your custom domain',
            what: 'You need to tell Vercel that your domain should point to this project.',
            how: 'Open your project in Vercel → click "Settings" → "Domains" → enter the domain (e.g. mysite.com, without https://) → click "Add".',
            tip: null,
          },
          {
            title: 'Copy the CNAME / A records provided by Vercel',
            what: 'A "DNS record" is an entry saying where the domain points. An A record is an IP address, a CNAME is a shortcut to another address.',
            how: 'Vercel will show a table with records. Usually: Type A, Name @, Value 76.76.21.21 OR Type CNAME, Name www, Value cname.vercel-dns.com. Note them down or keep the page open.',
            tip: null,
          },
          {
            title: 'Add the records in Cloudflare → DNS → Records',
            what: 'Now you enter those addresses in Cloudflare so the domain points to Vercel.',
            how: 'In Cloudflare open your domain → click "DNS" in the left menu → "Records" → "Add record". Select Type, enter Name and Value from Vercel. Click "Save" separately for each record.',
            tip: null,
          },
          {
            title: '⚠️ Disable the orange cloud (Proxy OFF → DNS only)',
            what: 'Cloudflare has a "Proxy" feature — the orange cloud icon. When it is ON, Vercel cannot issue an SSL certificate (https://). This is the most common mistake!',
            how: 'Next to each record you\'ll see a "Proxy status" column with a cloud icon. It MUST be GREY (DNS only). Click the orange cloud — it will turn grey. Only then click "Save".',
            tip: '⚠️ Without this step your site will not work. This is the most common mistake — don\'t skip it!',
          },
          {
            title: 'Verify the domain on the Vercel side',
            what: 'After adding the records, Vercel automatically checks the settings and issues an SSL security certificate (https://).',
            how: 'Go back to Vercel → Settings → Domains. Wait a few minutes. The status should change to a green "Valid Configuration".',
            tip: 'If it still shows "Invalid" after 10 minutes — check that the cloud in Cloudflare is grey, not orange.',
          },
        ],
      },
    ],
  },
};

export function getPdfT(lang) {
  return pdfTranslations[lang] || pdfTranslations.pl;
}
