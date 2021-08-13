import { useBgioClientInfo, useBgioCtx, useBgioG } from 'bgio-contexts';
import styled from 'styled-components';
import { Card } from '../../types';
import { Cards } from '../cards';

const YourHandContainer = styled.div<{ isMyTurn: boolean }>`
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${({ isMyTurn }) => (isMyTurn ? "#c4f5bc" : "lightgrey")};
`;

const Heading = styled.h3`
  margin: 0;
`;

export const YourHand = ({
  hasPendingActions,
  onCardSelected,
}: {
  hasPendingActions: boolean;
  onCardSelected: (card: Card) => void;
}) => {
  const { playerID } = useBgioClientInfo();
  const { G } = useBgioG();
  const { ctx } = useBgioCtx();

  return playerID !== "observer" && G.playerMeta[playerID] ? (
    <div>
      <YourHandContainer isMyTurn={ctx.isMyTurn}>
        <Heading>
          {ctx.isMyTurn ? "👀 It’s your turn" : "🕘 Waiting for opponents"}
        </Heading>
      </YourHandContainer>
      <Cards
        cards={G.playerMeta[playerID].hand}
        cardToMatch={G.discardPile[0]}
        isInteractive={!hasPendingActions && ctx.currentPlayer === playerID}
        onCardSelected={onCardSelected}
      />
    </div>
  ) : null;
};
