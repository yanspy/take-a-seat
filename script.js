const SECTORS_COUNT = 3
const LINES_COUNT = 8
const SEATS_COUNT = 10
const arenaElem = document.querySelector('#arena');
const outputElem = document.querySelector('#output')
const generateNumbersRange = (from, to) => {
	let result = [];
	for (let i=from;i<=to;i++) {
		result.push(i);
	}
	return result
}

const getSeats = () => {
	return generateNumbersRange(1,SEATS_COUNT).map(seatNumber =>
	`<div class="sector__seat ${Math.random()>0.2?"":"seat-taken"}" data-seat="${seatNumber}">${seatNumber}</div>`).join('');
}

const getLines = () => {
	return generateNumbersRange(1,LINES_COUNT).map(lineNumber =>
	`<div class="sector__line" data-line="${lineNumber}">
			<div class="sector__line-seats">
					${getSeats()}
			</div>
			<div class='sector__line-head'>Ряд <span class="sector__line-number">${lineNumber}</span></div>
	</div>`).join('');
}
const renderArena = () => {
	const sectorHtml = generateNumbersRange(1, SECTORS_COUNT).map(sectorNumber =>
	`<div class='sector' data-sector="${sectorNumber}">
			<div class="sector-head">Сектор <span class="sector__head-number">${sectorNumber}</span></div>
			${getLines()}
		</div>`).join('');
	arenaElem.innerHTML = sectorHtml
}
renderArena();

const chooseSeat = (event) => {
	if (!event.target.classList.contains('sector__seat') || event.target.classList.contains('seat-selected') || event.target.classList.contains('seat-taken')) {
		return
	}
	const seatElem = event.target
	seatElem.classList.add('seat-selected')
	const choosenSector = seatElem.closest('.sector').dataset.sector;
	const choosenLine = seatElem.closest('.sector__line').dataset.line;
	const choosenSeat = seatElem.dataset.seat;

	const outputHtml = `
			Сектор: <span class="seat__ouput-text">${choosenSector}</span>
			Ряд: <span class="seat__ouput-text">${choosenLine}</span>
			Место: <span class="seat__ouput-text">${choosenSeat}</span>`
	const choosenSeatElem = document.createElement('div')
	choosenSeatElem.classList.add('seat__output-item')
	choosenSeatElem.innerHTML = outputHtml
	outputElem.prepend(choosenSeatElem) 
}

arenaElem.addEventListener('click', chooseSeat)

const removeSeat = (event) => {
	if (!event.target.classList.contains("seat__output-item")) {
		return
	}
	const outputItemElem = event.target
	const [sectorNumber, lineNumber, seatNumber] = [...outputItemElem.querySelectorAll(".seat__ouput-text")].map(elem => elem.innerText)
	const removeSeat = arenaElem.querySelector(`.sector[data-sector='${sectorNumber}']`).querySelector(`.sector__line[data-line='${lineNumber}']`).querySelector(`.sector__seat[data-seat='${seatNumber}']`)
	removeSeat.classList.remove('seat-selected')
	outputItemElem.remove();
}

outputElem.addEventListener('dblclick', removeSeat)

