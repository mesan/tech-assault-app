var renderController = function () {
	const boardSize = 4;
	let game = null;
	let board = null;
	let topHand = null;
	let bottomHand = null;
	
	let getX = x => (board.offsetWidth / boardSize) * x;
	
	let getY = y => (board.offsetHeight / boardSize) * y + topHand.offsetHeight + 10;
	
	let updateBoardCard = (id, pos, transition) => {
		let element = document.querySelector(`[id='${id}'`);
		
		if (transition) {
			element.style.transitionDuration = "0.5s";
		}
		
		element.style.left = `${getX(pos % boardSize)}px`;
		element.style.top = `${getY(Math.floor(pos / boardSize))}px`;
		element.style.height = `${board.offsetHeight / boardSize}px`;
		element.style.width = `${board.offsetWidth / boardSize}px`;
		element.style.transitionDuration = "";
	}
	
	let updateHandCard = (id, hand, isBottomHand) => {
		let i = hand.findIndex(c => c && c.id === id);
		let card = document.querySelector(`[id='${id}'`);
		
		card.style.width = `${board.offsetWidth / 5}px`;
		card.style.height = `${board.offsetHeight / 5}px`;
		card.style.top = `${isBottomHand ? topHand.offsetHeight + board.offsetHeight + 20 : 0}px`;
		card.style.left = `${(board.offsetWidth / 5) * i}px`;
	}
	
	let updateBoard = (playerCards, opponentCardCount, tiles, cards) => {
		let gHeight = game.offsetHeight;
		let gWidth = game.offsetWidth;
		let bHeight = 0;
		let bWidth = 0;
		
		// Scale tile sizes to portrait/landscape
		if (gWidth < (gHeight * (boardSize / 5.6) - 20)) {
			bWidth = gWidth;
			bHeight = bWidth;
		} else {
			bHeight = gHeight * (boardSize / 5.6) - 20;
			bWidth = bHeight;
		}
		
		board.style.width = `${bWidth}px`;
		board.style.height = `${bHeight}px`;
		
		topHand.style.width = `${bWidth}px`;
		topHand.style.height = `${bWidth / 5}px`;
		bottomHand.style.width = `${bWidth}px`;
		bottomHand.style.height = `${bWidth / 5}px`;
		
		playerCards.forEach(c => updateHandCard(c.id, playerCards, true));
		// topCards.filter(c => c !== null).forEach(c => updateHandCard(c.id, topCards, false));
		for (var i = 0; i < tiles.length; i++) {
			if (typeof tiles[i] === "string") {
				updateBoardCard(tiles[i], i);
			}
		}
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
	
	let addBoardTiles = (container, tiles) => {
		let classes = tiles[0] === 1 ? ["tile", "tile-rock"] : ["tile"];
		container.appendChild(createElement("div", classes));
		if (tiles.length > 1) {
			addBoardTiles(container, tiles.slice(1));
		}
	};
	
	let init = (containerId, state) => {
		game = document.querySelector(`#${containerId}`);
		game.classList.add("game");
		topHand = createElement("div", ["hand"]);
		game.appendChild(topHand);
		addTiles(topHand, 5);
		board = createElement("div", ["board"]);
		game.appendChild(board);
		addBoardTiles(board, state.board);
		bottomHand = createElement("div", ["hand"]);
		game.appendChild(bottomHand);
		addTiles(bottomHand, 5);		
		
		let cards = createElement("div", ["cards"]);
		game.appendChild(cards);
		state.cards.forEach(card => cards.appendChild(createElement("div", ["card", "card-blue"], card.id)));
		state.primaryDeck.forEach(card => cards.appendChild(createElement("div", ["card", "card-blue"], card.id)));
		
		updateBoard(state.primaryDeck, state.opponentPrimaryDeckSize, state.board, state.cards);
	};
	
	return { init, updateBoard, updateBoardCard };
}

var gameController = function () {
	let renderer = renderController();
	let state = null;
	
	// let moveTo = (id, pos, isPlayer) => {
	// 	let hand = isPlayer ? handCards : opponentCards;
	// 	let i = hand.findIndex(c => c && c.id === id);
	// 	
	// 	if (i >= 0) {
	// 		boardCards.push({ id: hand[i].id, pos });
	// 		hand[i] = null;
	// 		
	// 		renderer.updateBoardCard(id, pos, true);
	// 	}
	// };
	
	let init = (initialState) => {
		state = initialState;
		renderer.init("game", initialState);
		window.addEventListener("resize", () => renderer.updateBoard(state.primaryDeck, state.opponentPrimarDeckSize, state.board, state.cards));
	};
	
	return { init };
}();

// TEST DATA AND INIT

var testState = {
    "players": [
        {
            "id": "tw-123",
            "name": "Arild Tvergrov",
            "avatar": "http://url"
        },
        {
            "id": "tw-555",
            "name": "John Doe",
            "avatar": "http://url"
        }
    ],
    "board": [
        0, 0, 0, 0,
        1, "3cf8cc21-0bdc-48c0-9674-019232cb3c2b", 0, "88679725-8b41-4e2f-9e94-063dfc41586b",
        1, 1, "2a5f316e-b55f-4c3d-866b-2c27737b5cd5", 0,
        0, 0, 0, "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6"
    ],
    "score": [
        4,
        0
    ],
    "nextTurn": "tw-555",
    "actions": [
        {
            "player": "tw-555",
            "type": "cardPlaced",
            "cardId": "88679725-8b41-4e2f-9e94-063dfc41586b",
            "cardPosition": 15,
            "events": []
        },
        {
            "player": "tw-123",
            "type": "cardPlaced",
            "cardId": "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6",
            "cardPosition": 15,
            "events": []
        },
        {
            "player": "tw-555",
            "type": "cardPlaced",
            "cardId": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
            "cardPosition": 10,
            "events": []
        },
        {
            "player": "tw-123",
            "type": "cardPlaced",
            "cardId": "3cf8cc21-0bdc-48c0-9674-019232cb3c2b",
            "cardPosition": 5,
            "events": [
                {
                    "type": "battle",
                    "opposingCardId": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
                    "opposingCardPosition": 10,
                    "cardPower": 123,
                    "opposingCardPower": 118
                },
                {
                    "type": "takeOver",
                    "newOwner": "tw-123",
                    "cardId": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
                    "cardPosition": 10
                },
                {
                    "type": "takeOver",
                    "newOwner": "tw-123",
                    "cardId": "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6",
                    "cardPosition": 15
                }
            ]
        }
    ],
    "cards": [
        {
            "id": "3cf8cc21-0bdc-48c0-9674-019232cb3c2b",
            "name": "C#",
            "image": "url",
            "owner": "tw-123",
            "attack": 2,
            "defense": 1,
            "arrows": [0, 0, 0, 1, 0, 0, 0, 0]
        },
        {
            "id": "88679725-8b41-4e2f-9e94-063dfc41586b",
            "name": "Azure",
            "image": "url",
            "owner": "tw-123",
            "attack": 2,
            "defense": 3,
            "arrows": [0, 0, 0, 0, 0, 0, 1, 1]
        },
        {
            "id": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
            "name": "Python",
            "image": "url",
            "owner": "tw-123",
            "attack": 3,
            "defense": 2,
            "arrows": [0, 0, 0, 1, 0, 0, 0, 1]
        },
        {
            "id": "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6",
            "name": "PHP",
            "image": "url",
            "owner": "tw-123",
            "attack": 1,
            "defense": 0,
            "arrows": [0, 0, 1, 0, 0, 0, 0, 0]
        }
    ],
    "primaryDeck": [
        {
            "id": "68526f18-2bd3-4e2a-ba1f-03e89a392bf8",
            "name": "Ruby on Rails",
            "image": "url",
            "attack": 1,
            "defense": 2,
            "arrows": [1, 0, 0, 0, 1, 1, 0, 0]
        },
        {
            "id": "e135a246-fb51-43bc-a6da-eb228984dba2",
            "name": "Ruby on Rails",
            "image": "url",
            "attack": 1,
            "defense": 2,
            "arrows": [1, 0, 0, 0, 1, 1, 0, 0]
        },
        {
            "id": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
            "name": "Heroku",
            "image": "url",
            "attack": 3,
            "defense": 0,
            "arrows": [0, 0, 1, 0, 0, 1, 0, 0]
        }
    ],
    "opponentPrimaryDeckSize": 3
};

var runTest = () => gameController.init(testState);