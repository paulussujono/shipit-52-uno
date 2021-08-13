import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PendingAction } from './types';

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
  pendingAction: PendingAction;
  onAcknowledgeUnoFail: () => void;
  onAcknowledgeSkip: () => void;
  onAcknowledgeDraw2: () => void;
  onAcknowledgeDraw4: () => void;
};

export const AcknowledgeActions = ({
  pendingAction,
  onAcknowledgeUnoFail,
  onAcknowledgeSkip,
  onAcknowledgeDraw2,
  onAcknowledgeDraw4,
}: Props) => {
  const classes = useStyles();

  const onAcknowledgeAction = () => {
    switch (pendingAction) {
      case PendingAction.UNO_FAIL:
        return onAcknowledgeUnoFail();
      case PendingAction.SKIP:
        return onAcknowledgeSkip();
      case PendingAction.DRAW_2:
        return onAcknowledgeDraw2();
      case PendingAction.DRAW_4:
        return onAcknowledgeDraw4();
      default:
        return;
    }
  };

  const getTitle = (): string => {
    switch (pendingAction) {
      case PendingAction.UNO_FAIL:
        return "You have been caught not UNO-ing";
      case PendingAction.SKIP:
        return "You have been skipped";
      case PendingAction.DRAW_2:
        return "You have been +2’d";
      case PendingAction.DRAW_4:
        return "You have been +4’d";
      default:
        return "";
    }
  };

  const isOpen = pendingAction !== PendingAction.NONE;

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
            <h2 id="transition-modal-title">{getTitle()}</h2>
            <div id="transition-modal-description">
              <button onClick={onAcknowledgeAction}>UGHHHH</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
