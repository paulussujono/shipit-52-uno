import { useBgioClientInfo, useBgioG } from 'bgio-contexts';
import { Cards } from './cards';
import { Controls } from './controls';
import { TurnIndicator } from './turn-indicator';

const getPlayerNameForId = (matchData, playerID: number | string) => {
  return matchData
    ? matchData.find(({ id }) => id === Number(playerID)).name
    : "XYZ";
};

export const ExampleUI = () => {
  const { playerID, matchData } = useBgioClientInfo();
  const {
    G: {
      discardPile: [topCard],
    },
  } = useBgioG();

  return (
    <div>
      <h1>Let’s Play UNO</h1>
      <TurnIndicator />
      {topCard && <Cards cards={[topCard]} />}
      <Controls />
    </div>
  );
};
