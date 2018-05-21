import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Typography,
  Dialog,
  DialogContent, 
  AppBar,
  Toolbar,
  IconButton,
  Grid,
} from '@material-ui/core';
import {
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
} from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import _ from 'lodash';

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
  messageContainer: {
    height: '100%',
  },
});

class GenerateDialog extends React.Component {
  state = {
    copied: false,
  };

  handleExited = () => {
    this.setState({ copied: false });
  }

  handleCopy = () => {
    this.setState(
      { copied: true },
      () => _.delay(() => this.setState({ copied: false }), 2000),
    );
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
            <CopyToClipboard text={content} onCopy={this.handleCopy}>
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
            <IconButton color="inherit" onClick={handleClose} className={classes.rightButton}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {content ? (
            <pre>
              {content}
            </pre>
          ) : (
            <Grid container alignItems="center" justify="center" className={classes.messageContainer}>
              <Grid item>
                <Typography variant="body1" align="center">
                  <SentimentVeryDissatisfiedIcon />
                </Typography>
                <Typography variant="body1" align="center">
                  Nothing to generate.
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GenerateDialog);