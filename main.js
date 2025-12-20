// VERWYDER LATER
let game = (function () {
	let Players = {
		player1: createPlayer("X", "Duan"),
		player2: createPlayer("O", "AI"),
		turnsPlayed: 0,
	};

	Players.playersTurn = Players.player1;
	Players.playerGoingFirst = Players.player1;

	// WRAP GAMEBOARD OBJECT IN IIFE (MODULE)
	let Gameboard = {
		board: [
			[".", ".", "."],
			[".", ".", "."],
			[".", ".", "."],
		],
		init: function () {
			this.showBoard();
		},
		// GAME OBJECT
		playRound: function (row, column) {
			if (Players.turnsPlayed === 9) {
				return;
			}
			if (Gameboard.board[row - 1][column - 1] !== ".") {
				console.log("Try again");
				return;
			}

			Gameboard.board[row - 1][column - 1] = Players.playersTurn.marker;
			Players.turnsPlayed++;
			Gameboard.showBoard();

			if (Players.turnsPlayed >= 3) {
				if (Gameboard.checkForWin(row, column) === "win") {
					Players.playersTurn = Players.playerGoingFirst;
					return;
				}
			}

			Players.playersTurn =
				Players.playersTurn === Players.player1
					? Players.player2
					: Players.player1;
		},
		showBoard: function () {
			console.log(
				`${this.board[0].join(" ")}\n${this.board[1].join(
					" "
				)}\n${this.board[2].join(" ")}\n`
			);
		},
		// GAME OBJECT
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

			if (Players.turnsPlayed === 9) {
				console.log("It's a draw!");
				this.resetGame();
			}
		},
		// GAME OBJECT
		playerWon: function () {
			Players.playersTurn.score += 1;
			Players.playerGoingFirst =
				Players.playerGoingFirst === Players.player1
					? Players.player2
					: Players.player1;
			console.log(`${Players.playersTurn.name} Won!`);
			console.log(
				`${Players.playersTurn.name}'s score is ${Players.playersTurn.score}`
			);
			this.resetGame();
		},
		// GAME OBJECT
		resetGame: function () {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					this.board[i][j] = ".";
				}
			}
			Players.player1.marker = Players.player1.marker === "X" ? "O" : "X";
			Players.player2.marker = Players.player2.marker === "O" ? "X" : "O";
			console.log(`Board Reset:\n`);
			this.showBoard();
		},
	};
	Gameboard.init();

	return {
		playRound: Gameboard.playRound,
	};
})();

// SKYF MISKIEN
function createPlayer(marker, name) {
	const score = 0;
	return { name, score, marker };
}
