📱 1. Główna Nawigacja (Mobile Bottom Bar)
Na telefonach kciuk użytkownika najłatwiej sięga do dołu ekranu. Zamiast ukrywać funkcje w menu hamburgerowym, zastosujemy dolny pasek nawigacji z 4 głównymi zakładkami:

* 🏠 Odkrywaj (Portal): Strona główna. Wykresy od redakcji, oficjalne dane (GUS/Bank Światowy) zmiksowane z najpopularniejszymi sondami użytkowników.
* ➕ Utwórz (Tools): Centralny, wyróżniający się przycisk. Kliknięcie go natychmiast ukrywa portal i otwiera czysty, bezwzględnie prosty kreator (tryb roboczy).
* 💬 Dyskusje: Tablica z komentarzami, gorącymi tematami i moderacją dla zalogowanych.
* 👤 Moje konto / Panel: Dla niezalogowanych: prosty ekran zachęcający do rejestracji. Dla zalogowanych: historia, szablony, statystyki i moderacja własnych sond.

🛠️ 2. Tryb Tools (Kreator bez zalogowania) – UX/UI
Gdy użytkownik klika zakładkę ➕ Utwórz, interfejs zmienia się w czysty arkusz roboczy (skupienie na zadaniu, zero rozpraszaczy portalu).
Przepływ ekranu (Krok po kroku na telefonie):

1. Pole pytania (Top): Duży, automatycznie powiększający się obszar tekstowy (Autogrow Textarea) z placeholderem: „O co chcesz zapytać?”.
2. Opcje odpowiedzi: Domyślnie dwa pola (Opcja 1, Opcja 2). Pod nimi dyskretny przycisk + Dodaj kolejną opcję. Obok każdego pola ikona krzyżyka do usuwania.
3. Szybkie ustawienia (Ikony/Toggles):
    * Ikona kłódki: Anonimowe / Jawne (domyślnie: Anonimowe).
    * Ikona oka: Widoczność: Publiczna w portalu / Prywatna (tylko przez link/kod).
4. 
5. Główny przycisk akcji (Sticky Bottom Button): Szeroki przycisk na samym dole ekranu: „Generuj Sondę”.
Co dzieje się po kliknięciu „Generuj Sondę” (Dla niezalogowanego)?
Pojawia się natychmiastowy ekran sukcesu (Modal/Podsumowanie):

* Twój Link: apka.pl/sonda/xyz (przycisk "Kopiuj").
* Kod do osadzenia: Kod iFrame (przycisk "Kopiuj kod na stronę").
* Banner edukacyjny UX: „Chcesz śledzić wyniki na żywo, tworzyć szablony lub edytować tę sondę? Zarejestruj się za darmo jednym kliknięciem.”

📰 3. Tryb Portalowy (Strona Główna) – UX/UI
Wracamy do zakładki 🏠 Odkrywaj. Na ekranie smartfona treść płynie w dół w formie dynamicznego feedu.
Anatomia Feedu (Kolejność sekcji od góry):

1. Górny pasek wyszukiwania i filtrów: Szybkie kategorie: #Wszystkie #GUS #Gospodarka #Lokalne#Rozrywka.
2. Karta Główna Redakcji (Hero Card):
    * Duży, czytelny wykres (np. poziomy pasek postępu pokazujący dane z Banku Światowego).
    * Krótki tytuł publicystyczny: „Czy grozi nam kryzys mieszkaniowy? Sprawdź oficjalne dane.”
    * Pod oficjalnym wykresem znajduje się miniaturowa, aktywna sekcja: „A jak to wygląda u Ciebie? [Zagłosuj]”.
3. 
4. Siatka Sond Społecznościowych (Płynny scroll):
    * Każda sonda użytkownika to prostokątna karta.
    * UX Zasada 1-kliknięcia: Użytkownik widzi pytanie i opcje. Może kliknąć opcję bezpośrednio na karcie. Karta natychmiast animuje się, pokazując aktualne wyniki procentowe (bez przeładowania strony).
    * Na dole karty: ikona komentarza (np. 💬 42) i ikona udostępnienia.
5. 

🔐 4. Po Zalogowaniu – Rozszerzenie możliwości społecznościowych
Gdy użytkownik loguje się do systemu, interfejs portalu i kreatora subtelnie się wzbogaca (tzw. Progressive Disclosure):

* W trybie Tools (Kreator): Pojawia się dodatkowa sekcja Wybierz z szablonów oraz zaawansowane opcje: „Zezwól na komentarze”, „Weryfikacja tylko e-mailem szkolnym (.edu)”, „Ustaw datę zakończenia głosowania”.
* W portalu (Społeczność): Pod każdą sondą aktywuje się sekcja komentarzy. Logika UX komentarzy powinna być podzielona na:
    * Komentarze ogólne: Dyskusja o temacie.
    * Komentarze powiązane z głosem: System może oznaczać użytkowników plakietkami (np. przy komentarzu widnieje mały dopisek: [Głosował na Opcję A]), co niesamowicie podkręca dynamikę dyskusji na portalach społecznościowych.
* 
* Panel Moderacji (Dla twórcy materiału): W zakładce „Moje konto” twórca widzi listę swoich sond. Przy każdej z nich ma przycisk Moderuj komentarze, gdzie może ukrywać wulgarne wpisy lub przeglądać szczegółowe, interaktywne statystyki (np. wykres zmian głosów w czasie).
Od którego z tych elementów interfejsu chciałbyś zacząć szczegółowe projektowanie?

* Możemy rozpisać dokładny wygląd i stany wizualne karty sondy (Sonda Card) przed i po oddaniu głosu.
* Możemy dopracować UX sekcji komentarzy z podziałem na opinie "Opcji A" i "Opcji B".
* Możemy zaprojektować interfejs wyświetlania wykresów redakcyjnych (np. jak połączyć dane z GUS z opiniami ludzi).