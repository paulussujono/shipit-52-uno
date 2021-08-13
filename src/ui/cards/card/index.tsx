import styled from 'styled-components';
import { Card, CardColour, CardType } from '../../../types';

const getCardText = (cardType: CardType) => {
  switch (cardType) {
    case CardType.SKIP:
      return 'S';
    case CardType.REVERSE:
      return 'R';
    case CardType.PLUS_2:
      return '+2';
    case CardType.WILD:
      return 'W';
    case CardType.WILD_PLUS_4:
      return 'W+';
    default:
      return cardType;
  }
}

const getCardCssTextColour = (cardColour: CardColour) => {
  switch (cardColour) {
    case CardColour.RED:
      return 'white';
    case CardColour.YELLOW:
      return 'black';
    case CardColour.GREEN:
      return 'white';
    case CardColour.BLUE:
      return 'white';
    case CardColour.NONE:
      return 'white';
  }
};

const getCardCssBgColour = (cardColour: CardColour) => {
  switch (cardColour) {
    case CardColour.RED:
      return '#FF5350';
    case CardColour.YELLOW:
      return '#FFAB00';
    case CardColour.GREEN:
      return '#52AB51';
    case CardColour.BLUE:
      return '#544DFF';
    case CardColour.NONE:
      return '#000000';
  }
};

const CardDiv = styled.div<{
  isInteractive: boolean;
  isPlayable: boolean;
  cardColour: CardColour;
}>`
  border-color: black;
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  margin: 8px;
  width: 104px;
  height: 152px;

  font-size: 48px;

  color: ${({ cardColour }) => getCardCssTextColour(cardColour)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  flex-grow: 0;

	background-color: ${({ cardColour }) => getCardCssBgColour(cardColour)};
	cursor: ${({ isInteractive, isPlayable }) => isInteractive ? isPlayable ? 'pointer' : 'not-allowed' : 'auto'};

	:hover {
		box-shadow: ${({ isInteractive, isPlayable }) => isInteractive && isPlayable ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);' : ''};
	}
`;

type Props = {
  card: Card;
  isInteractive: boolean;
  isPlayable: boolean;
  onClick: () => void;
};

export const CardView = ({
  card,
  isInteractive,
  isPlayable,
  onClick,
}: Props) => {
  return (
    <CardDiv
      cardColour={card.colour}
      isInteractive={isInteractive}
      isPlayable={isPlayable}
      onClick={onClick}
    >
      {getCardText(card.type)}
    </CardDiv>
  );
};
