import { Ctx } from 'boardgame.io';
import { shuffle } from 'lodash';
import { Card, CardType } from '../types';
import { generateCardDeck, isNumberCard } from '../util/cards';
import { MyGameState } from './types';

const CARDS_PER_PLAYER = 7;

const deal = (G: MyGameState, ctx: Ctx, playerIDs: number[]) => {
  // TODO this is being called twice 🤷‍♂️, button onClick is only being called once
  G.drawPile = shuffle(generateCardDeck());
  playerIDs.forEach((playerId) => {
    G.playerMeta[playerId] = {
      lastUnoCallTurnId: undefined,
      hand: G.drawPile.splice(0, CARDS_PER_PLAYER),
    };
  });
  const numCardIndex = G.drawPile.findIndex(isNumberCard);
  G.discardPile = G.drawPile.splice(numCardIndex, 1);
};

const draw = (G: MyGameState, ctx: Ctx, amount = 1) => {
  for (let drawIndex = 0; drawIndex < amount; drawIndex++) {
    if (G.drawPile.length === 0) {
      G.drawPile = ctx.random.Shuffle(G.discardPile);
      G.discardPile = [];
    }
    G.playerMeta[ctx.currentPlayer].hand.push(G.drawPile.shift());
  }
};

const acknowledgeSkip = (G: MyGameState, ctx: Ctx) => {
  G.lastSkipTurnId = undefined;
};

const acknowledgeDraw2 = (G: MyGameState, ctx: Ctx) => {
  G.lastDraw2TurnId = undefined;
  draw(G, ctx, 2);
};

const acknowledgeDraw4 = (G: MyGameState, ctx: Ctx) => {
  G.lastDraw4TurnId = undefined;
  draw(G, ctx, 4);
};

const acknowledgeUnoFail = (G: MyGameState, ctx: Ctx) => {
  draw(G, ctx, 2);
};

const callUno = (G: MyGameState, ctx: Ctx) => {
  G.playerMeta[ctx.playerID].lastUnoCallTurnId = ctx.turn;
};

const discard = (G: MyGameState, ctx: Ctx, card: Card) => {
  G.playerMeta[ctx.currentPlayer].hand = G.playerMeta[
    ctx.currentPlayer
  ].hand.filter(({ id }) => id !== card.id);
  G.discardPile.unshift(card);
  switch (card.type) {
    case CardType.REVERSE:
      G.isPlayReversed = !G.isPlayReversed;
      let activePlayers = 0;
      for (let pID in G.playerMeta) {
        if (G.playerMeta[pID].hand.length > 0 || ctx.currentPlayer === pID) {
          activePlayers++;
        }
      }
      if (activePlayers === 2) {
        G.lastSkipTurnId = ctx.turn;
      }
      break;
    case CardType.SKIP:
      G.lastSkipTurnId = ctx.turn;
      break;
    case CardType.PLUS_2:
      G.lastDraw2TurnId = ctx.turn;
      break;
    case CardType.WILD_PLUS_4:
      G.lastDraw4TurnId = ctx.turn;
      break;
  }
  G.lastDiscardTurnId = ctx.turn;
};

export const preGameMoves = {
  deal,
};

export const playMoves = {
  draw,
  acknowledgeSkip,
  acknowledgeDraw2,
  acknowledgeDraw4,
  acknowledgeUnoFail,
  callUno,
  discard,
};

export const observeMoves = {
  callUno,
};
