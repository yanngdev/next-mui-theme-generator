import React from 'react';
import classNames from 'classnames'
import {
	TextField,
	ListItem,
	ListItemText,
	Collapse,
	Avatar,
	IconButton,
} from 'material-ui';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Clear as ClearIcon,
	Check as CheckIcon,
} from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';
import { ChromePicker } from 'react-color';

import { isHexColor, isRgbaColor } from './utils';

const styles = theme => ({
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
		}

		this.handleUpdateValue(newColor);
	}

	render() {
		const {
			classes,
			theme,
			key_,
			value,
			overwriteValue,
		} = this.props;
		const { openEditor, newValue } = this.state;

		const type = typeof value;
	
		if (type === 'string') {
			if(isHexColor(value) || isRgbaColor(value)) {
				return (
					<div>
						<ListItem className={classes.attributeLabel}>
							<Avatar style={{ backgroundColor: value }} onClick={this.handleOpenEditor} />
							<ListItemText primary={key_} secondary={value} />
							{overwriteValue && (
								<IconButton onClick={this.handleDelete}>
									<DeleteIcon />
								</IconButton>
							)}
							<IconButton onClick={this.handleOpenEditor}>
								{openEditor ? <ClearIcon /> : <EditIcon />}
							</IconButton>
						</ListItem>
						<Collapse in={openEditor} timeout="auto" unmountOnExit>
							<ListItem className={classNames(classes.attributeEditor, classes.colorPickerContainer)}>
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
						<ListItem className={classes.attributeLabel}>
							<ListItemText primary={key_} secondary={value} />
							{overwriteValue && (
								<IconButton onClick={this.handleDelete}>
									<DeleteIcon />
								</IconButton>
							)}
							<IconButton onClick={this.handleOpenEditor}>
								{openEditor ? <ClearIcon /> : <EditIcon />}
							</IconButton>
						</ListItem>
						<Collapse in={openEditor} timeout="auto" unmountOnExit>
							<ListItem className={classes.attributeEditor}>
								<TextField
									label={key_}
									defaultValue={value}
									fullWidth
									onChange={e => this.handleUpdateNewValue(e.target.value)}
								/>
								<IconButton onClick={() => this.handleUpdateValue(newValue)}>
									<CheckIcon />
								</IconButton>
							</ListItem>
						</Collapse>
					</div>
				);
			}
		}
		if (type === 'number') {
			return (
				<div>
					<ListItem className={classes.attributeLabel}>
						<ListItemText primary={key_} secondary={value} />
						{overwriteValue && (
							<IconButton onClick={this.handleDelete}>
								<DeleteIcon />
							</IconButton>
						)}
						<IconButton onClick={this.handleOpenEditor}>
							{openEditor ? <ClearIcon /> : <EditIcon />}
						</IconButton>
					</ListItem>
					<Collapse in={openEditor} timeout="auto" unmountOnExit>
						<ListItem className={classes.attributeEditor}>
							<TextField
								label={key_}
								defaultValue={value}
								type="number"
								fullWidth
								onChange={e => this.handleUpdateNewValue(parseInt(e.target.value, 10))}
							/>
							<IconButton onClick={() => this.handleUpdateValue(newValue)}>
								<CheckIcon />
							</IconButton>
						</ListItem>
					</Collapse>
				</div>
			);
		}
		return null;
	}
}

export default withStyles(styles)(Attribute);