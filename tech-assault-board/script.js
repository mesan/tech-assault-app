var gameController = function () {
	let game = document.querySelector(".game");
	let board = document.querySelector(".board");
	let hands = document.querySelectorAll(".hand");
	let handCards = [];
	let opponentCards = [];
	let boardCards = [];
	
	let getX = x => (board.offsetWidth / 4) * (x - 1);
	
	let getY = y => (board.offsetHeight / 4) * (y - 1) + hands[0].offsetHeight + 10;
	
	let moveCardOnBoard = (id, x, y, transition) => {
		let element = document.querySelector(`#${id}`);
		
		if (transition) {
			element.style.transitionDuration = "0.5s";
		}
		
		element.style.left = `${getX(x)}px`;
		element.style.top = `${getY(y)}px`;
		element.style.height = `${board.offsetHeight / 4}px`;
		element.style.width = `${board.offsetWidth / 4}px`;
		element.style.transitionDuration = "";
	}
	
	let moveTo = (id, x, y, isPlayer) => {
		let hand = isPlayer ? handCards : opponentCards;
		let i = hand.findIndex(c => c && c.id === id);
		
		if (i >= 0) {
			boardCards.push({ id: hand[i].id, x, y });
			hand[i] = null;
			
			moveCardOnBoard(id, x, y, true);
		}		
	};
	
	let moveCardInHand = (id, isPlayer) => {
		let hand = isPlayer ? handCards : opponentCards;
		let i = hand.findIndex(c => c && c.id === id);
		
		let card = document.querySelector(`#${hand[i].id}`);
		card.style.width = `${board.offsetWidth / 5}px`;
		card.style.height = `${board.offsetHeight / 5}px`;
		card.style.top = `${isPlayer ? hands[0].offsetHeight + board.offsetHeight + 20 : 0}px`;
		card.style.left = `${(board.offsetWidth / 5) * i}px`;
	}
	
	let setSizes = () => {
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
		
		hands[0].style.width = `${bWidth}px`;
		hands[0].style.height = `${bWidth / 5}px`;
		hands[1].style.width = `${bWidth}px`;
		hands[1].style.height = `${bWidth / 5}px`;
		
		handCards.filter(c => c !== null).forEach(c => moveCardInHand(c.id, true));
		opponentCards.filter(c => c !== null).forEach(c => moveCardInHand(c.id, false));
		boardCards.forEach(c => moveCardOnBoard(c.id, c.x, c.y));
	};
	
	let init = (p1Cards, p2Cards) => {
		handCards = p1Cards;
		opponentCards = p2Cards;
		setSizes();
		window.addEventListener("resize", setSizes);
	}
	
	return { init, moveTo, setSizes };
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