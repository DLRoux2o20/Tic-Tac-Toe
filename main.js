let game = (function () {
	let player1 = createPlayer("X", "Duan");
	let player2 = createPlayer("O", "AI");

	let playersTurn = player1;
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
				Gameboard.checkForWin(row, column);
			}

			playersTurn === player1
				? (playersTurn = player2)
				: (playersTurn = player1);
		},
		checkForWin: function (row, column) {
			if (
				Gameboard.board[row - 1][0] === Gameboard.board[row - 1][1] &&
				Gameboard.board[row - 1][0] === Gameboard.board[row - 1][2]
			) {
				console.log(`${playersTurn.name} Won!`);
				playersTurn.score += 1;
				console.log(`${playersTurn}'s score is ${playersTurn.score}`);
				Gameboard.resetGame();
			}
		},
		resetGame: function () {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					Gameboard.board[i][j] = ".";
				}
			}
			console.log(
				`Board Reset:\n${Gameboard.board[0].join(
					" "
				)}\n${Gameboard.board[1].join(" ")}\n${Gameboard.board[2].join(" ")}\n`
			);
		},
	};

	console.log(
		`${Gameboard.board[0].join(" ")}\n${Gameboard.board[1].join(
			" "
		)}\n${Gameboard.board[2].join(" ")}\n`
	);

	return {
		playRound: Gameboard.playRound,
		checkForWin: Gameboard.checkForWin,
		turnsplayed,
		playersTurn,
	};
})();

game.playRound(1, 1);
game.playRound(2, 1);
game.playRound(1, 2);
game.playRound(2, 2);
game.playRound(1, 3);

function createPlayer(marker, name) {
	const score = 0;
	return { name, score, marker };
}
