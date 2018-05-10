import React from 'react';
import merge from 'deepmerge';
import { List } from 'material-ui';

import Attributes from './Attributes';

function Sidebar({
  classes,
  theme,
  overwrite,
  handleUpdateOverwrite,
  attributesList,
}) {
  return (
    <List component="div" disablePadding>
      {attributesList.map(attributes => (
        <Attributes
          key={`attributes-${attributes.label}`}
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