function createPlayer(name, marker) {
	let score = 0;

	function addPoint() {
		score++;
	}

	function getScore() {
		return score;
	}

	return {
		name,
		marker,
		addPoint,
		getScore,
	};
}

let Gameboard = (function () {
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	function getBoard() {
		return board.map((row) => [...row]);
	}

	function setCell(row, col, marker) {
		if (board[row][col] === "") {
			board[row][col] = marker;
			return true;
		}
		console.log("Try again");
		return false;
	}

	function resetBoard() {
		board.forEach((row, i) => row.forEach((e, j) => (board[i][j] = "")));
		Display.renderBoard();
	}

	return {
		getBoard,
		setCell,
		resetBoard,
	};
})();

let Game = (function () {
	let form = document.querySelector("form");
	let formInput = document.getElementById("name");
	let formInputContainer = document.getElementById("form-input-container");
	let mainContent = document.querySelector("section");
	let playerCounter = 0;
	form.addEventListener("submit", setPlayerNames);

	let player1;
	let player2;
	let player1Name;
	let player2Name;

	let playersTurn;
	let playerGoingFirst;
	let turnsPlayed = 0;

	function setPlayerNames(event) {
		event.preventDefault();

		if (playerCounter === 1) {
			player2Name = formInput.value;
			formInput.value = "";

			form.classList.add("hidden");
			mainContent.classList.remove("hidden");

			player1 = createPlayer(player1Name, "X");
			player2 = createPlayer(player2Name, "O");
			playersTurn = player1;
			playerGoingFirst = player1;
			Display.displayNames(player1.name, player2.name);
			return;
		}
		player1Name = formInput.value;
		formInput.value = "";

		formInput.classList.remove("input-blue");
		formInput.classList.add("input-red");
		formInputContainer.classList.remove("background-red");
		formInputContainer.classList.add("background-blue");
		playerCounter = 1;
	}

	function playRound(row, col, clickedTile) {
		if (clickedTile.hasChildNodes()) {
			return;
		}

		Gameboard.setCell(row, col, playersTurn.marker);
		turnsPlayed++;

		const boardSnapshot = Gameboard.getBoard();
		Display.renderBoard();

		if (turnsPlayed >= 5) {
			if (isWinner(boardSnapshot, row, col, playersTurn.marker)) {
				return;
			}
		}

		playersTurn = playersTurn === player1 ? player2 : player1;
	}

	function isWinner(board, row, col, marker) {
		if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
			Display.showEndScreen(playersTurn.name);
			return true;
		} else if (
			board[0][col] === board[1][col] &&
			board[0][col] === board[2][col]
		) {
			Display.showEndScreen(playersTurn.name);
			return true;
		}

		if (
			board[0][0] === marker &&
			board[1][1] === marker &&
			board[2][2] === marker
		) {
			Display.showEndScreen(playersTurn.name);
			return true;
		}
		if (
			board[0][2] === marker &&
			board[1][1] === marker &&
			board[2][0] === marker
		) {
			Display.showEndScreen(playersTurn.name);
			return true;
		}

		if (turnsPlayed === 9) {
			Display.showEndScreen("draw");
		}
		return false;
	}

	function playerWon() {
		playersTurn.addPoint();
		Display.renderScores(player1.getScore(), player2.getScore());
		resetRound();
	}

	function resetRound() {
		playerGoingFirst = playerGoingFirst === player1 ? player2 : player1;
		playersTurn = playerGoingFirst;
		player1.marker = player1.marker === "X" ? "O" : "X";
		player2.marker = player2.marker === "O" ? "X" : "O";
		turnsPlayed = 0;
		Display.displayMarkers(player1.marker, player2.marker);
		Gameboard.resetBoard();
	}

	function resetDraw() {
		Display.changeButtonListener();
		resetRound();
	}

	return {
		playRound,
		playerWon,
		resetDraw,
	};
})(Gameboard);

let Display = (function () {
	const tiles = document.getElementsByClassName("tile");
	Array.from(tiles).forEach((e) => e.addEventListener("click", addTileMarker));

	let nextRoundButton = document.getElementById("next-round-button");
	let restartGameButton = document.getElementById("restart-game-button");

	nextRoundButton.addEventListener("click", hideEndScreen);
	nextRoundButton.addEventListener("click", Game.playerWon);
	restartGameButton.addEventListener("click", () => location.reload());

	let endScreen = document.getElementById("end-screen");
	let winnerText = document.getElementById("winner-text");

	let DOMplayer1Icon = document.getElementById("player1-marker");
	let DOMplayer2Icon = document.getElementById("player2-marker");

	let DOMplayer1Score = document.getElementById("player1-score");
	let DOMplayer2Score = document.getElementById("player2-score");

	function addTileMarker(event) {
		let tile = event.currentTarget;
		Game.playRound(tile.dataset.rowIndex, tile.dataset.index, tile);
	}

	function displayNames(player1Name, player2Name) {
		let DOMplayer1Name = document.getElementById("player1-name");
		let DOMplayer2Name = document.getElementById("player2-name");

		DOMplayer1Name.textContent = player1Name;
		DOMplayer2Name.textContent = player2Name;
	}

	function displayMarkers(player1Marker, player2Marker) {
		DOMplayer1Icon.classList.remove(`fa-${player2Marker.toLowerCase()}`);
		DOMplayer1Icon.classList.add(`fa-${player1Marker.toLowerCase()}`);

		DOMplayer2Icon.classList.remove(`fa-${player1Marker.toLowerCase()}`);
		DOMplayer2Icon.classList.add(`fa-${player2Marker.toLowerCase()}`);
	}

	function renderScores(player1Score, player2Score) {
		DOMplayer1Score.textContent = player1Score;
		DOMplayer2Score.textContent = player2Score;
	}

	function renderBoard() {
		let board = Gameboard.getBoard();

		board.reduce(function (total, currentItem) {
			let row = document.querySelectorAll(`[data-row-index='${total}']`);

			Array.from(row).reduce(function (subTotal, subCurrentItem) {
				if (board[total][subTotal] !== "" && !subCurrentItem.hasChildNodes()) {
					let icon = document.createElement("i");
					icon.classList.add(
						"fa-solid",
						`fa-${board[total][subTotal].toLowerCase()}`
					);
					subCurrentItem.appendChild(icon);
				} else if (
					board[total][subTotal] === "" &&
					subCurrentItem.hasChildNodes()
				) {
					subCurrentItem.firstElementChild.remove();
				}
				return subTotal + 1;
			}, 0);
			return total + 1;
		}, 0);
	}

	function showEndScreen(winnerName) {
		endScreen.classList.remove("hidden");

		if (winnerName === "draw") {
			winnerText.textContent = "It's a draw!";
			nextRoundButton.removeEventListener("click", Game.playerWon);
			nextRoundButton.addEventListener("click", Game.resetDraw);
			return;
		}
		winnerText.textContent = `${winnerName} Won!`;
	}

	function hideEndScreen() {
		endScreen.classList.add("hidden");
	}

	function changeButtonListener() {
		nextRoundButton.removeEventListener("click", Game.resetDraw);
		nextRoundButton.addEventListener("click", Game.playerWon);
	}

	return {
		renderBoard,
		renderScores,
		displayMarkers,
		displayNames,
		showEndScreen,
		changeButtonListener,
	};
})(Gameboard);