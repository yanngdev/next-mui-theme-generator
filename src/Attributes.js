import React from 'react';
import classNames from 'classnames';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
} from '@material-ui/core';
import {
	ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Attribute from './Attribute';
import AddAttribute from './AddAttribute';

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
  addAttribute: {
    backgroundColor: theme.palette.grey[200],
  },
});

class Attributes extends React.Component {  
  state = {
    open: false,
  }

  generatePath = (key) => {
    const { keys } = this.props;

    if (key) { 
      return [...keys, key].join('.');
    }
    return keys.join('.');
  }

	handleToggle = () => {
		this.setState({ open: !this.state.open });
  };

  handleDelete = () => {
    const { handleUpdateOverwrite } = this.props;

		handleUpdateOverwrite(this.generatePath(), null);
	}

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
      
      const path = this.generatePath(key);
      const overwriteValue = _.get(overwrite, path);

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
    const {
      classes,
      theme,
      label,
      keys,
      handleAddOverwrite,
      overwrite,
    } = this.props;
    const { open } = this.state;

    const CollapseIcon = open ? ExpandLessIcon : ExpandMoreIcon;
    const SubAttributesIcon = open ? ArrowDropUpIcon : ArrowDropDownIcon;
    const overwriteValue = _.get(overwrite, this.generatePath());
    const addAttributesVariants = ['key', 'keyValue'];

    return (
      <div>
        <ListItem
          component="div"
          button
          onClick={this.handleToggle}
          divider={keys.length === 1}
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
          {(keys.length > 1 && overwriteValue) && (
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
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
          {keys.length > 0 && (
            <List component="div" disablePadding>
              {addAttributesVariants.map(variant =>
                <AddAttribute
                  key={`variant-${variant}`}
                  variant={variant}
                  path={this.generatePath()}
                  handleAddOverwrite={handleAddOverwrite}
                  className={classes.addAttribute}
                />
              )}
            </List>
          )}
          <List component="div" disablePadding>
            {this.renderSubAttributes()}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme : true })(Attributes);
