using System;
using System.Collections.Generic;

class Program
{
    static char[,] intersection = {
        { ' ', ' ', 'N', ' ', ' ' },
        { ' ', '|', '|', '|', ' ' },
        { 'W', '-', '+', '-', 'E' },
        { ' ', '|', '|', '|', ' ' },
        { ' ', ' ', 'S', ' ', ' ' }
    };

    static List<Car> cars = new List<Car>();

    class Car
    {
        public char From { get; }
        public char To { get; }

        public Car(char from, char to)
        {
            From = from;
            To = to;
        }
    }

    static void AddCar(char from, char to)
    {
        if (from == to)
        {
            Console.WriteLine("Błąd: Samochód nie może jechać w kierunku, z którego przyjechał.");
            return;
        }

        cars.Add(new Car(from, to));
    }

    static void MoveCars(string lightDirection)
    {
        if (cars.Count == 0)
        {
            Console.WriteLine("Brak samochodów na skrzyżowaniu.");
            return;
        }

        for (int i = 0; i < cars.Count; i++)
        {
            Car car = cars[i];

            if ((lightDirection == "NS" && (car.From == 'N' || car.From == 'S')) ||
                (lightDirection == "EW" && (car.From == 'E' || car.From == 'W')))
            {
                cars.RemoveAt(i);
                break;
            }
        }
    }

    static void DrawIntersection()
    {
        char[,] display = (char[,])intersection.Clone();

        foreach (var car in cars)
        {
            switch (car.From)
            {
                case 'N': display[1, 2] = 'A'; break;
                case 'S': display[3, 2] = 'A'; break;
                case 'E': display[2, 3] = 'A'; break;
                case 'W': display[2, 1] = 'A'; break;
            }
        }

        for (int i = 0; i < display.GetLength(0); i++)
        {
            for (int j = 0; j < display.GetLength(1); j++)
            {
                Console.Write(display[i, j]);
            }
            Console.WriteLine();
        }
    }

    static void Main()
    {
        while (true)
        {
            Console.Clear();
            DrawIntersection();

            Console.WriteLine("\n1. Dodaj auto (np. N S)");
            Console.WriteLine("2. Zmień światła (NS / EW)");
            Console.WriteLine("3. Przejedź auto");
            Console.WriteLine("4. Wyjście");
            Console.Write("\nWybór: ");

            string choice = Console.ReadLine();

            if (choice == "1")
            {
                Console.Write("Podaj skąd (N/E/S/W) i dokąd (N/E/S/W): ");
                string[] input = Console.ReadLine().Split();
                if (input.Length == 2)
                    AddCar(input[0][0], input[1][0]);
            }
            else if (choice == "2")
            {
                Console.Write("Podaj światła (NS / EW): ");
                string lights = Console.ReadLine();
                if (lights == "NS" || lights == "EW")
                    MoveCars(lights);
            }
            else if (choice == "3")
            {
                Console.Write("Podaj światła (NS / EW): ");
                string lights = Console.ReadLine();
                MoveCars(lights);
            }
            else if (choice == "4")
            {
                break;
            }
        }
    }
}

