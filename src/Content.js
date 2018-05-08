import React from 'react';
import { Grid } from 'material-ui';

import FlatButtons from './Components/FlatButtons';
import RaisedButtons from './Components/RaisedButtons';

function Content() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FlatButtons />
      </Grid>
      <Grid item xs={12}>
        <RaisedButtons />
      </Grid>
    </Grid>
  );
}

export default Content;