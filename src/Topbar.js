import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { FileDownload as FileDownloadIcon } from '@material-ui/icons';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
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
          <Button variant="raised" color="secondary" onClick={() => handleOpenDialog()}>
            Generate
            <FileDownloadIcon className={classes.rightIcon}/>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Topbar);
