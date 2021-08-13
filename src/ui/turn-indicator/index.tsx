import { useBgioClientInfo, useBgioCtx, useBgioG } from 'bgio-contexts';
import styled from 'styled-components';

enum Status {
  Active = "ACTIVE",
  None = "NONE",
}

const activeBgColour = "#c4f5bc";

const TurnIndicatorContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  border-color: #e3e3e3;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
`;

const PlayerDisplay = styled.div<{
  status: Status;
  isMe: boolean;
  isConnected: boolean;
}>`
  padding: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  opacity: ${({ isConnected }) => (isConnected ? 1 : 0.3)};
  background-color: ${({ status }) =>
    status === Status.Active ? activeBgColour : "#f2f2f2"};
  font-weight: ${({ isMe }) => (isMe ? "bold" : "normal")};
`;

export const TurnIndicator = () => {
  const { playerID, matchData } = useBgioClientInfo();
  const { ctx } = useBgioCtx();
  const { G } = useBgioG();

  const activePlayerId = Number(ctx.currentPlayer);

  return matchData && ctx.phase !== "preGame" && G.playerMeta[playerID] ? (
    <TurnIndicatorContainer>
      {matchData.map(
        ({
          id,
          name,
          isConnected,
        }: {
          id: number;
          name: string;
          isConnected: boolean;
        }) => {
          let status = Status.None;
          if (Number(id) === activePlayerId) {
            status = Status.Active;
          }
          return G.playerMeta[id] ? (
            <PlayerDisplay
              key={id}
              status={status}
              isConnected={isConnected}
              isMe={id === Number(playerID)}
            >
              {status === Status.Active && (G.isPlayReversed ? "⬆️ " : "⬇️ ")}
              {`${name} (${G.playerMeta[id].hand.length})`}
            </PlayerDisplay>
          ) : null;
        }
      )}
    </TurnIndicatorContainer>
  ) : null;
};
