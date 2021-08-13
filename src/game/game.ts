import { Game } from 'boardgame.io';
import { ActivePlayers } from 'boardgame.io/core';
import { observeMoves, playMoves, preGameMoves } from './moves';
import { MyGameState } from './types';

export const MAX_PLAYERS = 10;

export const createInitialState = (): MyGameState => {
  return {
    drawPile: [],
    discardPile: [],
    lastDiscardTurnId: -1,
    previousTurnId: -1,
    isPlayReversed: false,
    lastSkipTurnId: undefined,
    lastDraw2TurnId: undefined,
    lastDraw4TurnId: undefined,
    playerMeta: {},
  };
};

export const unoGame: Game<MyGameState> = {
  name: "Uno",
  setup: createInitialState,
  playerView: (G, ctx, playerID) => {
    // TODO there's bugs with the wrong player data getting stripped
    // to replicate:
    // - start a new 2p game
    // goto P2 view and call uno
    // goto P1 and call uno
    // P1's cards will be seen as redacted

    // const strippedPlayerMeta: PlayerMeta = {};
    // for (let key in G.playerMeta) {
    //   console.log({key, playerID})
    //   if (key === playerID) {
    //     strippedPlayerMeta[key] = G.playerMeta[key];
    //   } else {
    //     strippedPlayerMeta[key] = {
    //       ...G.playerMeta[key],
    //       hand: G.playerMeta[key].hand.map(getRedactedCard),
    //     };
    //   }
    // }
    // return {
    //   ...G,
    //   playerMeta: strippedPlayerMeta,
    // };
    return G;
  },
  phases: {
    preGame: {
      start: true,
      next: "game",
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      moves: preGameMoves,
    },
    game: {
      next: "postGame",
      turn: {
        order: {
          first: (G, ctx) => 0,
          next: (G, ctx) =>
            (G.isPlayReversed
              ? ctx.playOrderPos - 1 + ctx.numPlayers
              : ctx.playOrderPos + 1) % ctx.numPlayers,
        },
        stages: {
          play: {
            moves: playMoves,
          },
          observe: {
            moves: observeMoves,
          },
        },
        onBegin: (G, ctx) => {
          if (
            !Object.keys(G.playerMeta).includes(ctx.currentPlayer) ||
            G.playerMeta[ctx.currentPlayer].hand.length === 0
          ) {
            ctx.events.pass();
            return G;
          } else {
            ctx.events.setActivePlayers({
              currentPlayer: "play",
              others: "observe",
            });
            return G;
          }
        },
        onEnd: (G, ctx) => {
          if (
            Object.keys(G.playerMeta).includes(ctx.currentPlayer) &&
            (G.playerMeta[ctx.currentPlayer].hand.length !== 0 ||
              G.lastDiscardTurnId === ctx.turn)
          ) {
            G.previousTurnId = ctx.turn;
          }
          return G;
        },
        // TODO end if everyone has run out of cards
      },
    },
    postGame: {},
  },
  minPlayers: 2,
  maxPlayers: MAX_PLAYERS,
};
