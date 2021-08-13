import {
  Card,
  CardColour,
  CardsNoColour,
  CardsPerColour,
  CardType,
  PlayColours,
} from "../types";

export const isNumberCard = (card: Card) => {
  return typeof card.type === "number";
};

export const getRedactedCard = (): Card => {
  return {
    id: -1,
    type: CardType.REDACTED,
    colour: CardColour.NONE,
  };
};

export const generateCardDeck = () => {
  let cardId = 0;
  const cardDeck: Card[] = [];

  const generateCards = (colour: CardColour) => (cardType: CardType) => {
    cardDeck.push({
      id: cardId,
      type: cardType,
      colour,
    });
    cardId++;
  };

  CardsNoColour.forEach(generateCards(CardColour.NONE));

  PlayColours.forEach((colour) => {
    CardsPerColour.forEach(generateCards(colour));
  });

  return cardDeck;
};
