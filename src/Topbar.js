import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FileDownload as FileDownloadIcon } from '@material-ui/icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/fontawesome-free-brands';

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

class Topbar extends React.Component {
  render() {
    const { classes, handleOpenDialog } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Next Material UI Theme Generator (beta)
          </Typography>
          <IconButton
            href="https://github.com/yanngdev/next-mui-theme-generator"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <Button
            variant="raised"
            color="secondary"
            onClick={() => handleOpenDialog()}
            className={classes.rightButton}
          >
            Generate
            <FileDownloadIcon className={classes.rightIcon} />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Topbar);
