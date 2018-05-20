import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ButtonAppBar from './Components/ButtonAppBar';
import FlatButtons from './Components/FlatButtons';
import RaisedButtons from './Components/RaisedButtons';
import SimpleBottomNavigation from './Components/SimpleBottomNavigation';
import SimpleCard from './Components/SimpleCard';

const componentsList = [
  ButtonAppBar,
  FlatButtons,
  RaisedButtons,
  SimpleBottomNavigation,
  SimpleCard,
];

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

function Content({ classes }) {
  return (
    <Grid container spacing={8} className={classes.root}>
      {componentsList.map(Component=> (
        <Grid item xs={12} key={`component-${Component.displayName}`}>
          <Component />
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(Content);