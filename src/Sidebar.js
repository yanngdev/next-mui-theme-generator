import React from 'react';
import merge from 'deepmerge';
import get from 'get-value';
import { List } from 'material-ui';
import { styles as ButtonStyles } from 'material-ui/Button/Button';
import { styles as CardStyles } from 'material-ui/Card/Card';

import Attributes from './Attributes';

function Sidebar({
  classes,
  theme,
  overwrite,
  handleUpdateOverwrite,
}) {
  const { palette, zIndex } = theme;

  const attributesList = [
    {
      label: 'Palette',
      defaultValues: palette,
      overwriteValues: overwrite.palette,
      baseKey: 'palette'
    },
    {
      label: 'z-index',
      defaultValues: zIndex,
      overwriteValues: overwrite.zIndex,
      baseKey: 'zIndex'
    },
    {
      label: 'Button',
      defaultValues: ButtonStyles(theme),
      overwriteValues: get(overwrite, 'overrides.MuiButton'),
      baseKey: 'overrides.MuiButton'
    },
    {
      label: 'Card',
      defaultValues: CardStyles,
      overwriteValues: get(overwrite, 'overrides.MuiCard'),
      baseKey: 'overrides.MuiCard'
    },
  ];
  
  return (
    <List disablePadding>
      {attributesList.map(attributes => (
        <Attributes
          label={attributes.label}
          values={merge(attributes.defaultValues, attributes.overwriteValues ? { ...attributes.overwriteValues } : {})}
          overwrite={overwrite}
          handleUpdateOverwrite={handleUpdateOverwrite}
          keys={[attributes.baseKey]}
        />
      ))}          
    </List>
  );
}

export default Sidebar;