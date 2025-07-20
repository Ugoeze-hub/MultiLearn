// Array of image paths
const images = [
  "./img/1.webp",
  "./img/2.webp",
  "./img/3.webp",
  "./img/4.webp",
  "./img/5.webp",
  "./img/6.webp",
  "./img/7.webp",
  "./img/8.webp",
];

let currentIndex = 0;

// Function to change background image
function changeBackground() {
  document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background 1.5s ease-in-out"; // Smooth transition

  currentIndex = (currentIndex + 1) % images.length; // Loop through images
}

// Change image every 3 seconds
setInterval(changeBackground, 3000);

// Set the first image immediately
changeBackground();

console.log("background-slideshow.js is running!");
// background-slideshow.js
