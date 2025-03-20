<h1>Dokumentacja przedwykonawcza systemu symulacji żaglówki</h1>

<h2>1. Wstęp</h2>

Dokument opisuje wymagania funkcjonalne dla systemu symulacji żaglówki. Przeznaczony jest dla zespołu programistów, którzy na jego podstawie mają zaimplementować oprogramowanie.

<h2>2. Cel systemu</h2>

System symulacji żaglówki ma umożliwiać użytkownikom symulacje sterowanie łodzią w zależności od obecnego kierunku wiatru i automatyczną regulację żagla.

<h2>3. Zakres funkcjonalny</h2>

System będzie składał się z następujących modułów:

<table>
    <tr>
        <th>Moduł</th>
        <th>Opis</th>
    </tr>
    <tr>
        <td>Moduł symulacji wiatru</td>
        <td>Odpowiedzialny za losowanie kierunku wiatru i obliczanie prędkości żaglówki dla danego kątu wiatru.</td>
    </tr>
    <tr>
        <td>Moduł sterowania łodzią</td>
        <td>Obsługujący sterowanie kierunkiem żaglówki i automatyczne ustawienie żagla</td>
    </tr>
</table>

<h2>4. Wymagania funkcjonalne</h2>

<h3>4.1. Moduł symulacji wiatru</h3>

- Wiatr jest losowany na początku działania systemu lub po naciśnięciu przycisku w miejscu obrazka (strzałki) wskazującego kierunek wiatru. Wiatr, jako zmienna, przyjmuje wartość w zakresie 0-359°.
- Obrót strzałki kierunku wiatru uzależnione jest od wartości wiatru.


<center> <img src="kierunki_wiatru.jpg" alt="Diagram Kierunków Wiatru"> </center>

- Prędkość żaglówki obliczana jest na podstawie kąta względem wiatru.
- Domyślna prędkość żaglówki jest mnożona przez stosunek predkości żaglówki do prędkości domyślnej, dzięki czemu uzyskujemy prędkość żaglówki w danym momencie.
- Dla uproszczenia czytelności, w tabeli podano wartości gdyby wiatr losował się w zakresie 1-360 stopni, w programie należy dostosować nazwe wiatru i stosunek do przypadku, gdy będzie losować się w zakresie 0-359 stopni.

<table>
    <tr>
        <th>Kąt żaglówki względem wiatru</th>
        <th>Nazwa wiatru</th>
        <th>Stosunek prędkości żaglówki do prędkości domyślnej</th>
    </tr>
    <tr>
        <td>1° do 15° oraz 346° do 360°</td>
        <td>Kąt martwy</td>
        <td>0</td>
    </tr>
    <tr>
        <td>16° do 45° oraz 316° do 344°</td>
        <td>Bejdewind</td>
        <td>0.25</td>
    </tr>
    <tr>
        <td>46° do 90° oraz 271° do 315°</td>
        <td>Półwiatr</td>
        <td>0.(3)</td>
    </tr>
    <tr>
        <td>91° do 135° oraz 226° do 270°</td>
        <td>Baksztag</td>
        <td>0.5</td>
    </tr>
    <tr>
        <td>136° do 225°</td>
        <td>Fordewind</td>
        <td>1</td>
    </tr>
</table>

<h3>4.2. Moduł sterowania żaglówką</h3>

- System automatycznie obraca żagiel do optymalnego położenia, aby "łapać" jak najwięcej wiatru.
- Można obracać żaglówką używając przycisków na klawiaturze A oraz D.
- W przypadku emulacji na telefon, naciśnięcie lewej strony ekranu symuluje naciśnięcie przycisku A na klawiaturze, a naciśnięcie prawej strony ekranu symuluje naciśnięcie przycisku D na klawiaturze.

Rotacja obliczana jest wzorem:
- Po naciśnięciu przycisku A

```rotacja = rotacja + 1 * (aktualna prędkość) / 2 + 1```

- Po naciśnięciu przycisku D

```rotacja = rotacja - 1 * (aktualna prędkość) / 2 + 1```

Obrót obrazku żaglówki na ekranie może być obliczone wzorem:

```radiany rotacji = rotacja / 180 * PI```

```x = x + cos(radiany rotacji) * (aktualna prędkość)```

```y = y + sin(radiany rotacji) * (aktualna prędkość)```

- Jeżeli łódka będzie próbować wypłynąć poza zakresy ekranu, powinna być od razu zatrzymana.

<h2>5. Przypadki użycia</h2>

<h3>1. Losowanie kierunku wiatru</h3>

**Opis:** Użytkownik chce wylosować nowy kierunek wiatru.<br>
**Przebieg:**
- W uruchomionej aplikacji użytkownik naciska strzałke, która wskazuje obecny kierunek wiatru.
- Wiatr przyjmuje nową, losową wartość z zakresu 0-359, zmienia się kierunek strzałki wskazującej kierunek wiatru na ekranie.

<h3>2. Obracanie łódki</h3>

**Opis:** Użytkownik chce wylosować nowy kierunek wiatru.<br>
**Przebieg:**
- W uruchomionej aplikacji użytkownik naciska przycisk A lub dotyka lewej strony ekranu w przypadku urządzenia mobilnego lub naciska przycisk D lub dotyka prawej stronie ekranu w przypadku urządzenia mobilnego.
- System oblicza rotację żaglówki zgodnie ze wzorem.
- Żaglówka obraca się zgodnie z obliczoną rotacją.
- System automatycznie obraca żagiel do optymalnego położenia.
- Użytkownik może kontynuować sterowanie żaglówką poprzez naciśnięcie przycisku A lub D lub lewej lub prawej strony ekranu w przypadku urządzenia mobilnego.

<h3>3. Unikanie wypłynięcia poza ekran</h3>

**Opis:** Użytkownik próbuje wypłynąć łódką poza granice ekranu.<br>
**Przebieg:**
- W uruchomionej aplikacji użytkownik steruje łódką za pomocą klawiszy A i D lub - w przypadku urządzenia mobilnego - lewą i prawą stroną ekranu tak, aby spróbować wypłynąć poza ekran.
- Gdy żaglówka osiąga krawędź ekranu, jej ruch jest zatrzymany, aby nie wypłynęła poza ekran.

<h2>6. Technologie i ograniczenia</h2>

- JavaScript, HTML5, Canvas API.
- Aplikacja hostowana w WebView, obsługiwana przez warstwę natywną .NET MAUI.

<h2>7. Inne uwagi</h2>

- System musi być w bardzo łatwy sposób rozszerzalny.
- Powinno być pełne wsparcie dla emulacji na system Android za pomocą .NET MAUI.

