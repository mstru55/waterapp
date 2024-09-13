const btnArray = document.querySelectorAll('.btn-check'),
	rain = document.querySelector('.rain'),
	btnFinish = document.querySelector('.finish'),
	btnStart = document.querySelector('.start'),
	rainbow = document.querySelector('.rainbow-finish'),
	grassland = document.querySelector('.grassland-finish'),
	stones = document.querySelector('.stones-img');

lake = document.querySelector('.lake');
start = 0;
btnStart.removeAttribute('disabled');

document.addEventListener('DOMContentLoaded', () => {
	loadProgress();
	loadButtonState();
});

function saveButtonState() {
	btnArray.forEach((btn, index) => {
		localStorage.setItem(
			`btnState${index}`,
			`${btn.classList.contains('checked')}`
		);
	});
	localStorage.setItem('start', start); // Сохраняем прогресс
}

function loadButtonState() {
	btnArray.forEach((btn, index) => {
		const isChecked = localStorage.getItem(`btnState${index}`) === 'true';
		console.log(localStorage.getItem(`btnState${index}`));
		if (isChecked) {
			const rainLine = rain.querySelector(`.line-${btn.value}`);
			rainLine.classList.remove('none');
			rainLine.classList.add('done');
			btn.classList.add('checked');
			if (btnArray[index + 1]) {
				btnArray[index + 1].removeAttribute('disabled');
			}
		}
	});
}

function saveProgress() {
	const lakeClass = lake.classList.contains('lake-lg')
		? 'lake-lg'
		: lake.classList.contains('lake-md')
		? 'lake-md'
		: lake.classList.contains('lake-sm')
		? 'lake-sm'
		: '';
	localStorage.setItem('lakeSize', lakeClass);
	localStorage.setItem('rainbow', `${!rainbow.classList.contains('none')}`);
	localStorage.setItem('grassland', `${!grassland.classList.contains('none')}`);
	localStorage.setItem('stones', `${stones.classList.contains('none')}`);
}

// Восстановление состояния других элементов из LocalStorage
function loadProgress() {
	const lakeSize = localStorage.getItem('lakeSize');
	if (lakeSize) lake.classList.add(lakeSize);

	const isRainbowVisible = localStorage.getItem('rainbow') === 'true';
	const isGrasslandVisible = localStorage.getItem('grassland') === 'true';
	const areStonesHidden = localStorage.getItem('stones') === 'true';

	if (isRainbowVisible) rainbow.classList.remove('none');
	if (isGrasslandVisible) grassland.classList.remove('none');
	if (areStonesHidden) stones.classList.add('none');

	// Восстанавливаем прогресс
	start = parseInt(localStorage.getItem('start')) || 0;
	document.querySelector('.message').textContent = start;
}

const newsBlocks = document.querySelectorAll('.news');
let newsTimer;
function hideAllNews() {
	newsBlocks.forEach((news) => {
		news.classList.remove('active');
	});
}

function showNews(newsId) {
	const newsBlock = document.getElementById(newsId);
	if (newsBlock) {
		newsBlock.classList.add('active');
		newsTimer = setTimeout(() => {
			newsBlock.classList.remove('active');
		}, 8000);
	}
}
btnArray.forEach((btn, index) => {
	btn.addEventListener('click', (event) => {
		if (!btn.classList.contains('checked')) {
			const rainLine = rain.querySelector(`.line-${btn.value}`);
			const resultMessage = document.querySelector('.message');

			rainLine.classList.remove('none');
			rainLine.classList.add('done');
			btn.classList.add('checked');
			if (btnArray[index + 1]) {
				btnArray[index + 1].removeAttribute('disabled');
			}
			start += 375;
			hideAllNews();
			const newsId = `news-${index + 1}`;
			showNews(newsId);
			resultMessage.textContent = start;
			if (btn.value == 2) {
				lake.classList.add('lake-sm');
			}
			if (btn.value == 4) {
				return lake.classList.add('lake-md');
			}
			if (btn.value == 6) {
				return lake.classList.add('lake-lg');
			}
			saveButtonState();
			saveProgress();
		}
	});
});
btnArray.forEach((button, index) => {
	const newsId = `news-${index + 1}`;
	button.addEventListener('mouseenter', () => {
		if (button.classList.contains('checked')) {
			hideAllNews();
			showNews(newsId);
			console.log(123);
		}
	});
	button.addEventListener('mouseleave', () => {
		hideAllNews();
	});
});

btnFinish.addEventListener('click', () => {
	showLake();
	const resultMessage = document.querySelector('.result');
	resultMessage.textContent = 'GRATULACJE!';
	saveProgress();
});

function showLake() {
	rainbow.classList.remove('none');
	grassland.classList.remove('none');
	stones.classList.add('none');
	lake.classList.remove('lake-lg');
	lake.classList.remove('lake-sm');
	lake.classList.remove('lake-md');
}
