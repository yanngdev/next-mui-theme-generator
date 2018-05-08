import React from 'react';
import { List } from 'material-ui';
import merge from 'deepmerge';

import Attributes from './Attributes';

function Sidebar({
  classes,
  theme,
  overwrite,
  handleUpdateOverwrite,
}) {
  const { palette, zIndex } = theme;
  
  return (
    <List>
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
    </List>
  );
}

export default Sidebar;