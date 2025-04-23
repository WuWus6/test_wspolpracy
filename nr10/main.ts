const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    console.error("Failed to get canvas context");
}

// Set canvas width and height
canvas.width = 600; // or any other desired width
canvas.height = 600; // or any other desired height

class SimObject {
    id: string;
    position: { x: number; y: number };
    image: HTMLImageElement;
    rotation: number;
    scale: number = 1;
}

const boat: SimObject = {
    id: "Boat",
    position: { x: 100, y: 100 }, // start with initial position
    rotation: 0,
    image: new Image(),
    scale: 1
};

boat.image.src = "assets/boat.png";

const simObjects: SimObject[] = [];

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all SimObjects
    simObjects.forEach(simObject => {
        ctx.save(); // Save the current state of the canvas

        // Move the canvas context to the object's position
        ctx.translate(simObject.position.x + simObject.image.width / 2, simObject.position.y + simObject.image.height / 2);

        // Rotate the canvas context by the object's rotation (in radians)
        ctx.rotate(simObject.rotation);

        // Scale the boat image (adjust width and height as needed)
        const scale = simObject.scale; // 2x size (you can change this value to whatever you need)
        ctx.drawImage(simObject.image, -simObject.image.width / 2, -simObject.image.height / 2, simObject.image.width * scale, simObject.image.height * scale);

        ctx.restore(); // Restore the canvas state
    });

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// When the boat image has loaded, add it to simObjects and start the game loop
boat.image.onload = () => {
    simObjects.push(boat);
    requestAnimationFrame(gameLoop);
};



addEventListener("keydown", data=>{
    document.getElementById("pressedKey").innerHTML = data.key.toString()
    switch(data.key.toString()){
        case "ArrowRight": 
            boat.rotation+=0.1
        break;
        case "ArrowLeft":
            boat.rotation-=0.1
        break;
    }
})