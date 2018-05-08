import React from 'react';
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

const styles = theme => ({
	colorPickerContainer: {
		justifyContent: 'center',
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

		if (this.isHexColor(oldColor)) {
			newColor = color.hex;
		} else if (this.isRgbaColor(oldColor)) {
			newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
		}

		this.handleUpdateValue(newColor);
	}

	isHexColor = (value) => {
		return value.match(/^#([0-9a-f]{3}){1,2}$/i);
	}

	isRgbaColor = (value) => {
		return value.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/);
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
			if(this.isHexColor(value) || this.isRgbaColor(value)) {
				return (
					<div>
						<ListItem>
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
							<ListItem className={classes.colorPickerContainer}>
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
						<ListItem>
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
							<ListItem>
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
					<ListItem>
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
						<ListItem>
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