import React from 'react';
import { List } from 'material-ui';
import merge from 'deepmerge';
import { styles as ButtonStyles } from 'material-ui/Button/Button';

import Attributes from './Attributes';

function Sidebar({
  classes,
  theme,
  overwrite,
  handleUpdateOverwrite,
}) {
  const { palette, zIndex } = theme;

  console.log(ButtonStyles(theme));
  
  return (
    <List disablePadding>
      <Attributes
        label="Palette"
        values={merge(palette, { ...overwrite.palette })}
        overwrite={overwrite}
        handleUpdateOverwrite={handleUpdateOverwrite}
        keys={['palette']}
      />      
      <Attributes
        label="z-index"
        values={merge(zIndex, { ...overwrite.zIndex })}
        overwrite={overwrite}
        handleUpdateOverwrite={handleUpdateOverwrite}
        keys={['zIndex']}
      />      
      <Attributes
        label="Button"
        values={merge(ButtonStyles(theme), { ...(overwrite.overrides && overwrite.overrides.MuiButton) })}
        overwrite={overwrite}
        handleUpdateOverwrite={handleUpdateOverwrite}
        keys={['overrides.MuiButton']}
      />      
    </List>
  );
}

export default Sidebar;