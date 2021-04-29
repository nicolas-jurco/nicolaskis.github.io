setTimeout(function start() {
	console.log("what");
	let bars = document.getElementsByClassName("bar");
	console.log(bars.length);
	for (var i = 0; i < bars.length; i++) {
		let done = false;
		let data_percent = document
			.getElementsByClassName("bar")
			[i].getAttribute("data-percent");
		bars[i].style.width = data_percent; // .replace("%", "");
		bars[i].innerHTML += '<span class="count cf"></span>'; // .replace("%", "");
		let countElement = bars[i].getElementsByClassName("count");
		let countMax = parseInt(data_percent.replace("%", ""));
		let j = 0;
		let timer = setInterval(function () {
			if (countMax == j) {
				clearInterval(timer);
				j = 0;
			} else {
				countElement[0].innerHTML =
					'<span class="count cf">' + j++ + "%</span>"; // .replace("%", "");
			}
		}, 20);
	}
}, 50);
