let canvas;
let context;

let now;
let fpsInterval = 10;  // 60fps
let then = Date.now();

document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");  // Looks for the tag 'canvas'
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
}