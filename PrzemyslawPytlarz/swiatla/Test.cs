using NUnit.Framework;
using System;
using System.Collections.Generic;
using TrafficLight;

[TestFixture]
public class TrafficLightTests
{
    private Dictionary<char, Queue<Program.Car>> lanes;

    [SetUp]
    public void Setup()
    {
        lanes = new Dictionary<char, Queue<Program.Car>>()
        {
            { 'N', new Queue<Program.Car>() },
            { 'S', new Queue<Program.Car>() },
            { 'E', new Queue<Program.Car>() },
            { 'W', new Queue<Program.Car>() }
        };
    }

    [Test]
    public void TestAddCar()
    {
        Program.AddCar('N', 'E', "NS");
        Assert.That(lanes['N'].Count, Is.EqualTo(1));
    }

    [Test]
    public void TestCarCannotGoBackwards()
    {
        Assert.DoesNotThrow(() => Program.AddCar('N', 'N', "NS"));
    }

    [Test]
    public void TestMoveCarsWithGreenLight()
    {
        Program.AddCar('N', 'S', "NS");
        Program.MoveCars("NS");
        Assert.That(lanes['N'].Count, Is.EqualTo(1));
    }

    [Test]
    public void TestMoveCarsWithRedLight()
    {
        Program.AddCar('N', 'S', "EW");
        Program.MoveCars("EW");
        Assert.That(lanes['N'].Count, Is.EqualTo(1));
    }
}