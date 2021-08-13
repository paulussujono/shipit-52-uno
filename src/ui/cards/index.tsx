import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Card, CardColour, CardType } from '../../types';
import { CardView } from './card';
import { CardColourPicker } from './card-colour-picker';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type Props = {
  cards: Card[];
  cardToMatch?: Card;
  isInteractive?: boolean;
  onCardSelected?: (card: Card) => void;
};

export const Cards = ({
  cards,
  cardToMatch,
  isInteractive = false,
  onCardSelected,
}: Props) => {
  const [isCardColourPickerOpen, setIsCardColourPickerOpen] = useState(false);
  const [cardWithPendingColour, setCardWithPendingColour] = useState<
    Card | undefined
  >(undefined);

  const isPlayableCard = (card: Card) => {
    if (cardToMatch) {
      return (
        card.colour === cardToMatch.colour ||
        card.type === cardToMatch.type ||
        card.type === CardType.WILD ||
        card.type === CardType.WILD_PLUS_4
      );
    }
    return true;
  };

  const sortedCards = useMemo(() => [...cards].sort((a, b) => a.id - b.id), [
    cards,
  ]);

  const onCardClicked = (card: Card, isPlayable: boolean) => () => {
    if (isInteractive && isPlayable) {
      if (card.colour === CardColour.NONE) {
        setCardWithPendingColour(card);
        setIsCardColourPickerOpen(true);
      } else {
        onCardSelected(card);
      }
    }
  };

  const onColourSelected = (colour: CardColour | undefined) => {
    if (colour) {
      onCardSelected({
        ...cardWithPendingColour,
        colour,
      });
    }
    setCardWithPendingColour(undefined);
    setIsCardColourPickerOpen(false);
  };

  return (
    <>
      <CardsContainer>
        {sortedCards.map((card, index) => {
          const isPlayable = isPlayableCard(card);
          return (
            <CardView
              key={index}
              card={card}
              isInteractive={isInteractive}
              isPlayable={isPlayable}
              onClick={onCardClicked(card, isPlayable)}
            />
          );
        })}
      </CardsContainer>
      <CardColourPicker
        isOpen={isCardColourPickerOpen}
        onColourSelected={onColourSelected}
        onCancel={() => onColourSelected(undefined)}
      />
    </>
  );
};
