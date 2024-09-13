const btnCheck = document.querySelectorAll('button'),
	popupImage = document.querySelector('.two-hours'),
	timerBg = document.querySelector('.bg-popup'),
	timerElement = document.querySelector('.timer'),
	end = document.querySelector('.end');

function getEnabledButtonsCount() {
	return Array.from(btnCheck).filter((btn) => !btn.hasAttribute('disabled'))
		.length;
}

function startTimer(duration, displayHour, displayMinute, displaySecond) {
	let timer = duration;
	const interval = setInterval(() => {
		const hours = Math.floor(timer / 3600),
			minutes = Math.floor((timer % 3600) / 60),
			seconds = timer % 60;

		displayHour.textContent = String(hours).padStart(2, '0');
		displayMinute.textContent = String(minutes).padStart(2, '0');
		displaySecond.textContent = String(seconds).padStart(2, '0');

		if (--timer < 0) {
			clearInterval(interval);
		}
	}, 1000);
}

function showPopup(condition) {
	if (condition === 'first') {
		popupImage.src = 'img/sticker.webp';
	} else if (condition === 'second') {
		popupImage.src = 'img/sticker3.webp';
	}

	timerBg.classList.add('active');
	timerElement.classList.add('active');

	setTimeout(() => {
		timerBg.classList.remove('active');
		timerElement.classList.remove('active');
	}, 2 * 60 * 1000); // 2 минуты
}

function checkTime() {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const timeTo16 = (15 - hours) * 60 + (60 - minutes); // В минутах до 16:00
	const enabledButtons = getEnabledButtonsCount();

	if (timeTo16 <= 60 && enabledButtons <= 6) {
		showPopup('second');
		startTimerForAll(3600); // Таймер на 1 час
	} else if (timeTo16 <= 120 && enabledButtons <= 4) {
		showPopup('first');
		startTimerForAll(7200); // Таймер на 2 часа
	} else {
		console.log('Ожидаем до следующей проверки через 1 час...');
		setTimeout(checkTime, 60 * 60 * 1000); // Проверяем снова через 1 час
	}
}

function startTimerForAll(duration) {
	const displayHour = timerElement.querySelector('.hour');
	const displayMinute = timerElement.querySelector('.minute');
	const displaySecond = timerElement.querySelector('.secund');
	startTimer(duration, displayHour, displayMinute, displaySecond);
}

checkTime();

function addEndDay() {
	const date = new Date(),
		endOfDay = date.getHours(),
		endDayMinutes = date.getMinutes(),
		endDaySeconds = date.getSeconds(),
		hoursLeft = 15 - endOfDay,
		minutesLeft = 59 - endDayMinutes,
		secondsLeft = 60 - endDaySeconds;

	const timeTo16 = (hoursLeft * 3600 + minutesLeft * 60 + secondsLeft) * 1000;

	const main = document.querySelector('.normal');
	const finishLine = document.querySelector('.line-8'); // Необходимо добавить элемент с классом line-8

	if (timeTo16 < 0 && !finishLine.classList.contains('done')) {
		setTimeout(addEndDay, 24 * 60 * 60 * 1000); // Запуск на следующий день
		console.log('Следующий день');
	} else {
		setTimeout(() => {
			timerBg.classList.add('active');
			timerBg.style.background = 'rgba(0, 0, 0, 0.31)';
			end.classList.add('active');
		}, timeTo16);
	}
}

addEndDay();

function closePopup() {
	console.log('jestem tu');
	end.classList.remove('active');
	timerBg.classList.remove('active');
}
