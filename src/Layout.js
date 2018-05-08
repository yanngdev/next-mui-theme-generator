import React from 'react';
import { Grid } from 'material-ui';

function Layout({ children, classes, topbar, sidebar }) {
  return (
    <div>
      {topbar}
      <Grid container>
        <Grid item sm={4}>
          {sidebar}
        </Grid>
        <Grid item sm={8}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;