import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

function Layout({ children, classes, topbar, sidebar }) {
  return (
    <div className={classes.root}>
      {topbar}
      <div style={{ padding: 8 }}>
        <Grid container spacing={16}>
          <Grid item sm={4}>
            {sidebar}
          </Grid>
          <Grid item sm={8}>
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(styles)(Layout);