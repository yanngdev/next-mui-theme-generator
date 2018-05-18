import React from 'react';
import classNames from 'classnames'
import {
	TextField,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Collapse,
	Avatar,
	IconButton,
} from '@material-ui/core';
import {
	Delete as DeleteIcon,
	Check as CheckIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';

import { isHexColor, isRgbaColor, isRgbColor, isNumber } from './utils';

const styles = theme => ({
	avatar: {
		border: `1px solid ${theme.palette.divider}`,
	},
	colorPickerContainer: {
		justifyContent: 'center',
	},
	attributeLabel: {
		backgroundColor: theme.palette.grey[100],
	},
	attributeEditor: {
		backgroundColor: theme.palette.grey[200],
	},
});

class Attribute extends React.Component  {
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.value !== prevState.newValue) {
			return { newValue: nextProps.value };
		}
		return null;
	}

	constructor(props) {
		super(props);

		this.state = {
			openEditor: false,
			newValue: props.value,
		};
	}

	handleOpenEditor = () => {
		this.setState({ openEditor: !this.state.openEditor });
	}

	handleUpdateNewValue = (value = null) => {
		this.setState({ newValue: value });
	}

	handleUpdateValue = (value) => {
		const { path, handleUpdateOverwrite } = this.props;
		
		handleUpdateOverwrite(path, value);
	}

	handleDelete = () => {
		this.handleUpdateValue(null);
	}

	handleColorPickerChangeComplete = (color) => {
		const { value : oldColor } = this.props;
		let newColor = null;

		if (isHexColor(oldColor)) {
			newColor = color.hex;
		} else if (isRgbaColor(oldColor)) {
			newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
		} else if (isRgbColor(oldColor)) {
			newColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
		}

		this.handleUpdateValue(newColor);
	}

	render() {
		const {
			classes,
			key_,
			value,
			overwriteValue,
		} = this.props;
		const { openEditor, newValue } = this.state;

		const type = typeof value;
	
		if (type === 'string') {
			if(isHexColor(value) || isRgbaColor(value) || isRgbColor(value)) {
				return (
					<div>
						<ListItem component="div" className={classes.attributeLabel} button onClick={this.handleOpenEditor}>
							<Avatar className={classes.avatar} style={{ backgroundColor: value }} />
							<ListItemText primary={key_} secondary={value} />
							{overwriteValue && (
								<ListItemSecondaryAction>
									<IconButton onClick={this.handleDelete}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<Collapse in={openEditor} timeout="auto" unmountOnExit>
							<ListItem component="div" className={classNames(classes.attributeEditor, classes.colorPickerContainer)}>
								<ChromePicker
									color={value}
									onChangeComplete={color => this.handleColorPickerChangeComplete(color)}
								/>
							</ListItem>
						</Collapse>
					</div>
				);
			} else {
				return (
					<div>
						<ListItem component="div" className={classes.attributeLabel} button onClick={this.handleOpenEditor}>
							<ListItemText primary={key_} secondary={value} />
							{overwriteValue && (
								<ListItemSecondaryAction>
									<IconButton onClick={this.handleDelete}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<Collapse in={openEditor} timeout="auto" unmountOnExit>
							<ListItem component="div" className={classes.attributeEditor}>
								<ListItemText disableTypography>
									<TextField
										label={key_}
										defaultValue={value || ''}
										fullWidth
										onChange={e => this.handleUpdateNewValue(e.target.value)}
									/>
								</ListItemText>
								<ListItemSecondaryAction>
									<IconButton onClick={() => this.handleUpdateValue(newValue)}>
										<CheckIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>
					</div>
				);
			}
		}
		if (type === 'number') {
			return (
				<div>
					<ListItem component="div" className={classes.attributeLabel} button onClick={this.handleOpenEditor}>
						<ListItemText primary={key_} secondary={value} />
						{overwriteValue && (
								<ListItemSecondaryAction>
									<IconButton onClick={this.handleDelete}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
					</ListItem>
					<Collapse in={openEditor} timeout="auto" unmountOnExit>
						<ListItem component="div" className={classes.attributeEditor}>
							<ListItemText disableTypography>
								<TextField
									label={key_}
									defaultValue={value}
									type="number"
									fullWidth
									onChange={e => isNumber(e.target.value) && this.handleUpdateNewValue(parseInt(e.target.value, 10))}
								/>
							</ListItemText>
							<ListItemSecondaryAction>
								<IconButton onClick={() => this.handleUpdateValue(newValue)}>
									<CheckIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</Collapse>
				</div>
			);
		}
		return null;
	}
}

export default withStyles(styles)(Attribute);