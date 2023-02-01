import "./styles.css";
import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io";
import { numOfColumns, numOfRows, playerDiscLookup } from "./constants";
import { emptyCell } from "./constants";
import React from "react";

const game: Game = {
  setup: ({ ctx }) => {
    const grid: { [key: number]: number[] } = {};
    for (let row = 0; row < numOfRows; row++) {
      grid[row] = Array(numOfColumns).fill(emptyCell);
    }
    return { grid };
  },

  moves: {
    playMove: ({ G }, g, column) => {
      console.log(G, column, g);
      const grid = Object.assign({}, g.grid);
      console.log(grid);
      for (let row = numOfRows - 1; numOfRows >= 0; row--) {
        if (grid[row][column] === emptyCell) {
          console.log(true);
          grid[row][column] =
            playerDiscLookup[
              _.ctx.currentPlayer as keyof typeof playerDiscLookup
            ];
          console.log(
            grid[row][column],
            playerDiscLookup[
              _.ctx.currentPlayer as keyof typeof playerDiscLookup
            ]
          );
          break;
        }
      }
      console.log("teehee", grid);
      return { grid };
    }
  },

  turn: {
    minMoves: 1,
    maxMoves: 1
  }

  // endIf: ({ ctx, G }) => {
  //   console.log(ctx, G)
  //   const { currentPlayer } = ctx;
  //   const playerDisc = playerDiscLookup[currentPlayer as keyof typeof playerDiscLookup];
  //   const { grid } = G;

  //   // Victory algorithm by ferdelOlmo: https://stackoverflow.com/a/38211417/129967
  //   let rowIdx = 0;
  //   let columnIdx = 0;

  //   const winnerWinnerChickenDinner = { winner: currentPlayer };

  //   // horizontalCheck
  //   for (columnIdx = 0; columnIdx < numOfColumns-3; columnIdx++) {
  //     for (rowIdx = 0; rowIdx < numOfRows; rowIdx++) {
  //       if (grid[rowIdx][columnIdx] === playerDisc && grid[rowIdx][columnIdx+1] === playerDisc && grid[rowIdx][columnIdx+2] === playerDisc && grid[rowIdx][columnIdx+3] === playerDisc) {
  //         return winnerWinnerChickenDinner;
  //       }
  //     }
  //   }

  //   // verticalCheck
  //   for (rowIdx = 0; rowIdx < numOfRows-3; rowIdx++) {
  //     for (columnIdx = 0; columnIdx < numOfColumns; columnIdx++) {
  //       if (grid[rowIdx][columnIdx] === playerDisc && grid[rowIdx+1][columnIdx] === playerDisc && grid[rowIdx+2][columnIdx] === playerDisc && grid[rowIdx+3][columnIdx] === playerDisc) {
  //         return winnerWinnerChickenDinner;
  //       }
  //     }
  //   }

  //   // ascendingDiagonalCheck
  //   for ( rowIdx = 3; rowIdx < numOfRows; rowIdx++) {
  //     for (columnIdx = 0; columnIdx < numOfColumns-3; columnIdx++) {
  //       if (grid[rowIdx][columnIdx] === playerDisc && grid[rowIdx-1][columnIdx+1] === playerDisc && grid[rowIdx-2][columnIdx+2] === playerDisc && grid[rowIdx-3][columnIdx+3] === playerDisc) {
  //         return winnerWinnerChickenDinner;
  //       }
  //     }
  //   }

  //   // descendingDiagonalCheck
  //   for (rowIdx = 3; rowIdx < numOfRows; rowIdx++) {
  //     for (columnIdx = 3; columnIdx < numOfColumns; columnIdx++) {
  //       if (grid[rowIdx][columnIdx] === playerDisc && grid[rowIdx-1][columnIdx-1] === playerDisc && grid[rowIdx-2][columnIdx-2] === playerDisc && grid[rowIdx-3][columnIdx-3] === playerDisc) {
  //         return winnerWinnerChickenDinner;
  //       }
  //     }
  //   }

  //   return;
  // },
};

const board: React.FC<any> = ({ ctx, G, moves }) => {
  console.log({ G });
  const onClick = (id: number) => moves.playMove(G, id, G);

  let winner;
  if (ctx.gameover) {
    winner =
      ctx.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  const cellStyle = {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center"
  };

  let tbody = [];
  for (let i = 0; i < 6; i++) {
    let grid = [];
    for (let j = 0; j < 7; j++) {
      const id = 3 * i + j;
      grid.push(
        <td key={id}>
          {G.grid[id] ? (
            <div style={cellStyle}></div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(j)} />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{grid}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
};

const connect4 = Client({ board, game });

export default connect4;
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Connect 4</h1>
//     </div>
//   );
// }
