import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  IconButton,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  newKeyValue: {
    display: 'flex',
    alignItems: 'center',
    '& > :first-child': {
      marginRight: theme.spacing.unit / 2,
    },
    '& > :last-child': {
      marginLeft: theme.spacing.unit / 2,
    },
  },
});

class AddAttribute extends React.Component {
  static defaultProps = {
    variant: 'key',
  };

  state = {
    newKey: null,
    newValue: null,
  };

  handleUpdateNewKey = calcValue => (e) => {
		this.setState({ newKey: calcValue(e) });
  }

  handleUpdateNewValue = calcValue => (e) => {
		this.setState({ newValue: calcValue(e) });
  }

  handleValidate = () => {
    const { variant } = this.props;

    return variant === 'keyValue' ? this.newValue() : this.newKey();
  }
  
  newKey = () => {
		const { path, handleAddOverwrite } = this.props;
    const { newKey } = this.state;
    		
    handleAddOverwrite(path, newKey);
    this.setState({
      newKey: null,
    });
  }

  newValue = () => {
		const { path, handleAddOverwrite } = this.props;
    const { newKey, newValue } = this.state;
    		
    handleAddOverwrite(path, newKey, newValue);
    this.setState({
      newKey: null,
      newValue: null,
    });
	}

  render () {
    const { classes, variant } = this.props;
    const { newKey, newValue } = this.state;

    return (
      <ListItem component="div" divider>
        <ListItemText disableTypography className={classes.newKeyValue}>
          <TextField
            label="Key"
            fullWidth
            onChange={this.handleUpdateNewKey(e => e.target.value)}
            InputLabelProps={{ shrink: true }}
            value={newKey || ''}
          />
          {variant === 'keyValue' &&
            <TextField
              label="Value"
              fullWidth
              onChange={this.handleUpdateNewValue(e => e.target.value)}
              InputLabelProps={{ shrink: true }}
              value={newValue || ''}
            />
          }
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleValidate}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(AddAttribute);
