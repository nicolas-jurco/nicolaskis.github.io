function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

(function () {
	("use strict");

	let index = 0;
	let txt = "Hi... I am going to tell you some things about me...";
	let speed = 50;

	function typeWriter() {
		let salute = document.getElementById("salute");
		let aboutMe = document.getElementsByClassName("about-me")[0];

		if (
			isElementInViewport(salute) &&
			!salute.classList.contains("completed")
		) {
			aboutMe.style.transition = "2s all";
			if (index < txt.length) {
				salute.innerHTML += txt.charAt(index);
				index++;
				setTimeout(typeWriter, speed);
			} else {
				aboutMe.style.opacity = 1;
			}
		}
	}

	function callbackFunc() {
		var items = document.querySelectorAll(".timeline li");
		for (var i = 0; i < items.length; i++) {
			if (isElementInViewport(items[i])) {
				items[i].classList.add("in-view");
			}
		}
		let bars = document.getElementsByClassName("bar");
		for (var i = 0; i < bars.length; i++) {
			if (
				isElementInViewport(bars[i]) &&
				!bars[i].classList.contains("completed")
			) {
				// for (var i = 0; i < bars.length; i++) {
				let done = false;
				let data_percent = document
					.getElementsByClassName("bar")
					[i].getAttribute("data-percent");
				bars[i].style.width = data_percent; // .replace("%", "");
				bars[i].innerHTML += '<span class="count cf"></span>'; // .replace("%", "");
				let countElement = bars[i].getElementsByClassName("count");
				let countMax = parseInt(data_percent.replace("%", ""));
				let j = 1;
				let timer = setInterval(function () {
					if (countMax == j) {
						clearInterval(timer);
						j = 1;
					} else {
						countElement[0].innerHTML =
							'<span class="count cf">' + ++j + "%</span>"; // .replace("%", "");
					}
				}, 20);
				bars[i].classList.add("completed");
				// }
			}
		}
		let hexagons = document.getElementsByClassName("miscellaneous_item");
		let position = 0;
		for (var i = 0; i < hexagons.length; i++) {
			let rect = hexagons[i].getBoundingClientRect();
			if (
				rect.left < 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <=
					(window.innerWidth || document.documentElement.clientWidth) &&
				!hexagons[i].classList.contains("completed")
			) {
				hexagons[i].style.transition = "all 2s";
				hexagons[i].style.left = "0px";
				hexagons[i].style.left = "0px";
			}
		}

		typeWriter();
	}

	// listen for events
	window.addEventListener("load", callbackFunc);
	window.addEventListener("resize", callbackFunc);
	window.addEventListener("scroll", callbackFunc);
})();

