# Dokuenmtacja aplikacji "BoatApp"

## 1. Wstęp
Dokument opisuje wymagania funkcjonalne dla aplikacji "BoatApp", stworzonej w technologii .NET MAUI. 

## 2. Cel systemu
System "BoatApp" ma umożliwiać użytkownikom interaktywne sterowanie wirtualną żaglówką, symulując wpływ wiatru na kurs żeglarski.

## 3. Zakres funkcjonalny

- **Moduł symulacji żaglówki** – odpowiada za wyświetlanie i sterowanie żaglówki.

- **Moduł wiatru** – symuluje kierunek oraz wpływ wiatru na żaglówkę.

- **Moduł sterowania** – umożliwia użytkownikowi zmianę kursu żeglarskiego.

- **Moduł interfejsu użytkownika** – prezentuje informacje o kursie, prędkości oraz warunkach wiatrowych.

## 4. Wymagania funkcjonalne

### 4.1. Moduł symulacji żaglówki 
**Opis:**
- Wyświetlanie graficznej reprezentacji żaglówki na ekranie.
- Obracanie żaglówką zgodnie z ruchem użytkownika. Kąt kursu zmienia się w zakresie od 0° do 359° (pełen obrót).
- Obliczanie prędkości żaglówki w zależności od kursu i kierunku wiatru, np. Prędkość = MaksymalnaPrędkość * cos(θ) (gdzie θ to różnica między kątem kursu a kierunkiem wiatru).

**Dane wejściowe:**
- Kąt obrotu żaglówki (wartość w stopniach).
- Kierunek wiatru (wartość w stopniach).

**Dane wyjściowe:**
- Nowa pozycja żaglówki.
- Prędkość żaglówki (obliczona na podstawie kąta kursu i kierunku wiatru).

### 4.2. Moduł wiatru       
**Opis:**
- Generowanie losowego kierunku wiatru (w zakresie od 0° do 359°).
- Aktualizacja wizualizacji kierunku wiatru.
- Przeliczanie wpływu wiatru na prędkość żaglówki jachtu, np. PrędkośćŻaglówki = Prędkość * SiłaWiatru * cos(θ) (gdzie θ to różnica między kierunkiem wiatru a kursem żaglówki).

**Dane wejściowe:**
- Wartość losowa określająca kierunek wiatru.

**Dane wyjściowe:**
- Zaktualizowana strzałka wiatru na ekranie.
- Nowe wartości wpływu na prędkość żaglówki.

### 4.3. Moduł sterowania 
**Opis:**
- Obsługa przycisków sterujących (←, →).
- Zmiana kursu jachtu w lewo lub prawo.
- Zapewnienie płynnej animacji ruchu.

**Dane wejściowe:**
- Wciśnięcie przycisku sterującego.

**Dane wyjściowe:**
- Nowy kąt obrotu żaglówki.

### 4.4. Moduł interfejsu użytkownika 
**Opis:**
- Wyświetlanie aktualnego kursu żeglarskiego (np. 180° oznacza kurs na południe)..
- Prezentacja prędkości żaglówki.
- Wizualizacja kierunku wiatru.

**Dane wejściowe:**
- Wyniki obliczeń z modułów żaglówki i wiatru.

**Dane wyjściowe:**
- Aktualizacja interfejsu użytkownika.


## 5. Przypadki użycia 

### Przypadek 1: Sterowanie żaglówką

***Aktorzy:***

- Użytkownik aplikacji.

***Opis:***

- Użytkownik naciska przycisk → lub ←.
- System aktualizuje kąt obrotu żaglówki.
- Prędkość żaglówki jest ponownie obliczana.
- Nowa pozycja żaglówki jest wyświetlana na ekranie.

***Dane wejściowe:***

- Wciśnięcie przycisku sterowania.

***Dane wyjściowe:***

- Zmieniona pozycja żaglówki.

### Przypadek 2: Zmiana kierunku wiatru

***Aktorzy:***

- System.

***Opis:***

- System generuje nowy kierunek wiatru.
- Wartości są przekazywane do modułu symulacji żaglówki.
- Prędkość żaglówki jest ponownie obliczana.
- Nowy kierunek wiatru jest aktualizowany graficznie.

***Dane wejściowe:***

- Losowa wartość kierunku wiatru.

***Dane wyjściowe:***

- Nowa wartość kierunku wiatru na ekranie.

## 7. Wymagania niefunkcjonalne

- System powinien działać płynnie na urządzeniach z .NET MAUI.
- Animacje powinny być responsywne i intuicyjne.
- Obsługa sterowania powinna być bezopóźnieniowa.
  
## 8. Wymagania techniczne

- Język programowania: **C#**,
- Framework: **.NET MAUI**,
- Środowisko programistyczne: **Visual Studio 2022 lub nowsze**,
- Platformy: **Windows**, **Android**, **iOS**.


