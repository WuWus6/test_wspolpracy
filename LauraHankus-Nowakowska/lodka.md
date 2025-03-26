# Dokumentacja Aplikacji Mobilnej – "Łódka"

> Aplikacja mobilna "Łódka" umożliwia interaktywne sterowanie łódką na wodzie przy użyciu przycisków na ekranie lub strzałek na klawiaturze. Gra symuluje wpływ wiatru na ruch łódki, co wymaga od użytkownika odpowiedniego dostosowania sterowania. Kierunek i siła wiatru zmieniają się dynamicznie, wpływając na prędkość łódki.

## Spis Treści

1. [Funkcjonalności](#funkcjonalności)
2. [Technologie](#technologie)
3. [Instalacja](#instalacja)
4. [Scenariusze użycia](#scenariusze-użycia)

## Funkcjonalności

1. **Sterowanie łódką**: Użytkownik może poruszać łódką (w lewo, w prawo) za pomocą przycisków na ekranie lub strzałek na klawiaturze.
2. **Symulacja wiatru**: Gra generuje losowy kierunek i prędkość wiatru, które wpływają na ruch łódki.
3. **Realistyczna fizyka**: Łódka porusza się szybciej lub wolniej w zależności od kąta względem kierunku wiatru.
4. **Interakcja z wiatrem**: Gracz musi dostosować sterowanie do zmieniających się warunków wiatru, żeby efektywnie poruszać się po wodzie.

## Technologie

### .NET MAUI

## Instalacja

```bash
git clone https://github.com/danekkkk/lodka-mobile.git
```

## Scenariusze użycia

### Scenariusz 1: Generowanie kierunku i prędkości wiatru

**Aktorzy**: Użytkownik\
**Opis**: Po uruchomieniu aplikacji system generuje losowy kierunek oraz prędkość wiatru, które wpływają na warunki żeglugi. Użytkownik może analizować wpływ tych parametrów na ruch łódki.\
**Przebieg**:

1. Użytkownik otwiera aplikację.
2. Aplikacja losuje kierunek wiatru i prezentuje go na kompasie.
3. Na ekranie wyświetla się komunikat z informacją o kierunku wiatru (np. "Wiatr północno-zachodni") oraz jego prędkości w węzłach.
4. Użytkownik może rozpocząć żeglowanie, biorąc pod uwagę aktualne warunki atmosferyczne.

### Scenariusz 2: Generowanie kierunku i prędkości wiatru (drugi przypadek)

**Aktorzy**: Użytkownik\
**Opis**: W trakcie działania aplikacji na bieżąco zmienia się kierunek i prędkość wiatru wpływające na warunki żeglugi. Użytkownik może analizować jak wpływają one na ruch łódki.\
**Przebieg**: 

1. Użytkownik otwiera aplikację.
2. Aplikacja w trakcie gdy użytkownik rozpoczął juz żegluge, zmienia na bieżąco kierunek i prędkość wiatru.
3. Na ekranie wyświetla się komunikat o zmianie parametrów wiatru.
4. Użytkownik może kontyuować żeglowanie.

### Scenariusz 3: Sterowanie łódką

**Aktorzy**: Użytkownik\
**Opis**: Gracz używa interfejsu lub klawiszy do sterowania łódką, zmieniając jej kurs względem wiatru. Sterowanie pozwala użytkownikowi eksperymentować z różnymi strategiami żeglowania, jednocześnie zmieniając kierunek i dostosowując prędkość łódki w czasie rzeczywistym.\
**Przebieg**:

1. Użytkownik dotyka przycisku `<`, aby obrócić łódkę w lewo o 10°.
2. Użytkownik dotyka przycisku `>`, aby obrócić łódkę w prawo o 10°.
3. Zmiana orientacji jest wizualizowana poprzez animację ruchu łódki.
4. Aplikacja na bieżąco dostosowuje prędkość łódki względem do kierunku wiatru i kierunku, w którym płynie.
5. Gdy łódka płynie z wiatrem osiąga największą prędkość (15 węzłów [ok. 25 km/h]).
6. Im kąt żeglugi łódki jest bliżej martwego kąta, tym jej prędkość się zmniejsza.
7. Gdy łódka znajdzie się w martwym kącie (płynie pod wiatr), jej prędkość zostaje zredukowana do zera.

### Scenariusz 4: Obliczanie prędkości łódki

**Aktorzy**: Łódka\
**Opis**: Aplikacja stale aktualizuje prędkość łódki w zależności od jej kąta względem wiatru.\
**Przebieg**:

1. Użytkownik ustawia łódkę pod określonym kątem względem wiatru.
2. Symulator oblicza prędkość łódki, uwzględniając:
   - Aktualny kierunek i prędkość wiatru,
   - Kierunek, w którym płynie łódka,
   - Wpływ martwego kąta na ruch łódki.
3. Wynikowa prędkość jest wyświetlana w lewym górnym rogu interfejsu.
4. W zależności od kąta ustawienia:
   - Największa prędkość jest osiągana przy półwietrze,
   - W martwym kącie łódka traci możliwość poruszania się.
