import React from 'react';
import { Grid } from 'material-ui';

function Layout({ children, classes, topbar, sidebar }) {
  return (
    <div>
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

export default Layout;