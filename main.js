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

	function showBoard() {
		console.log(board.map((row) => row.join(" ")).join("\n"));
	}

	function resetBoard() {
		board.forEach((row, i) => row.forEach((e, j) => (board[i][j] = "")));
		console.log(`Board Reset:\n`);
		showBoard();
		DOMHandling.render("DONE!");
	}

	showBoard();

	return {
		getBoard,
		setCell,
		showBoard,
		resetBoard,
	};
})();

let Game = (function () {
	let player1 = createPlayer("Duan", "X");
	let player2 = createPlayer("AI", "O");
	let playersTurn = player1;
	let playerGoingFirst = player1;
	let turnsPlayed = 0;

	function playRound(row, col, clickedTile) {
		if (turnsPlayed === 9) {
			return;
		}
		if (clickedTile.hasChildNodes()) {
			return;
		}

		Gameboard.setCell(row, col, playersTurn.marker);
		turnsPlayed++;
		Gameboard.showBoard();

		const boardSnapshot = Gameboard.getBoard();
		DOMHandling.render();

		if (turnsPlayed >= 5) {
			if (isWinner(boardSnapshot, row, col, playersTurn.marker)) {
				playersTurn = playerGoingFirst;
				return;
			}
		}

		playersTurn = playersTurn === player1 ? player2 : player1;
	}

	function isWinner(board, row, col, marker) {
		if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
			playerWon();
			return true;
		} else if (
			board[0][col] === board[1][col] &&
			board[0][col] === board[2][col]
		) {
			playerWon();
			return true;
		}

		if (
			board[0][0] === marker &&
			board[1][1] === marker &&
			board[2][2] === marker
		) {
			playerWon();
			return true;
		}
		if (
			board[0][2] === marker &&
			board[1][1] === marker &&
			board[2][0] === marker
		) {
			playerWon();
			return true;
		}

		if (turnsPlayed === 9) {
			console.log("It's a draw!");
			resetGame();
		}
		return false;
	}

	function playerWon() {
		playersTurn.addPoint();
		console.log(`${playersTurn.name} Won!`);
		console.log(`${playersTurn.name}'s score is ${playersTurn.getScore()}`);
		resetGame();
	}

	function resetGame() {
		playerGoingFirst = playerGoingFirst === player1 ? player2 : player1;
		player1.marker = player1.marker === "X" ? "O" : "X";
		player2.marker = player2.marker === "O" ? "X" : "O";
		turnsPlayed = 0;
		Gameboard.resetBoard();
	}

	return {
		playRound,
	};
})(Gameboard);

let DOMHandling = (function () {
	const tiles = document.getElementsByClassName("tile");
	Array.from(tiles).forEach((e) => e.addEventListener("click", addTileMarker));

	function addTileMarker(event) {
		let tile = event.currentTarget;
		Game.playRound(
			tile.dataset.rowIndex,
			tile.dataset.index,
			tile
		);
	}

	function render(message) {
		console.log(message);
		let board = Gameboard.getBoard();

		board.reduce(function(total, currentItem) {
			let row = document.querySelectorAll(`[data-row-index='${total}']`);

			Array.from(row).reduce(function(subTotal, subCurrentItem) {
				if (board[total][subTotal] !== "" && !subCurrentItem.hasChildNodes()) {
					let icon = document.createElement("i");
					icon.classList.add("fa-solid", `fa-${board[total][subTotal].toLowerCase()}`);
					subCurrentItem.appendChild(icon);
				} else if (board[total][subTotal] === "" && subCurrentItem.hasChildNodes()) {
					subCurrentItem.firstElementChild.remove();
				}
				return subTotal + 1;
			}, 0);
			return total + 1;
		}, 0);
	}

	return { // TEMP
		render,
	}
})(Gameboard, Game);
