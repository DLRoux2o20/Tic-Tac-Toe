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
			Gameboard.board[row - 1][column - 1] = playersTurn.marker;
			playersTurn === player1
				? (playersTurn = player2)
				: (playersTurn = player1);
			turnsplayed++;
			console.log(
				`${Gameboard.board[0].join(" ")}\n${Gameboard.board[1].join(
					" "
				)}\n${Gameboard.board[2].join(" ")}\n`
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
		turnsplayed,
	};
})();

function createPlayer(marker, name) {
	const score = 0;
	return { name, score, marker };
}
