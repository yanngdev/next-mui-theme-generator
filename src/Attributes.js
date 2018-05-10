import React from 'react';
import classNames from 'classnames';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
} from 'material-ui';
import {
	ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';

import get from './vendor/get-value';
import Attribute from './Attribute';

const styles = theme => ({
  subAttributesLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  collapse: {
    borderBottom: '1px solid transparent',
  },
  collapseOpen: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

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
    const { classes, theme, label, keys } = this.props;
    const { open } = this.state;

    const CollapseIcon = open ? ExpandLessIcon : ExpandMoreIcon;
    const SubAttributesIcon = open ? ArrowDropUpIcon : ArrowDropDownIcon;

    return (
      <div>
        <ListItem
          component="div" 
          button
          onClick={this.handleToggle} divider={keys.length === 1}
        >
          <ListItemText
            primary={
              <div
                className={classes.subAttributesLabel}
                style={{ paddingLeft: keys.length > 1 ? (keys.length - 2) * (theme.spacing.unit * 2) : 0 }}
              >
                {keys.length > 1 && <SubAttributesIcon />}
                <span>{label}</span>
              </div>
            }
          />
          {keys.length === 1 && <CollapseIcon />}
        </ListItem>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          className={classNames({
            [classes.collapse]: keys.length > 1,
            [classes.collapseOpen]: open })
          }
        >
          <List component="div" dense disablePadding>
            {this.renderSubAttributes()}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme : true })(Attributes);
