import { useState } from 'react';
import { YourHand } from 'ui/your-hand';
import { gameMinNumPlayers, localTestingNumPlayers } from '../../constants';
import { Card } from '../../types';
import { AcknowledgeActions } from './acknowledge-actions';
import { PendingAction } from './acknowledge-actions/types';
import {
  useBgioClientInfo,
  useBgioCtx,
  useBgioEvents,
  useBgioG,
  useBgioMoves,
} from "bgio-contexts";

export const Controls = () => {
  const { G } = useBgioG();
  const { playerID, matchData } = useBgioClientInfo();
  const {
    ctx: { turn, isMyTurn, phase },
  } = useBgioCtx();
  const {
    moves: {
      deal,
      draw,
      discard,
      callUno,
      acknowledgeSkip,
      acknowledgeDraw2,
      acknowledgeDraw4,
      acknowledgeUnoFail,
    },
  } = useBgioMoves();
  const {
    events: { endTurn, endPhase },
  } = useBgioEvents();

  const isGameStarted = phase !== "preGame";

  const [shouldAcknowledgeUnoFail, setShouldAcknowledgeUnoFail] = useState(
    false
  );

  const checkUnoFail = (): boolean => {
    debugger;
    const shouldHaveCalledUno =
      G.playerMeta[Number(playerID)].hand.length === 2;
    if (shouldHaveCalledUno) {
      let didSelfCallUno = false;
      let didOpponentCallUno = false;
      for (let key in G.playerMeta) {
        if (G.playerMeta[key].lastUnoCallTurnId === turn) {
          if (key === playerID) {
            didSelfCallUno = true;
          } else {
            didOpponentCallUno = true;
          }
        }
      }
      return didOpponentCallUno && !didSelfCallUno;
    }
    return false;
  };

  const getPendingAction = () => {
    let pendingAction = PendingAction.NONE;
    const previousTurnNumber = G.previousTurnId;
    if (isMyTurn) {
      if (G.lastSkipTurnId === previousTurnNumber) {
        pendingAction = PendingAction.SKIP;
      } else if (G.lastDraw2TurnId === previousTurnNumber) {
        pendingAction = PendingAction.DRAW_2;
      } else if (G.lastDraw4TurnId === previousTurnNumber) {
        pendingAction = PendingAction.DRAW_4;
      } else if (shouldAcknowledgeUnoFail) {
        pendingAction = PendingAction.UNO_FAIL;
      }
    }
    return pendingAction;
  };

  const pendingAction = getPendingAction();

  const activePlayerIds = matchData
    ? matchData.filter(({ isConnected }) => isConnected).map(({ id }) => id)
    : Array.from(Array(localTestingNumPlayers).keys());

  return !isGameStarted ? (
    <>
      {isMyTurn ? (
        <button
          disabled={activePlayerIds.length < gameMinNumPlayers}
          onClick={() => {
            deal(activePlayerIds);
            endPhase();
          }}
        >
          Start game ({activePlayerIds.length})
        </button>
      ) : (
        <p>Waiting for game to start...</p>
      )}
      <h3>Players in game:</h3>
      {matchData &&
        matchData
          .filter(({ isConnected }) => isConnected)
          .map(({ id, name }) => <p key={id}>{name}</p>)}
    </>
  ) : (
    <>
      {isMyTurn ? (
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <button onClick={() => callUno()}>Call UNO</button>
          <button
            disabled={pendingAction !== PendingAction.NONE}
            onClick={() => {
              draw();
              endTurn();
            }}
          >
            Draw
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => callUno()}>Call UNO</button>
        </div>
      )}
      <YourHand
        hasPendingActions={pendingAction !== PendingAction.NONE}
        onCardSelected={(card: Card) => {
          discard(card);
          checkUnoFail() ? setShouldAcknowledgeUnoFail(true) : endTurn();
        }}
      />
      <AcknowledgeActions
        pendingAction={pendingAction}
        onAcknowledgeUnoFail={() => {
          setShouldAcknowledgeUnoFail(false);
          acknowledgeUnoFail();
          endTurn();
        }}
        onAcknowledgeSkip={() => {
          acknowledgeSkip();
          endTurn();
        }}
        onAcknowledgeDraw2={() => {
          acknowledgeDraw2();
          endTurn();
        }}
        onAcknowledgeDraw4={() => {
          acknowledgeDraw4();
          endTurn();
        }}
      />
    </>
  );
};
