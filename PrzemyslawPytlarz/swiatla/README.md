using System;
using System.Collections.Generic;

class Program
{
    static int laneSize = 5;
    static Dictionary<char, Queue<Car>> lanes = new Dictionary<char, Queue<Car>>()
    {
        { 'N', new Queue<Car>() },
        { 'S', new Queue<Car>() },
        { 'E', new Queue<Car>() },
        { 'W', new Queue<Car>() }
    };

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

    static void AddCar(char from, char to, string lightDirection)
    {
        if (from == to)
        {
            Console.WriteLine("Error: A car cannot go to the direction it came from.");
            return;
        }

        if (lanes[from].Count < laneSize)
            lanes[from].Enqueue(new Car(from, to));

        DrawIntersection();
        MoveCars(lightDirection);
        DrawIntersection();
    }

    static void MoveCars(string lightDirection)
    {
        foreach (var dir in lanes.Keys)
        {
            if (lanes[dir].Count == 0) continue;

            char to = lanes[dir].Peek().To;

            if ((lightDirection == "NS" && (dir == 'N' || dir == 'S')) ||
                (lightDirection == "EW" && (dir == 'E' || dir == 'W')))
            {
                lanes[dir].Dequeue();
                break;
            }
        }
    }

    static void DrawIntersection()
    {
        Console.Clear();
        string[] north = GetLaneVertical('N');
        string[] south = GetLaneVertical('S');
        string west = GetLaneHorizontal('W');
        string east = GetLaneHorizontal('E');

        string[] layout = {
            $"    {north[0]}     ",
            $"    {north[1]}     ",
            $"    {north[2]}     ",
            $"    {north[3]}     ",
            $"    {north[4]}     ",
            "    | | |    ",
            $"{west} --- + --- {east}",
            "    | | |    ",
            $"    {south[0]}     ",
            $"    {south[1]}     ",
            $"    {south[2]}     ",
            $"    {south[3]}     ",
            $"    {south[4]}     "
        };

        foreach (var line in layout)
            Console.WriteLine(line);
    }

    static string[] GetLaneVertical(char dir)
    {
        Queue<Car> lane = lanes[dir];
        string[] road = new string[laneSize];
        Array.Fill(road, " ");

        int i = 0;
        foreach (var car in lane)
        {
            if (i >= laneSize) break;
            road[i] = car.From.ToString();
            i++;
        }

        return road;
    }

    static string GetLaneHorizontal(char dir)
    {
        Queue<Car> lane = lanes[dir];
        char[] road = new char[laneSize];
        Array.Fill(road, ' ');

        int i = 0;
        foreach (var car in lane)
        {
            if (i >= laneSize) break;
            road[i] = car.From;
            i++;
        }

        return new string(road);
    }

    static void Main()
    {
        while (true)
        {
            Console.Write("\nEnter car (from to lightDirection), e.g., N E NS (or type EXIT): ");
            string input = Console.ReadLine();

            if (input.ToUpper() == "EXIT") break;

            string[] parts = input.Split();
            if (parts.Length == 3)
                AddCar(parts[0][0], parts[1][0], parts[2]);
        }
    }
}
