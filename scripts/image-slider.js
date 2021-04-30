//! image fits to parent container by dinamically chaging size
// TODO: slider separated into upper and bottom, might be good idea to deal only with one array
//? good practice?

const container = document.querySelector(".slide-container");
const upper_slider = document.querySelector("#upper-slider.slider");
const bottom_slider = document.querySelector("#bottom-slider.slider");
const upper_images = document
	.getElementById("upper-slider")
	.querySelectorAll(".slider img");
const bottom_images = document
	.getElementById("bottom-slider")
	.querySelectorAll(".slider img");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let counter_up = 1;
let counter_down = bottom_images.length - 1;

let SIZE_WIDTH = 0;
let SIZE_HEIGHT = 0;

document.addEventListener("DOMContentLoaded", () => {
	calculateImgWidth();
});

window.addEventListener("resize", () => {
	calculateImgWidth();
});

function calculateImgWidth() {
	SIZE_WIDTH = container.offsetWidth;
	SIZE_HEIGHT = container.offsetHeight;
	for (let i = 0; i < upper_images.length; i++) {
		upper_images[i].style.minWidth = SIZE_WIDTH + "px";
		bottom_images[i].style.minWidth = SIZE_WIDTH + "px";
		upper_images[i].style.height = SIZE_HEIGHT + "px";
		bottom_images[i].style.height = SIZE_HEIGHT + "px";
	}
	upper_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_up + "px)";
	bottom_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_down + "px)";
}

nextBtn.addEventListener("click", () => {
	if (counter_up + 1 > upper_images.length - 1 || counter_down - 1 < 0) return;
	// !flex direction column
	upper_slider.style.transition = "transform 0.4s ease-in-out";
	bottom_slider.style.transition = "transform 0.4s ease-in-out";
	counter_up++;
	counter_down--;
	upper_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_up + "px)";
	bottom_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_down + "px)";
});

prevBtn.addEventListener("click", () => {
	if (counter_up - 1 < 0 || counter_down + 1 > bottom_images.length - 1) return;
	// !flex direction column
	upper_slider.style.transition = "transform 0.4s ease-in-out";
	bottom_slider.style.transition = "transform 0.4s ease-in-out";
	counter_up--;
	counter_down++;
	upper_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_up + "px)";
	bottom_slider.style.transform =
		"translateX(" + -+SIZE_WIDTH * counter_down + "px)";
});

upper_slider.addEventListener("transitionend", () => {
	if (upper_images[counter_up].id === "lastClone") {
		upper_slider.style.transition = "none";
		counter_up = upper_images.length - 2;
		upper_slider.style.transform =
			"translateX(" + -SIZE_WIDTH * counter_up + "px)";
	}
	if (upper_images[counter_up].id === "firstClone") {
		upper_slider.style.transition = "none";
		counter_up = upper_images.length - counter_up;
		upper_slider.style.transform =
			"translateX(" + -SIZE_WIDTH * counter_up + "px)";
	}
});

bottom_slider.addEventListener("transitionend", () => {
	if (bottom_images[counter_down].id === "lastClone") {
		bottom_slider.style.transition = "none";
		counter_down = bottom_images.length - 2;
		bottom_slider.style.transform =
			"translateX(" + -SIZE_WIDTH * counter_down + "px)";
	}
	if (bottom_images[counter_down].id === "firstClone") {
		bottom_slider.style.transition = "none";
		counter_down = bottom_images.length - counter_down;
		bottom_slider.style.transform =
			"translateX(" + -SIZE_WIDTH * counter_down + "px)";
	}
});
