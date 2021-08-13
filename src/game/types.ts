import { Card } from '../types';

export type PlayerMeta = {
  [playerId: number]: {
    lastUnoCallTurnId: number | undefined;
    hand: Card[];
  };
};

export type MyGameState = {
  drawPile: Card[];
  discardPile: Card[];
  previousTurnId: number;
  isPlayReversed: boolean;
  lastDiscardTurnId: number;
  lastSkipTurnId: number | undefined;
  lastDraw2TurnId: number | undefined;
  lastDraw4TurnId: number | undefined;
  playerMeta: PlayerMeta;
};
