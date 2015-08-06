var renderController = function () {
	let game = null;
	let board = null;
	let topHand = null;
	let bottomHand = null;
	
	let getX = x => (board.offsetWidth / 4) * x;
	
	let getY = y => (board.offsetHeight / 4) * y + topHand.offsetHeight + 10;
	
	let updateBoardCard = (id, pos, transition) => {
		let element = document.querySelector(`#${id}`);
		
		if (transition) {
			element.style.transitionDuration = "0.5s";
		}
		
		element.style.left = `${getX(pos % 4)}px`;
		element.style.top = `${getY(Math.floor(pos / 4))}px`;
		element.style.height = `${board.offsetHeight / 4}px`;
		element.style.width = `${board.offsetWidth / 4}px`;
		element.style.transitionDuration = "";
	}
	
	let updateHandCard = (id, hand, isBottomHand) => {
		let i = hand.findIndex(c => c && c.id === id);
		let card = document.querySelector(`#${id}`);
		
		card.style.width = `${board.offsetWidth / 5}px`;
		card.style.height = `${board.offsetHeight / 5}px`;
		card.style.top = `${isBottomHand ? topHand.offsetHeight + board.offsetHeight + 20 : 0}px`;
		card.style.left = `${(board.offsetWidth / 5) * i}px`;
	}
	
	let updateBoard = (bottomCards, topCards, boardCards) => {
		let gHeight = game.offsetHeight;
		let gWidth = game.offsetWidth;
		let bHeight = 0;
		let bWidth = 0;
		
		// TODO: make readable
		if (gWidth < (gHeight * (4 / 5.6) - 20)) {
			bWidth = gWidth;
			bHeight = bWidth;
		} else {
			bHeight = gHeight * (4 / 5.6) - 20;
			bWidth = bHeight;
		}
		
		board.style.width = `${bWidth}px`;
		board.style.height = `${bHeight}px`;
		
		topHand.style.width = `${bWidth}px`;
		topHand.style.height = `${bWidth / 5}px`;
		bottomHand.style.width = `${bWidth}px`;
		bottomHand.style.height = `${bWidth / 5}px`;
		
		bottomCards.filter(c => c !== null).forEach(c => updateHandCard(c.id, bottomCards, true));
		topCards.filter(c => c !== null).forEach(c => updateHandCard(c.id, topCards, false));
		boardCards.forEach(c => updateBoardCard(c.id, c.pos));
	};
	
	let createElement = (type, classes = [], id = null) => {
		let el = document.createElement(type);
		if (id) {
			el.id = id;
		}		
		classes.forEach(c => el.classList.add(c));
		return el;
	};
	
	let addTiles = (container, count) => {
		container.appendChild(createElement("div", ["tile"]));
		if (count > 1) {
			addTiles(container, count - 1);
		}
	};
	
	let init = (containerId, bottomCards, topCards, boardCards) => {
		game = document.querySelector(`#${containerId}`);
		game.classList.add("game");
		topHand = createElement("div", ["hand"]);
		game.appendChild(topHand);
		addTiles(topHand, 5);		
		board = createElement("div", ["board"]);
		game.appendChild(board);
		addTiles(board, 16);		
		bottomHand = createElement("div", ["hand"]);
		game.appendChild(bottomHand);
		addTiles(bottomHand, 5);		
		
		let cards = createElement("div", ["cards"]);
		game.appendChild(cards);
		bottomCards.forEach(card => cards.appendChild(createElement("div", ["card", "card-blue"], card.id)));
		topCards.forEach(card => cards.appendChild(createElement("div", ["card", "card-red"], card.id)));
		
		updateBoard(bottomCards, topCards, boardCards);
	};
	
	return { init, updateBoard, updateBoardCard };
}

var gameController = function () {
	let renderer = renderController();
	let handCards = [];
	let opponentCards = [];
	let boardCards = [];		
	
	let moveTo = (id, pos, isPlayer) => {
		let hand = isPlayer ? handCards : opponentCards;
		let i = hand.findIndex(c => c && c.id === id);
		
		if (i >= 0) {
			boardCards.push({ id: hand[i].id, pos });
			hand[i] = null;
			
			renderer.updateBoardCard(id, pos, true);
		}
	};
	
	let init = (p1Cards, p2Cards) => {
		handCards = p1Cards;
		opponentCards = p2Cards;
		renderer.init("game", p1Cards, p2Cards, boardCards);
		window.addEventListener("resize", () => renderer.updateBoard(handCards, opponentCards, boardCards));
	};
	
	return { init, moveTo };
}();

// TEST DATA AND INIT

var p1Cards = [
	{ id: "p1c1" },
	{ id: "p1c2" },
	{ id: "p1c3" },
	{ id: "p1c4" },
	{ id: "p1c5" }
];

var p2Cards  = [
	{ id: "p2c1" },
	{ id: "p2c2" },
	{ id: "p2c3" },
	{ id: "p2c4" },
	{ id: "p2c5" }
];

gameController.init(p1Cards, p2Cards);