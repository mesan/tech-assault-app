var renderController = function ({ tileEventListener, cardEventListener }) {
    const boardSize = 4;
    let game = null;
    let gameContainer = null;
    let board = null;
    let topHand = null;
    let bottomHand = null;

    let getX = x => (board.offsetWidth / boardSize) * x;

    let getY = y => (board.offsetHeight / boardSize) * y + topHand.offsetHeight + 10;

    let updateCardAttributes = (cardElement) => {

        const cardWidth = cardElement.offsetWidth;

        const attrWidth = cardWidth * 0.25;
        const margin = cardWidth * 0.10;
        const fontSize = attrWidth * 0.65;

        const [ attackElement, defenseElement ] = cardElement.childNodes;

        attackElement.style.width = `${attrWidth}px`;
        attackElement.style.height = `${attrWidth}px`;
        attackElement.style.borderRadius = `${attrWidth}px`;
        attackElement.style.bottom = `${margin}px`;
        attackElement.style.left = `${margin}px`;
        attackElement.childNodes[0].style.lineHeight = `${attrWidth}px`;
        attackElement.childNodes[0].style.fontSize = `${fontSize}px`;

        defenseElement.style.width = `${attrWidth}px`;
        defenseElement.style.height = `${attrWidth}px`;
        defenseElement.style.borderRadius = `${attrWidth}px`;
        defenseElement.style.bottom = `${margin}px`;
        defenseElement.style.right = `${margin}px`;
        defenseElement.childNodes[0].style.lineHeight = `${attrWidth}px`;
        defenseElement.childNodes[0].style.fontSize = `${fontSize}px`;
    };

    let updateBoardCard = (id, pos, transition = false) => {
        let element = document.querySelector(`[id='${id}'`);

        if (transition) {
            element.style.transitionDuration = "0.5s";
        }

        const margin = 1;

        element.style.transitionProperty = "left, top, background-color";
        element.style.left = `${getX(pos % boardSize) + margin}px`;
        element.style.top = `${getY(Math.floor(pos / boardSize)) + margin}px`;
        element.style.height = `${board.offsetHeight / boardSize - margin * 2}px`;
        element.style.width = `${board.offsetWidth / boardSize - margin * 2}px`;
        element.style.transitionDuration = "";

        updateCardAttributes(element);
    };

    let updateHandClickableState = (card, isPlayerTurn) => {
        card.classList.remove('card-clickable');

        if (isPlayerTurn) {
            card.classList.add('card-clickable');
        } else {
            card.classList.remove('card-clickable');
        }
    };

    let updateHandCard = (id, hand, isPlayerTurn, isBottomHand = false) => {
        let i = hand.findIndex(c => c && c.id === id);
        let card = document.querySelector(`[id='${id}'`);
        const margin = 10;

        const cardWidth = board.offsetWidth / 5 - (margin * 4 / 5);
        const cardHeight = board.offsetHeight / 5 - (margin * 4 / 5);

        updateHandClickableState(card, isPlayerTurn);

        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardHeight}px`;
        card.style.top = `${isBottomHand ? topHand.offsetHeight + board.offsetHeight + 20 : 0}px`;
        card.style.left = `${(cardWidth) * i + (i * margin)}px`;

        if (isBottomHand) {
            updateCardAttributes(card);
        }
    };

    let updateCardClickableState = (playerCards, isPlayerTurn) => {
        const playerCardElements = document.querySelectorAll('.card-player');

        for (let playerCardElement of playerCardElements) {
            playerCardElement.classList.remove('card-clickable');
        }

        playerCards.forEach(c => {
            const cardElement = document.querySelector(`[id='${c.id}']`);
            updateHandClickableState(cardElement, isPlayerTurn);
        });
    };

    let updateBoard = (playerCards, opponentCards, tiles, isPlayerTurn) => {
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

        gameContainer.style.width = `${bWidth}px`;
        board.style.width = `${bWidth}px`;
        board.style.height = `${bHeight}px`;

        topHand.style.width = `${bWidth}px`;
        topHand.style.height = `${bWidth / 5}px`;
        bottomHand.style.width = `${bWidth}px`;
        bottomHand.style.height = `${bWidth / 5}px`;

        playerCards.forEach(c => updateHandCard(c.id, playerCards, isPlayerTurn, true));
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
        setTimeout(() => card.classList.remove(`animate-attack-${direction}`), 1500);
    };

    let createElement = (type, classes = []) => {
        let el = document.createElement(type);
        classes.forEach(c => el.classList.add(c));
        return el;
    };

    let createCard = (card, isPlayerTurn) => {
        const cardClasses = ["card", "card-battle", card.isPlayerOwned ? "card-player" : "card-opponent"];

        if (isPlayerTurn) {
            cardClasses.push("card-clickable");
        }

        let el = createElement("div", cardClasses);

        el.id = card.id;

        el.addEventListener("click", cardEventListener);

        if (card.image) {
            let arrows = createElement("div", ["arrows"]);

            const attackClasses = [ "attack" ];
            const defenseClasses = [ "defense" ];

            let attack = createElement("div", attackClasses);
            let defense = createElement("div", defenseClasses);
            let attackSpan = createElement("span");
            let defenseSpan = createElement("span");

            attack.appendChild(attackSpan);
            defense.appendChild(defenseSpan);

            attackSpan.textContent = card.attack;
            defenseSpan.textContent = card.defense;

            el.appendChild(attack);
            el.appendChild(defense);
            el.appendChild(arrows);

            el.style.backgroundImage = `url(${card.image}), url(assets/card-background.png)`;
            el.style.backgroundSize = '60%, 100%';

            arrows.classList.add(`arrows-${parseInt(card.arrows.join(""), 2)}`);
        }

        return el;
    };

    let turnCard = card => {
        const cardElement = document.querySelector(`[id='${card.id}']`);
        const cardsList = document.querySelector(`.cards`);
        cardsList.removeChild(cardElement);
        const newCardElement = createCard(card);

        newCardElement.style.transitionDuration = "2s";

        newCardElement.style.left = cardElement.style.left;
        newCardElement.style.top = cardElement.style.top;
        newCardElement.style.height = cardElement.style.height;
        newCardElement.style.width = cardElement.style.width;
        newCardElement.style.transitionDuration = "";

        cardsList.appendChild(newCardElement);
    };

    let addTiles = (container, count) => {
        container.appendChild(createElement("div", ["tile"]));
        if (count > 1) {
            addTiles(container, count - 1);
        }
    };

    let addBoardTiles = (container, tiles) => {
        let classes = tiles[0] === 1 ? ["tile", "tile-hidden"] : ["tile"];

        const tile = createElement("div", classes);

        tile.dataset.position = container.childNodes.length;

        tile.addEventListener("click", tileEventListener);

        container.appendChild(tile);
        if (tiles.length > 1) {
            addBoardTiles(container, tiles.slice(1));
        }
    };

    let init = (containerId, state) => {
        game = document.querySelector(`#${containerId}`);
        game.classList.add("game");
        gameContainer = createElement("div", ["game-container"]);
        game.appendChild(gameContainer);
        topHand = createElement("div", ["hand"]);
        gameContainer.appendChild(topHand);
        addTiles(topHand, 5);
        board = createElement("div", ["board"]);
        gameContainer.appendChild(board);
        addBoardTiles(board, state.board);
        bottomHand = createElement("div", ["hand"]);
        gameContainer.appendChild(bottomHand);
        addTiles(bottomHand, 5);

        let cards = createElement("div", ["cards"]);
        gameContainer.appendChild(cards);
        state.cards.forEach(card => cards.appendChild(createCard(card)));
        state.primaryDeck.forEach(card => cards.appendChild(createCard(card, state.isPlayerTurn)));
        state.opponentPrimaryDeck.forEach(card => cards.appendChild(createCard(card)));

        updateBoard(state.primaryDeck, state.opponentPrimaryDeck, state.board, state.isPlayerTurn);
    };

    return { init, updateBoard, updateBoardCard, setCardOwner, animateFight, turnCard, updateCardClickableState };
}

