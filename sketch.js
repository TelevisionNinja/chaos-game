let width = 0;
let height = 0;
let isDrawing = false;
let seeds = [];
let previousPoints = [];
const previousLimit = 1;
let previousIndex = 0;

function setup() {
    width = windowWidth - 16;
    height = windowHeight - 64;
    const canvas = createCanvas(width, height);
    canvas.mouseClicked(addSeed);

    background(32, 32, 32);

    previousPoints.push([randomMath(width), randomMath(height)]);
}

function windowResized() {
    width = windowWidth - 16;
    height = windowHeight - 64;
    resizeCanvas(width, height);
    background(32, 32, 32);
}

function draw() {
    if (isDrawing) {
        strokeWeight(1);
        stroke(128, 128, 255, 64);

        const percentage = document.getElementById("rSlider").value;

        for (let i = 0; i < 1000; i++) { // draw 1000 points at a time
            const randomSeed = seeds[randomMath(seeds.length)];
            const newPreviousPoint = vectorLinearInterpolation(previousPoints[previousIndex], randomSeed, percentage);
            previousIndex = (previousIndex + 1) % previousLimit;

            if (previousPoints.length < previousLimit) {
                previousPoints.push(newPreviousPoint);
            }
            else {
                previousPoints[previousIndex] = newPreviousPoint;
            }

            point(newPreviousPoint[0], newPreviousPoint[1]);
        }
    }
    else {
        strokeWeight(5);
        stroke(255, 255, 255, 255);

        for (let i = 0; i < seeds.length; i++) {
            const p = seeds[i];
            point(p[0], p[1]);
        }
    }
}

function addSeed() {
    if (!isDrawing) {
        seeds.push([mouseX, mouseY]);
    }
}

function startDrawing() {
    isDrawing = !isDrawing;
}

/**
 * 
 * @param {*} min inclusive min
 * @param {*} max 
 * @param {*} inclusive exclusive max
 * @returns 
 */
function randomMath(min = 0, max = 0) {
    if (max === min) {
        return max;
    }

    if (min > max) {
        const temp = max;
        max = min;
        min = temp;
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

function linearInterpolation(x1, x2, percentage) {
    return (x2 - x1) * percentage + x1;
}

function vectorLinearInterpolation(vec1, vec2, percentage) {
    return [linearInterpolation(vec1[0], vec2[0], percentage), linearInterpolation(vec1[1], vec2[1], percentage)];
}
