var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function populateDates() {
	var today = new Date(),
		day = today.getUTCDate(),
		month = today.getUTCMonth(),
		year = today.getUTCFullYear(),
		daysInCurrMonth = daysInMonth(month, year);

	// Year
	for (var i = 0; i < 100; i++) {
		var opt = document.createElement('option');
		opt.value = year - i;
		opt.text = year - i;
		yeardropdown.appendChild(opt);
	}

	// Month
	for (var i = 0; i < 12; i++) {
		var opt = document.createElement('option');
		opt.value = months[i];
		opt.text = months[i];
		monthdropdown.appendChild(opt);
	}

	// Day
	for (var i = 0; i < daysInCurrMonth; i++) {
		var opt = document.createElement('option');
		opt.value = days[i];
		opt.text = days[i];
		daydropdown.appendChild(opt);
	}
}

var daydropdown = document.getElementById("daydropdown"),
	monthdropdown = document.getElementById("monthdropdown"),
	yeardropdown = document.getElementById("yeardropdown");

// Change handler for months
monthdropdown.onchange = function () {
	var newMonth = months.indexOf(monthdropdown.value) + 1,
		newYear = yeardropdown.value;

	daysInCurrMonth = daysInMonth(newMonth, newYear);

	daydropdown.innerHTML = "";
	for (var i = 0; i < daysInCurrMonth; i++) {
		var opt = document.createElement('option');
		opt.value = days[i];
		opt.text = days[i];
		daydropdown.appendChild(opt);
	}
}

populateDates()

function yourMagicSquare() {

	var constantMatrix = [
		[0, 0, 0, 0],
		[1, -1, -3, 3],
		[-2, 2, 2, -2],
		[1, -1, 1, -1]
	];

	var r1c1 = Number(document.getElementById("daydropdown").value);
	var r1c2 = Number(document.getElementById("monthdropdown").value);
	var year = Number(document.getElementById("yeardropdown").value);

	var r1c3 = Math.floor(year * 0.01);
	var r1c4 = year - r1c3 * 100;

	var variableMatrix = [
		[r1c1, r1c2, r1c3, r1c4],
		[r1c4, r1c3, r1c2, r1c1],
		[r1c2, r1c1, r1c4, r1c3],
		[r1c3, r1c4, r1c1, r1c2]
	];

	var result = [];

	for (r = 0; r < variableMatrix.length; r++) {

		result[r] = Array(variableMatrix.length);

		for (c = 0; c < result[r].length; c++) {

			result[r][c] = variableMatrix[r][c] + constantMatrix[r][c];

			if (result[r][c] >= 0 && result[r][c] <= 9) {

				result[r][c] = "0" + result[r][c];

			}
		}
	}

	function magicSquareRemove() {

		var id = document.getElementById('table');
		var yourMagicSquare = document.getElementById('yourMagicSquare');
		var yourMagicNumber = document.getElementById('yourMagicNumber');

		if (id != null) {
			id.remove();
		}

		if (yourMagicSquare != null) {
			yourMagicSquare.remove();
		}

		if (yourMagicNumber != null) {
			yourMagicNumber.remove();
		}
	}

	function magicSquare() {

		var id = document.getElementById("magicSquare");

		var yourMagicSquare = document.createElement("P");
		yourMagicSquare.id = "yourMagicSquare";
		yourMagicSquare.innerHTML = "Your Magic Square is:";
		yourMagicSquare.classList.add("active");
		id.appendChild(yourMagicSquare);

		var table = document.createElement('TABLE');
		table.id = "table";

		var tableBody = document.createElement('TBODY');
		table.appendChild(tableBody);

		for (var r = 0; r < variableMatrix.length; r++) {

			var tr = document.createElement('TR');
			tableBody.appendChild(tr);

			for (var c = 0; c < result[r].length; c++) {

				var td = document.createElement('TD');

				td.appendChild(document.createTextNode(result[r][c]));
				tr.appendChild(td);

			}
		}

		id.appendChild(table);

		var yourMagicNumber = document.createElement("P");
		yourMagicNumber.id = "yourMagicNumber";
		yourMagicNumber.innerHTML = "Your Magic Number is: " + (r1c1 + r1c2 + r1c3 + r1c4);
		yourMagicNumber.classList.add("active");
		id.appendChild(yourMagicNumber);
	}

	magicSquareRemove();
	magicSquare();
}


/****************/

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration
				.scope);
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	addBtn.style.display = 'block';

	addBtn.addEventListener('click', (e) => {
		// hide our user interface that shows our A2HS button
		addBtn.style.display = 'none';
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});
});

window.addEventListener("beforeinstallprompt", function (beforeInstallPromptEvent) {
	beforeInstallPromptEvent.preventDefault(); // Prevents immediate prompt display

	// Shows prompt after a user clicks an "install" button
	installButton.addEventListener("click", function (mouseEvent) {
		// you should not use the MouseEvent here, obviously
		beforeInstallPromptEvent.prompt();
	});

	installButton.hidden = false; // Make button operable
});