import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
} from 'material-ui';
import {
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import get from 'get-value';

import Attribute from './Attribute';

class Attributes extends React.Component {
  state = {
		open: false,
  };

	handleToggle = () => {
		this.setState({ open: !this.state.open });
  };

  renderSubAttributes = () => {
    const {
      values,
      keys,
      overwrite,
      handleUpdateOverwrite,
    } = this.props;
  
    return Object.keys(values).map(key => {
      const value = values[key];

      if (typeof value === 'object') {
        return (
          <Attributes
            key={`attributes-${key}`}
            {...this.props}
            values={value}
            label={key}
            keys={[...keys, key]}
          />
        );
      }
      
      const path = [...keys, key].join('.');
      const overwriteValue = get(overwrite, path);

      return (
        <Attribute
          key={`attribute-${key}`}
          key_={key}
          value={value}
          path={path}
          overwriteValue={overwriteValue}
          handleUpdateOverwrite={handleUpdateOverwrite}
        />
      );
    });
  }

  render () {
    const { label } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary={label} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense disablePadding={true}>
            {this.renderSubAttributes()}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default Attributes;
