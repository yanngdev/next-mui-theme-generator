import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
} from 'material-ui';
import { grey } from 'material-ui/colors';
import {
	ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  SubdirectoryArrowRight as SubDirectoryArrowRightIcon,
} from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';
import get from 'get-value';

import Attribute from './Attribute';

const styles = theme => ({
  subAttributesLabel: {
    display: 'flex',
    alignItems: 'flex-end',
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

    return (
      <div>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText
            primary={
              <div className={classes.subAttributesLabel} style={{ paddingLeft: (keys.length - 1) * (theme.spacing.unit * 2) }}>
                {keys.length > 1 && <SubDirectoryArrowRightIcon style={{ color: grey[400] }} />}
                <span>{label}</span>
              </div>
            }
          />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense disablePadding>
            {this.renderSubAttributes()}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme : true })(Attributes);