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
	
	let updateBoard = (playerCards, opponentCards, tiles, cards) => {
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
		opponentCards.filter(c => c !== null).forEach(c => updateHandCard(c.id, opponentCards, false));
		
		for (var i = 0; i < tiles.length; i++) {
			if (typeof tiles[i] === "string") {
				updateBoardCard(tiles[i], i);
			}
		}
	};
	
	let setCardOwner = (id, owner, transition) => {
		let card = document.querySelector(`[id='${id}'`);
		
		if (transition) {
			card.style.transitionDuration = "0.5s";
		}
		
		card.classList.remove("card-opponent");
		card.classList.remove("card-player");
		card.classList.add(`card-${owner}`);
		setTimeout(() => card.style.transitionDuration = "", 500);
	};
	
	let animateFight = (id, cardPosition, opposingCardPosition) => {
		let directions = [["topLeft", "top", "topRight",],
						  ["left", null, "right",],
						  ["bottomLeft", "bottom", "bottomRight"]];
		let card = document.querySelector(`[id='${id}'`);
		
		let direction = directions[1 + Math.floor(opposingCardPosition/4) - Math.floor(cardPosition/boardSize)][Math.abs((cardPosition%boardSize) - (opposingCardPosition%boardSize) - 1)];
		
		card.classList.add(`animate-attack-${direction}`);
		setTimeout(() => card.classList.remove(`animate-attack-${direction}`), 1000);
	};
	
	let createElement = (type, classes = []) => {
		let el = document.createElement(type);
		classes.forEach(c => el.classList.add(c));
		return el;
	};
	
	let createCard = card => {
		let el = createElement("div", ["card", card.isPlayerOwned ? "card-player" : "card-opponent"]);
		el.id = card.id;
		if (card.image) {
			el.style.backgroundImage = `url(${card.image})`;
		}
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
		state.cards.forEach(card => cards.appendChild(createCard(card)));
		state.primaryDeck.forEach(card => cards.appendChild(createCard(card)));
		state.opponentPrimaryDeck.forEach(card => cards.appendChild(createCard(card)));
		
		updateBoard(state.primaryDeck, state.opponentPrimaryDeck, state.board, state.cards);
	};
	
	return { init, updateBoard, updateBoardCard, setCardOwner, animateFight };
}

var gameController = function () {
	let renderer = renderController();
	let state = null;
	
	let runActionSequence = sequence => {
		let action = sequence[0];
		let actionTime = 500;
		switch (action.type) {
			case "cardPlaced":
				renderer.updateBoardCard(action.cardId, action.cardPosition, true);
				break;
			case "battle":
				renderer.animateFight(action.cardId, action.cardPosition, action.opposingCardPosition);
				renderer.animateFight(action.opposingCardId, action.opposingCardPosition, action.cardPosition);
				actionTime = 1500;
				break;
			case "takeOver":
				renderer.setCardOwner(action.cardId, action.isPlayerOwned ? "player" : "opponent", true);
			default:
				break;
		}
		if (sequence.length > 1) {
			setTimeout(() => runActionSequence(sequence.slice(1)), actionTime);			
		}
	};
	
	let init = initialState => {
		state = initialState;
		renderer.init("game", initialState);
		window.addEventListener("resize", () => renderer.updateBoard(state.primaryDeck, state.opponentPrimaryDeck, state.board, state.cards));
	};
	
	let updateState = newState => {
		state = newState;
		runActionSequence(newState.actions);
	};
	
	return { init, updateState };
}();

// TEST DATA AND INIT

var testState = {
    "players": [
        {
            "name": "Arild Tvergrov",
            "avatar": "http://url",
			"score": 4
        },
        {
            "name": "John Doe",
            "avatar": "http://url",
			"score": 2
        }
    ],
    "board": [
        0, 0, 0, 0,
        1, "3cf8cc21-0bdc-48c0-9674-019232cb3c2b", 0, "88679725-8b41-4e2f-9e94-063dfc41586b",
        1, 1, "2a5f316e-b55f-4c3d-866b-2c27737b5cd5", 0,
        0, 0, 0, "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6"
    ],
    "isPlayerTurn": false,
    "actions": [
        {
            "isPlayerOwned": true,
            "type": "cardPlaced",
            "cardId": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
            "cardPosition": 2
        },
		{
            "type": "battle",
 			"cardId": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
			"cardPosition": 2,
            "opposingCardId": "88679725-8b41-4e2f-9e94-063dfc41586b",
            "opposingCardPosition": 7
        },
        {
        	"type": "takeOver",
            "isPlayerOwned": true,
            "cardId": "88679725-8b41-4e2f-9e94-063dfc41586b"
        },
		{
            "type": "battle",
 			"cardId": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
			"cardPosition": 2,
            "opposingCardId": "3cf8cc21-0bdc-48c0-9674-019232cb3c2b",
            "opposingCardPosition": 5
        },
        {
        	"type": "takeOver",
            "isPlayerOwned": false,
            "cardId": "fd1b4b7a-3278-4796-a620-2932a3edb0fb"
        }
    ],
    "cards": [
        {
            "id": "3cf8cc21-0bdc-48c0-9674-019232cb3c2b",
            "image": "http://xamarin.com/content/images/pages/platform/visual-studio-icon.svg",
            "isPlayerOwned": false
        },
        {
            "id": "88679725-8b41-4e2f-9e94-063dfc41586b",
            "image": "https://www.draw.io/images/onedrive-logo.svg",
            "isPlayerOwned": false
        },
        {
            "id": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
            "image": "https://www.b2b-alive.com/wp-content/uploads/python-logo.svg",
            "isPlayerOwned": true
        },
        {
            "id": "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6",
            "image": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
            "isPlayerOwned": false
        }
    ],
    "primaryDeck": [
        {
            "id": "68526f18-2bd3-4e2a-ba1f-03e89a392bf8",
            "image": "https://upload.wikimedia.org/wikipedia/en/e/e9/Ruby_on_Rails.svg",
            "isPlayerOwned": true
        },
        {
            "id": "e135a246-fb51-43bc-a6da-eb228984dba2",
            "image": "https://upload.wikimedia.org/wikipedia/en/e/e9/Ruby_on_Rails.svg",
            "isPlayerOwned": true
        },
        {
            "id": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
            "image": "http://portfolio.hugoschotman.com/assets/heroku-logo-af398e95119248c4198b38689efabb80.svg",
            "isPlayerOwned": true
        },
    ],
	"opponentPrimaryDeck": [
        {
            "id": "4b5bfbda-4814-427e-86f1-85f7b3acd41e"
        }
    ]
};

var runTest = () => {
	gameController.init(testState);
	gameController.updateState(testState);
};
runTest();