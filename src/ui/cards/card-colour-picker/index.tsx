import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';
import { CardColour } from '../../../types';

const getCardCssTextColour = (cardColour: CardColour) => {
  switch (cardColour) {
    case CardColour.RED:
      return "white";
    case CardColour.YELLOW:
      return "black";
    case CardColour.GREEN:
      return "white";
    case CardColour.BLUE:
      return "white";
    case CardColour.NONE:
      return "white";
  }
};

const getCardCssBgColour = (cardColour: CardColour) => {
  switch (cardColour) {
    case CardColour.RED:
      return "#FF5350";
    case CardColour.YELLOW:
      return "#FFAB00";
    case CardColour.GREEN:
      return "#52AB51";
    case CardColour.BLUE:
      return "#544DFF";
    case CardColour.NONE:
      return "#000000";
  }
};

const ColourButton = styled.button<{ colour: CardColour }>`
  color: ${({ colour }) => getCardCssTextColour(colour)};
  background-color: ${({ colour }) => getCardCssBgColour(colour)};
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type Props = {
  isOpen: boolean;
  onColourSelected: (colour: CardColour) => void;
  onCancel: () => void;
};

export const CardColourPicker = ({
  isOpen,
  onColourSelected,
  onCancel,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={onCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Choose a colour:</h2>
            <div id="transition-modal-description">
              {[
                { colour: CardColour.RED, text: "Red" },
                { colour: CardColour.YELLOW, text: "Yellow" },
                { colour: CardColour.GREEN, text: "Green" },
                { colour: CardColour.BLUE, text: "Blue" },
              ].map(({ colour, text }) => (
                <ColourButton
                  colour={colour}
                  onClick={() => onColourSelected(colour)}
                  key={text}
                >
                  {text}
                </ColourButton>
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
