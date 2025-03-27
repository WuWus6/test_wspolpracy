using System;
using System.Collections.Generic;
using System.Threading;

namespace TrafficLight
{
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

            DrawIntersection(lightDirection, from, to);
            MoveCars(lightDirection);
            DrawIntersection(lightDirection, from, to);
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

            foreach (var priority in new[] { "Straight", "Right", "Left" })
            {
                foreach (var dir in dirsToCheck)
                {
                    if (lanes[dir].Count == 0) continue;

                    char to = lanes[dir].Peek().To;
                    string movment = GetMovementType(dir, to);

                    if (movment == priority)
                    {
                        lanes[dir].Dequeue();
                        return;
                    }
                }
            }
        }

        static string GetMovementType(char from, char to)
        {
            if ((from == 'N' && to == 'S') || (from == 'S' && to == 'N') ||
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

        static void DrawIntersection(string lights, char lastFrom, char lastTo)
        {
            Console.Clear();
            string colorNS = lights == "NS" ? "\u001b[32m" : "\u001b[31m";
            string colorEW = lights == "EW" ? "\u001b[32m" : "\u001b[31m";
            string resetColor = "\u001b[0m";

            string[] north = GetLaneVertical('N');
            string[] south = GetLaneVertical('S');
            string west = ReverseString(GetLaneHorizontal('W'));
            string east = GetLaneHorizontal('E');

            Console.WriteLine($"              [N] ({lanes['N'].Count()})");
            for (int i = 4; i >= 0; i--) Console.WriteLine($"               {colorNS}{north[i]}{resetColor}");
            Console.WriteLine($"[W] ({lanes['W'].Count()}) {colorEW} {west} + {east} {resetColor} ({lanes['E'].Count()}) [E]");
            for (int i = 0; i < 5; i++) Console.WriteLine($"               {colorNS}{south[i]}{resetColor}");
            Console.WriteLine($"              [S] ({lanes['S'].Count()})");
            Console.WriteLine($"\n Lights: {colorNS}NS{resetColor} {colorEW}EW{resetColor}");
            Console.WriteLine($"\n Last added car: {lastFrom} -> {lastTo}");
            Console.WriteLine($"\n {testInfo}");
        }

        static string ReverseString(string input)
        {
            char[] array = input.ToCharArray();
            Array.Reverse(array);
            return new string(array);
        }

        static string[] GetLaneVertical(char dir)
        {
            Queue<Car> lane = lanes[dir];
            string[] road = new string[5];
            Array.Fill(road, "|");

            int i = 0;
            foreach (var car in lane)
            {
                if (i >= 5) break;
                road[i] = car.To.ToString();
                i++;
            }

            return road;
        }

        static string GetLaneHorizontal(char dir)
        {
            Queue<Car> lane = lanes[dir];
            char[] road = new char[5];
            Array.Fill(road, '-');

            int i = 0;
            foreach (var car in lane)
            {
                if (i >= 5) break;
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

            for (int i = 0; i < count; i++)
            {
                char from, to;
                do
                {
                    from = directions[rnd.Next(directions.Length)];
                    to = directions[rnd.Next(directions.Length)];
                } while (from == to);

                string lightDirection = lights[rnd.Next(lights.Length)];

                AddCar(from, to, lightDirection);

                Thread.Sleep(2000);
            }
        }

        static void RunTests()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Running Tests...\n");

            List<Tuple<char, char, string>> carsToAdd = new List<Tuple<char, char, string>>()
            {
                new Tuple<char, char, string>('N', 'E', "NS"),
                new Tuple<char, char, string>('S', 'W', "EW"),
                new Tuple<char, char, string>('E', 'S', "EW"),
                new Tuple<char, char, string>('W', 'N', "NS")
            };

            Dictionary<char, int> expectedCarsInLanes = new Dictionary<char, int>()
            {
                { 'N', 1 },
                { 'S', 1 },
                { 'E', 1 },
                { 'W', 1 }
            };

            TestCars(carsToAdd, expectedCarsInLanes);

            Console.ResetColor();
        }

        static string testInfo = "";

        static void TestCars(List<Tuple<char, char, string>> cars, Dictionary<char, int> expectedCarsInLanes)
        {
            testInfo += "\u001b[33mTest: TestCars\n";

            foreach (var car in cars)
            {
                char from = car.Item1;
                char to = car.Item2;
                string lightDirection = car.Item3;
                testInfo += $"Adding car from {from} to {to} with light direction {lightDirection}.\n";
                AddCar(from, to, lightDirection);
            }

            bool testPassed = true;
            foreach (var lane in expectedCarsInLanes)
            {
                char laneDirection = lane.Key;
                int expectedCount = lane.Value;
                int actualCount = lanes[laneDirection].Count;

                if (expectedCount != actualCount)
                {
                    testPassed = false;
                    testInfo += "\u001b[31mTest Failed:\n";
                    testInfo += $"Expected: {expectedCount} car(s) in lane {laneDirection}\n";
                    testInfo += $"Actual: {actualCount} car(s) in lane {laneDirection}\n";
                }
            }


            if (testPassed)
            {
                testInfo += "\u001b[32mTest Passed: All cars added correctly.\n";
            }
            else
            {
                testInfo += "\u001b[31mTest Failed: Some lanes don't have the expected number of cars.\n";
            }

            testInfo += "\u001b[0m";
        }



        public static void Main()
        {
            while (true)
            {
                Console.Write("\nDo you want to manually add cars or use random generation? (type '1' to manual or '2' to random or type EXIT, or 'T' to run tests): ");
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
                else if (mode.ToUpper() == "T")
                {
                    RunTests();
                }
            }
        }
    }
}
