import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  Typography,
  Dialog,
  DialogContent, 
  AppBar,
  Toolbar,
  IconButton,
} from 'material-ui';
import {
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
  },
});

class GenerateDialog extends React.Component {
  state = {
    copied: false,
  };

  handleExited = () => {
    this.setState({ copied: false });
  }

  render() {
    const { classes, open, handleCopy, handleClose, content } = this.props;
    const { copied } = this.state;
    
    return (
      <Dialog
        maxWidth="sm"
        open={open}
        fullScreen
        onExited={this.handleExited}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Theme Object
            </Typography>
            <CopyToClipboard text={content} onCopy={() => this.setState({ copied: true })}>
              {copied ? (
                <Button disabled variant="raised">
                  Copied !
                  <CheckIcon className={classes.rightIcon} />
                </Button>
              ) : (
                <Button onClick={handleCopy} variant="raised" color="secondary">
                  Copy
                  <ContentCopyIcon className={classes.rightIcon} />
                </Button>
              )}
            </CopyToClipboard>
            <IconButton color="inherit" onClick={() => handleClose()} className={classes.rightButton}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <pre>
            {content}
          </pre>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GenerateDialog);