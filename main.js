let game = (function () {
	// Probeer variables hide binne object
	let player1 = createPlayer("X", "Duan");
	let player2 = createPlayer("O", "AI");

	// Probeer variables hide binne object
	let playersTurn = player1;
	let playerGoingFirst = player1;
	let turnsplayed = 0;

	let Gameboard = {
		board: [
			[".", ".", "."],
			[".", ".", "."],
			[".", ".", "."],
		],
		init: function () {
			this.showBoard();
		},
		playRound: function (row, column) {
			if (turnsplayed === 9) {
				return;
			}
			if (Gameboard.board[row - 1][column - 1] !== ".") {
				console.log("Try again");
				return;
			}

			Gameboard.board[row - 1][column - 1] = playersTurn.marker;
			turnsplayed++;
			Gameboard.showBoard();

			if (turnsplayed >= 3) {
				if (Gameboard.checkForWin(row, column) === "win") {
					playersTurn = playerGoingFirst;
					return;
				}
			}

			playersTurn = playersTurn === player1 ? player2 : player1;
		},
		showBoard: function () {
			console.log(
				`${this.board[0].join(" ")}\n${this.board[1].join(
					" "
				)}\n${this.board[2].join(" ")}\n`
			);
		},
		checkForWin: function (row, column) {
			if (
				this.board[row - 1][0] === this.board[row - 1][1] &&
				this.board[row - 1][0] === this.board[row - 1][2]
			) {
				this.playerWon();
				return "win";
			} else if (
				this.board[0][column - 1] === this.board[1][column - 1] &&
				this.board[0][column - 1] === this.board[2][column - 1]
			) {
				this.playerWon();
				return "win";
			} else if (row === 2) {
				if (
					(this.board[0][0] === this.board[1][1] &&
						this.board[0][0] === this.board[2][2]) ||
					(this.board[0][2] === this.board[1][1] &&
						this.board[0][2] === this.board[2][0])
				) {
					this.playerWon();
					return "win";
				}
				return;
			} else if (row === 1) {
				if (
					column !== 2 &&
					((this.board[0][column - 1] === this.board[1][column] &&
						this.board[0][column - 1] === this.board[2][column + 1]) ||
						(this.board[0][column - 1] === this.board[1][column - 2] &&
							this.board[0][column - 1] === this.board[2][column - 3]))
				) {
					this.playerWon();
					return "win";
				}
				return;
			} else if (row === 3) {
				if (
					column !== 2 &&
					((this.board[2][column - 1] === this.board[1][column] &&
						this.board[2][column - 1] === this.board[0][column + 1]) ||
						(this.board[2][column - 1] === this.board[1][column - 2] &&
							this.board[2][column - 1] === this.board[0][column - 3]))
				) {
					this.playerWon();
					return "win";
				}
			}
		},
		playerWon: function () {
			playersTurn.score += 1;
			playerGoingFirst = playerGoingFirst === player1 ? player2 : player1;
			console.log(`${playersTurn.name} Won!`);
			console.log(`${playersTurn.name}'s score is ${playersTurn.score}`);
			this.resetGame();
		},
		resetGame: function () {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					this.board[i][j] = ".";
				}
			}
			player1.marker = player1.marker === "X" ? "O" : "X";
			player2.marker = player2.marker === "O" ? "X" : "O";
			console.log(`Board Reset:\n`);
			this.showBoard();
		},
	};
	Gameboard.init();

	return {
		playRound: Gameboard.playRound,
	};
})();

function createPlayer(marker, name) {
	const score = 0;
	return { name, score, marker };
}
