import { immerable } from "immer"
import type { Ctx, Game, Move } from "boardgame.io";
import { DIMS } from "../constants";

export interface AmazonsGameState {
  cells: number[]
}

const move: Move<AmazonsGameState> = (game, ctx, id) => {
  game.cells[id] = Number(ctx.currentPlayer)
};

export const Amazons: Game<AmazonsGameState> = {
  setup: (ctx: Ctx, setupData) => {
    return {
      cells: Array(DIMS ** 3).fill(null)
    }
  }
};

// const P1: number = 1;
// const P2: number = 2;

// export enum CellState {
//   EMPTY = 0,
//   PLAYER_1_SHIP,
//   PLAYER_1_TERRITORY,
//   PLAYER_2_SHIP,
//   PLAYER_2_TERRITORY
// }

// export class Game {
//   [immerable] = true

//   dims: number;
//   turn: number = 0;
//   board: { state: CellState, coords: { x: number, y: number, z: number }}[];

//   constructor(dims: number) {
//     this.dims = dims;
//     // The board is a cube of volume dims³
//     // See: https://stackoverflow.com/questions/36781222/update-3d-matrix-with-coordinates-in-javascript
//     this.board =
//       [...Array(this.dims ** 3).keys()].map((n: number, idx: number) => {
//         const x = n % this.dims
//         const y = ((idx - x) / this.dims) % this.dims
//         const z = ((((idx - x) / this.dims) - y) / this.dims);
//         return { state: CellState.EMPTY, coords: { x, y, z } }
//       })
//   }

//   public gameIsOver(): boolean {
//     return false
//   }
// }
