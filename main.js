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
			console.log(
				`${Gameboard.board[0].join(" ")}\n${Gameboard.board[1].join(
					" "
				)}\n${Gameboard.board[2].join(" ")}\n`
			);

			if (turnsplayed >= 3) {
				if (Gameboard.checkForWin(row, column) === "win") {
					playersTurn = playerGoingFirst;
					return;
				}
			}

			playersTurn = playersTurn === player1 ? player2 : player1;
		},
		checkForWin: function (row, column) {
			if (
				Gameboard.board[row - 1][0] === Gameboard.board[row - 1][1] &&
				Gameboard.board[row - 1][0] === Gameboard.board[row - 1][2]
			) {
				playersTurn.score += 1;
				playerGoingFirst = playerGoingFirst === player1 ? player2 : player1;
				console.log(`${playersTurn.name} Won!`);
				console.log(`${playersTurn.name}'s score is ${playersTurn.score}`);
				Gameboard.resetGame();
				return "win";
			}
			// ADD NOG CHECKERS
		},
		resetGame: function () {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					Gameboard.board[i][j] = ".";
				}
			}
			player1.marker = player1.marker === "X" ? "O" : "X";
			player2.marker = player2.marker === "O" ? "X" : "O";
			console.log(
				`Board Reset:\n${Gameboard.board[0].join(
					" "
				)}\n${Gameboard.board[1].join(" ")}\n${Gameboard.board[2].join(" ")}\n`
			);
		},
	};

	// Probeer hide binne object, gebruik miskien function, soos logBoardStatus
	console.log(
		`${Gameboard.board[0].join(" ")}\n${Gameboard.board[1].join(
			" "
		)}\n${Gameboard.board[2].join(" ")}\n`
	);

	return {
		playRound: Gameboard.playRound,
		checkForWin: Gameboard.checkForWin,
	};
})();

game.playRound(1, 1);
game.playRound(2, 1);
game.playRound(1, 2);
game.playRound(2, 2);
game.playRound(3, 1);
game.playRound(2, 3);

function createPlayer(marker, name) {
	const score = 0;
	return { name, score, marker };
}
