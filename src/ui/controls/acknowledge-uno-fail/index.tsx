import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

const ColourButton = styled.button`
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
  onAcknowledgeUnoFail: () => void;
};

export const AcknowledgeUnoFail = ({
  isOpen,
  onAcknowledgeUnoFail,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={onAcknowledgeUnoFail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">You have been caught not UNO-ing</h2>
            <div id="transition-modal-description">
              <ColourButton
                onClick={onAcknowledgeUnoFail}
              >
                UGHHHHH
              </ColourButton>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
