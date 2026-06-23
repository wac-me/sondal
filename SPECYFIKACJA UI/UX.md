# SPECYFIKACJA UI/UX: SONDAL.TOP
## Ekrany, Przepływy Użytkownika i Makiety ASCII

### 1. Ekran Główny: sondal NOW! (Mobile-First View)

#### [MAKIETA WIREFRAME - STAN PRZED GŁOSOWANIEM]
+-----------------------------------------------------+

| [sondal.top]            (•) NOW!           [👤]     | <- Sticky Header
+-----------------------------------------------------+

|  #Wszystkie   #GUS   #Gospodarka   #Lokalne         | <- Filtry (Slider)
+-----------------------------------------------------+

| 📊 REDAKCJA: DATA Z GUS / BANKU ŚWIATOWEGO          |
| "Zarobki w Polsce rosną o 8%. Czy odczuwasz to?"    |
|                                                     |
| [ Wykres słupkowy: oficjalne dane wzrostu ]        |
|                                                     |
| +-------------------------------------------------+ |
| | A jak jest u Ciebie? (Oddaj głos)               | |
| | [ Tak, zarabiam więcej ]                        | |
| | [ Nie, zarabiam tyle samo / mniej ]             | |
| +-------------------------------------------------+ |
| 💬 128 komentarzy                       🔗 Udostępnij|
+-----------------------------------------------------+

| 👤 @Janusz92 • przed chwilą • #warszawa             |
| "Czy rondo pod rotundą powinno mieć pasy?"         |
|                                                     |
| ( ) Opcja A: Tak, dla pieszych                      |
| ( ) Opcja B: Nie, zakorkuje miasto                  |
+-----------------------------------------------------+

#### [MAKIETA WIREFRAME - STAN PO GŁOSOWANIEM]
Gdy użytkownik tapnie opcję "Tak, dla pieszych", karta natychmiast animuje się do tego stanu bez przeładowania strony:

+-----------------------------------------------------+

| 👤 @Janusz92 • przed chwilą • #warszawa             |
| "Czy rondo pod rotundą powinno mieć pasy?"         |
|                                                     |
| [██████████████████░░░░░░░] 64%  Opcja A (Twój głos)| <- Pasek Neonowa Limonka
| [████████░░░░░░░░░░░░░░░░░] 36%  Opcja B            | <- Pasek Szary
|                                                     |
|  * Twoja opinia jest zgodna z większością mieszkańców|
+-----------------------------------------------------+

### 2. Tryb Roboczy (Tools) - Przepływ i Integracja
Przejście do trybu narzędzia odbywa się na dwa sposoby:
1.  **Klasyczny:** Kliknięcie stałego przycisku [+] w dolnym menu nawigacyjnym.
2.  **Innowacyjny (Swipe):** Przeciągnięcie całego ekranu głównego w lewo (jak zmiana aparatu w smartfonie). Portal gaśnie, odsłaniając minimalistyczny, ciemnografitowy arkusz roboczy.

#### Funkcje trybu Tools bez zalogowania:
*   **Input Pytania:** Duży boks na górze ekranu.
*   **Inputy Odpowiedzi:** Dynamiczne dodawanie pól (maksymalnie 6 dla zachowania czytelności na mobile).
*   **Toggles (Szybkie przełączniki):**
    *   [Publiczna w portalu / Prywatna]
    *   [Anonimowa / Jawna]
*   **Ekran Sukcesu:** Po kliknięciu "Generuj" użytkownik dostaje unikalny link `sondal.top/x/abc` oraz gotowy tag HTML `<iframe>` do wklejenia na swoją stronę.

### 3. Funkcje Rozszerzone (Po Zalogowaniu)
*   **Społecznościowe:** Możliwość komentowania (komentarze tagowane automatycznie wyborem użytkownika, np. "Jan Kowalski [Głosował na TAK]"). Moderacja własnego wątku pod ankietą.
*   **Analityczne (Dla Szkół/Biznesu):** Widok zaawansowanych statystyk w czasie rzeczywistym. Filtrowanie wyników po czasie, przybliżonej lokalizacji oraz typie konta (np. zweryfikowane maile szkolne `.edu.pl` dla mikro-referendów).
*   **Narzędziowe:** Zapisywanie szablonów powtarzalnych ankiet, eksport wyników do plików CSV.
