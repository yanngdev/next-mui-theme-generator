import React from 'react';
import { Grid } from 'material-ui';

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

function Content() {
  return (
    <Grid container spacing={8}>
      {componentsList.map(Component=> (
        <Grid item xs={12} key={`component-${Component.displayName}`}>
          <Component />
        </Grid>
      ))}
    </Grid>
  );
}

export default Content;