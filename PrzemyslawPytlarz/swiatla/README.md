using System;
using System.Collections.Generic;

class Program
{
    static int laneSize = 9;
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

        DrawIntersection(lightDirection);
        MoveCars(lightDirection);
        DrawIntersection(lightDirection);
    }

    static void MoveCars(string lightDirection)
    {
        List<char> dirsToCheck = new List<char>();

        if (lightDirection == "NS" || lightDirection == "SN")
        {
            dirsToCheck.AddRange(new[] { 'N', 'S' });
        }
        else if (lightDirection == "EW" || lightDirection == "WE")
        {
            dirsToCheck.AddRange(new[] { 'E', 'W' });
        }

        foreach ( var priority in new[] {"Straight", "Right", "Left" })
        {
            foreach (var dir in dirsToCheck) 
            {
                if (lanes[dir].Count == 0) continue;

                char to = lanes[dir].Peek().To;
                string movment = GetMovementType(dir, to);

                if(movment == priority)
                {
                    lanes[dir].Dequeue();
                    return;
                }
            }
        }
    }

    static string GetMovementType(char from, char to)
    {
        if((from == 'N' && to == 'S') || (from == 'S' && to == 'N') ||
           (from == 'E' && to == 'W') || (from == 'W' && to == 'E'))
        {
            return "Straight";
        }

        if ((from == 'N' && to == 'E') || (from == 'S' && to == 'W') ||
           (from == 'E' && to == 'S') || (from == 'W' && to == 'N'))
        {
            return "Right";
        }

        return "Left";
    }

    static void DrawIntersection(string lights)
    {
        Console.Clear();
        string[] north = GetLaneVertical('N');
        string[] south = GetLaneVertical('S');
        string west = GetLaneHorizontal('W');
        string east = GetLaneHorizontal('E');

        string[] layout = {
            $"              [N] ({lanes['N'].Count()})\n",
            $"               {north[4]}     ",
            $"               {north[3]}     ",
            $"               {north[2]}     ",
            $"               {north[1]}     ",
            $"               {north[0]}     ",
            $"[W]  {west[4]} {west[3]} {west[2]} {west[1]} {west[0]} + {east[0]} {east[1]} {east[2]} {east[3]} {east[4]}  [E]",
            $"({lanes['W'].Count()})            {south[0]}            ({lanes['E'].Count()})",
            $"               {south[1]}     ",
            $"               {south[2]}     ",
            $"               {south[3]}     ",
            $"               {south[4]}     ",
            $"              [S] ({lanes['S'].Count()})\n",
            $"\n Lights: {lights}"
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
            road[i] = car.To.ToString();
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
            road[i] = car.To;
            i++;
        }

        return new string(road);
    }

    static void SimulateRandomTraffic(int count)
    {
        Random rnd = new Random();

        char[] directions = { 'N', 'S', 'E', 'W' };
        string[] lights = { "NS", "EW" };

        for (int i = 0; i < count; i++) {
            char from, to;
            do
            {
                from = directions[rnd.Next(directions.Length)];
                to = directions[rnd.Next(directions.Length)];
            } while( from == to );

            string lightDirection = lights[rnd.Next(lights.Length)];

            AddCar(from, to, lightDirection);

            Thread.Sleep(2000);
        }

    }

    static void Main()
    {
        while (true) {
            Console.Write("\nDo you want to manually add cars or use random generation? (type '1' to manual or '2' to random or type EXIT): ");
            string mode = Console.ReadLine();

            if (mode.ToUpper() == "EXIT") break;
            else if (mode == "1")
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
            else if (mode == "2")
            {
                while (true)
                {
                    Console.Write("\nEnter number of random cars to add (or type EXIT): ");
                    string input = Console.ReadLine();

                    if (input.ToUpper() == "EXIT") break;
                    if (int.TryParse(input, out int count))
                    {
                        SimulateRandomTraffic(count);
                    }
                }
            }

        }
    }
}