var gameController = function () {
    let renderer = renderController({ tileEventListener, cardEventListener });
    let state = null;

    let selection = { cardId: undefined, cardPosition: undefined };

    let cardPlacedListener;
    let actionSequenceListener;

    function tileEventListener(event) {
        selection.cardPosition = parseInt(event.target.dataset.position, 10);

        if (typeof selection.cardId !== 'undefined') {
            cardPlacedListener(selection);
        }
    }

    function cardEventListener(event) {
        selection.cardId = event.target.parentNode.id;
    }

    let runActionSequence = sequence => {
        let action = sequence[0];
        let actionTime = 500;
        switch (action.type) {
            case "cardPlaced":
                if (!action.isPlayerOwned) {
                    const cardIndex = state.cards.findIndex(card => card.id == action.cardId);
                    const card = state.cards[cardIndex];
                    renderer.turnCard(card);
                }
                renderer.updateBoardCard(action.cardId, action.cardPosition, true);
                break;
            case "battle":
                renderer.animateFight(action.cardId, action.cardPosition, action.opposingCardPosition);
                renderer.animateFight(action.opposingCardId, action.opposingCardPosition, action.cardPosition);
                actionTime = 1500;
                break;
            case "takeOver":
                renderer.setCardOwner(action.cardId, action.isPlayerOwned ? "player" : "opponent", true);
                break;
            default:
                break;
        }

        if (sequence.length > 1) {
            return setTimeout(() => runActionSequence(sequence.slice(1)), actionTime);
        }

        if (typeof actionSequenceListener === 'function') {
            setTimeout(() => {
                actionSequenceListener();
                actionSequenceListener = undefined;
            }, actionTime);
        }
    };

    let init = initialState => {
        state = initialState;

        state.opponentPrimaryDeck = initialState.opponentPrimaryDeck.map(cardId => {
            return { id: cardId, isPlayerOwned: false }
        });

        renderer.init("game", initialState);
        window.addEventListener("resize", () => {
            renderer.updateBoard(
                state.primaryDeck,
                state.opponentPrimaryDeck,
                state.board,
                state.isPlayerTurn);
        });
    };

    let updateState = (newState) => {
        state = newState;

        state.opponentPrimaryDeck = newState.opponentPrimaryDeck.map(cardId => {
            return { id: cardId, isPlayerOwned: false }
        });

        renderer.updateCardClickableState(newState.primaryDeck, newState.isPlayerTurn);

        setTimeout(() => runActionSequence(newState.actions), 0);
    };

    function onCardPlaced(listener) {
        cardPlacedListener = listener;
    }

    function onActionSequenceCompletedOnce(listener) {
        actionSequenceListener = listener;
    }

    return { init, updateState, onCardPlaced, onActionSequenceCompletedOnce };
}();

export default gameController;

// TEST DATA AND INIT
/*
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
            "image": "assets/python.png",
            "isPlayerOwned": false
        },
        {
            "id": "88679725-8b41-4e2f-9e94-063dfc41586b",
            "image": "assets/java.png",
            "isPlayerOwned": false
        },
        {
            "id": "2a5f316e-b55f-4c3d-866b-2c27737b5cd5",
            "image": "assets/apple.png",
            "isPlayerOwned": true
        },
        {
            "id": "8a4ea8d0-3ddc-4005-adf5-f4a9bdadb7b6",
            "image": "assets/mesan.png",
            "isPlayerOwned": false
        }
    ],
    "primaryDeck": [
        {
            "id": "68526f18-2bd3-4e2a-ba1f-03e89a392bf8",
            "image": "assets/windows.png",
            "isPlayerOwned": true
        },
        {
            "id": "e135a246-fb51-43bc-a6da-eb228984dba2",
            "image": "assets/mesan.png",
            "isPlayerOwned": true
        },
        {
            "id": "fd1b4b7a-3278-4796-a620-2932a3edb0fb",
            "image": "assets/android.png",
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
runTest();*/