import React from 'react';
import { Grid } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

function Layout({ children, classes, theme, topbar, sidebar }) {
  return (
    <div>
      {topbar}
      <div style={{ padding: 8 }}>
        <Grid container spacing={16}>
          <Grid item sm={4}>
            {sidebar}
          </Grid>
          <Grid item sm={8}>
            <MuiThemeProvider theme={theme}>
              {children}
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Layout;