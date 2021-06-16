import { immerable } from "immer"

export enum CellState {
  EMPTY = 0,
  PLAYER_1_SHIP,
  PLAYER_1_TERRITORY,
  PLAYER_2_SHIP,
  PLAYER_2_TERRITORY
}

interface GameState {
  board: CellState[];
  duration?: number;
  color?: string;
}

export class Game {
  [immerable] = true

  turn: number = 0;
  state: GameState = {
    board: []
  };

  constructor(size: number) {
    // The board is a cube of dimension size³
    this.state.board = [ ...Array<CellState>(size * size * size).fill(CellState.EMPTY) ]
  }
}
