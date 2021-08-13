export enum CardColour {
	NONE = "NONE",
	RED = "RED",
	YELLOW = "YELLOW",
	GREEN = "GREEN",
	BLUE = "BLUE",
}

export enum CardType {
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	SKIP = "SKIP",
	REVERSE = "REVERSE",
	PLUS_2 = "PLUS_2",
	WILD = "WILD",
	WILD_PLUS_4 = "WILD_PLUS_4",
	REDACTED = "REDACTED",
}

export type Card = {
	id: number;
	type: CardType;
	colour: CardColour;
}

export const PlayColours = [
	CardColour.RED,
	CardColour.YELLOW,
	CardColour.GREEN,
	CardColour.BLUE
];

export const CardsNoColour = [
	CardType.WILD_PLUS_4,
	CardType.WILD_PLUS_4,
	CardType.WILD_PLUS_4,
	CardType.WILD_PLUS_4,
	CardType.WILD,
	CardType.WILD,
	CardType.WILD,
	CardType.WILD,
]

export const CardsPerColour = [
	CardType.PLUS_2,
	CardType.PLUS_2,
	CardType.SKIP,
	CardType.SKIP,
	CardType.REVERSE,
	CardType.REVERSE,
	CardType.ZERO,
	CardType.ONE,
	CardType.ONE,
	CardType.TWO,
	CardType.TWO,
	CardType.THREE,
	CardType.THREE,
	CardType.FOUR,
	CardType.FOUR,
	CardType.FIVE,
	CardType.FIVE,
	CardType.SIX,
	CardType.SIX,
	CardType.SEVEN,
	CardType.SEVEN,
	CardType.EIGHT,
	CardType.EIGHT,
	CardType.NINE,
	CardType.NINE,
]