import React, { Component } from 'react';
import _ from 'lodash';
import merge from 'deepmerge';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  List,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { FileDownload as FileDownloadIcon } from '@material-ui/icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/fontawesome-free-brands';
// Import all MUI styles from all components that can be imported
// import { styles as ComponentStyles } from '@material-ui/core/Component/Component';
import { styles as AppBarStyles } from '@material-ui/core/AppBar/AppBar';
import { styles as AvatarStyles } from '@material-ui/core/Avatar/Avatar';
import { styles as BackdropStyles } from '@material-ui/core/Backdrop/Backdrop';
import { styles as BadgeStyles } from '@material-ui/core/Badge/Badge';
import { styles as BottomNavigationStyles } from '@material-ui/core/BottomNavigation/BottomNavigation';
import { styles as BottomNavigationActionStyles } from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import { styles as ButtonStyles } from '@material-ui/core/Button/Button';
import { styles as ButtonBaseStyles } from '@material-ui/core/ButtonBase/ButtonBase';
import { styles as TouchRippleStyles } from '@material-ui/core/ButtonBase/TouchRipple';
import { styles as CardStyles } from '@material-ui/core/Card/Card';
import { styles as CardActionsStyles } from '@material-ui/core/CardActions/CardActions';
import { styles as CardContentStyles } from '@material-ui/core/CardContent/CardContent';
import { styles as CardHeaderStyles } from '@material-ui/core/CardHeader/CardHeader';
import { styles as CardMediaStyles } from '@material-ui/core/CardMedia/CardMedia';
import { styles as CheckboxStyles } from '@material-ui/core/Checkbox/Checkbox';
import { styles as ChipStyles } from '@material-ui/core/Chip/Chip';
import { styles as CircularProgressStyles } from '@material-ui/core/CircularProgress/CircularProgress';
import { styles as CollapseStyles } from '@material-ui/core/Collapse/Collapse';
import { styles as DialogStyles } from '@material-ui/core/Dialog/Dialog';
import { styles as DialogActionsStyles } from '@material-ui/core/DialogActions/DialogActions';
import { styles as DialogContentStyles } from '@material-ui/core/DialogContent/DialogContent';
import { styles as DialogContentTextStyles } from '@material-ui/core/DialogContentText/DialogContentText';
import { styles as DialogTitleStyles } from '@material-ui/core/DialogTitle/DialogTitle';
import { styles as DividerStyles } from '@material-ui/core/Divider/Divider';
import { styles as DrawerStyles } from '@material-ui/core/Drawer/Drawer';
import { styles as ExpansionPanelStyles } from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import { styles as ExpansionPanelActionsStyles } from '@material-ui/core/ExpansionPanelActions/ExpansionPanelActions';
import { styles as ExpansionPanelDetailsStyles } from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import { styles as ExpansionPanelSummaryStyles } from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import { styles as FadeStyles } from '@material-ui/core/Fade/Fade';
import { styles as FormControlStyles } from '@material-ui/core/FormControl/FormControl';
import { styles as FormControlLabelStyles } from '@material-ui/core/FormControlLabel/FormControlLabel';
import { styles as FormGroupStyles } from '@material-ui/core/FormGroup/FormGroup';
import { styles as FormHelperTextStyles } from '@material-ui/core/FormHelperText/FormHelperText';
import { styles as FormLabelStyles } from '@material-ui/core/FormLabel/FormLabel';
import { styles as GridStyles } from '@material-ui/core/Grid/Grid';
import { styles as GridListStyles } from '@material-ui/core/GridList/GridList';
import { styles as GridListTileStyles } from '@material-ui/core/GridListTile/GridListTile';
import { styles as GridListTileBarStyles } from '@material-ui/core/GridListTileBar/GridListTileBar';
import { styles as IconStyles } from '@material-ui/core/Icon/Icon';
import { styles as IconButtonStyles } from '@material-ui/core/IconButton/IconButton';
import { styles as InputStyles } from '@material-ui/core/Input/Input';
import { styles as TextareaStyles } from '@material-ui/core/Input/Textarea';
import { styles as InputAdornmentStyles } from '@material-ui/core/InputAdornment/InputAdornment';
import { styles as InputLabelStyles } from '@material-ui/core/InputLabel/InputLabel';
import { styles as SwitchBaseStyles } from '@material-ui/core/internal/SwitchBase';
import { styles as LinearProgressStyles } from '@material-ui/core/LinearProgress/LinearProgress';
import { styles as ListStyles } from '@material-ui/core/List/List';
import { styles as ListItemStyles } from '@material-ui/core/ListItem/ListItem';
import { styles as ListItemAvatarStyles } from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import { styles as ListItemIconStyles } from '@material-ui/core/ListItemIcon/ListItemIcon';
import { styles as ListItemSecondaryActionStyles } from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import { styles as ListItemTextStyles } from '@material-ui/core/ListItemText/ListItemText';
import { styles as ListSubheaderStyles } from '@material-ui/core/ListSubheader/ListSubheader';
import { styles as MenuStyles } from '@material-ui/core/Menu/Menu';
import { styles as MenuItemStyles } from '@material-ui/core/MenuItem/MenuItem';
import { styles as MobileStepperStyles } from '@material-ui/core/MobileStepper/MobileStepper';
import { styles as ModalStyles } from '@material-ui/core/Modal/Modal';
import { styles as NativeSelectStyles } from '@material-ui/core/NativeSelect/NativeSelect';
import { styles as PaperStyles } from '@material-ui/core/Paper/Paper';
import { styles as PopoverStyles } from '@material-ui/core/Popover/Popover';
import { styles as RadioStyles } from '@material-ui/core/Radio/Radio';
import { styles as SelectStyles } from '@material-ui/core/Select/Select';
import { styles as SnackbarStyles } from '@material-ui/core/Snackbar/Snackbar';
import { styles as SnackbarContentStyles } from '@material-ui/core/SnackbarContent/SnackbarContent';
import { styles as StepStyles } from '@material-ui/core/Step/Step';
import { styles as StepButtonStyles } from '@material-ui/core/StepButton/StepButton';
import { styles as StepConnectorStyles } from '@material-ui/core/StepConnector/StepConnector';
import { styles as StepContentStyles } from '@material-ui/core/StepContent/StepContent';
import { styles as StepIconStyles } from '@material-ui/core/StepIcon/StepIcon';
import { styles as StepPositionIconStyles } from '@material-ui/core/StepIcon/StepPositionIcon';
import { styles as StepLabelStyles } from '@material-ui/core/StepLabel/StepLabel';
import { styles as StepperStyles } from '@material-ui/core/Stepper/Stepper';
import { styles as SvgIconStyles } from '@material-ui/core/SvgIcon/SvgIcon';
import { styles as SwitchStyles } from '@material-ui/core/Switch/Switch';
import { styles as TabStyles } from '@material-ui/core/Tab/Tab';
import { styles as TableStyles } from '@material-ui/core/Table/Table';
import { styles as TableCellStyles } from '@material-ui/core/TableCell/TableCell';
import { styles as TablePaginationStyles } from '@material-ui/core/TablePagination/TablePagination';
import { styles as TableRowStyles } from '@material-ui/core/TableRow/TableRow';
import { styles as TableSortLabelStyles } from '@material-ui/core/TableSortLabel/TableSortLabel';
import { styles as TabsStyles } from '@material-ui/core/Tabs/Tabs';
import { styles as TabIndicatorStyles } from '@material-ui/core/Tabs/TabIndicator';
import { styles as TabScrollButtonStyles } from '@material-ui/core/Tabs/TabScrollButton';
import { styles as ToolbarStyles } from '@material-ui/core/Toolbar/Toolbar';
import { styles as TooltipStyles } from '@material-ui/core/Tooltip/Tooltip';
import { styles as TypographyStyles } from '@material-ui/core/Typography/Typography';
// We did it!

import stringifyObject from './vendor/stringify-object';
import { cleanObject } from './utils';
import Layout from './Layout';
import Attributes from './Attributes';
import Content from './Content';
import GenerateDialog from './GenerateDialog';

const defaultTheme = createMuiTheme();
const muiComponents = [
  { name: 'AppBar', styles: AppBarStyles, withTheme: true, },
  { name: 'Avatar', styles: AvatarStyles, withTheme: true, },
  { name: 'Backdrop', styles: BackdropStyles, withTheme: false, },
  { name: 'Badge', styles: BadgeStyles, withTheme: true, },
  { name: 'BottomNavigation', styles: BottomNavigationStyles, withTheme: true, },
  { name: 'BottomNavigationAction', styles: BottomNavigationActionStyles, withTheme: true, },
  { name: 'Button', styles: ButtonStyles, withTheme: true, },
  { name: 'ButtonBase', styles: ButtonBaseStyles, withTheme: false, },
  { name: 'TouchRipple', styles: TouchRippleStyles, withTheme: true, },
  { name: 'Card', styles: CardStyles, withTheme: false, },
  { name: 'CardActions', styles: CardActionsStyles, withTheme: true, },
  { name: 'CardContent', styles: CardContentStyles, withTheme: true, },
  { name: 'CardHeader', styles: CardHeaderStyles, withTheme: true, },
  { name: 'CardMedia', styles: CardMediaStyles, withTheme: false, },
  { name: 'Checkbox', styles: CheckboxStyles, withTheme: true, },
  { name: 'Chip', styles: ChipStyles, withTheme: true, },
  { name: 'CircularProgress', styles: CircularProgressStyles, withTheme: true, },
  { name: 'Collapse', styles: CollapseStyles, withTheme: true, },
  { name: 'Dialog', styles: DialogStyles, withTheme: true, },
  { name: 'DialogActions', styles: DialogActionsStyles, withTheme: true, },
  { name: 'DialogContent', styles: DialogContentStyles, withTheme: true, },
  { name: 'DialogContentText', styles: DialogContentTextStyles, withTheme: true, },
  { name: 'DialogTitle', styles: DialogTitleStyles, withTheme: true, },
  { name: 'Divider', styles: DividerStyles, withTheme: true, },
  { name: 'Drawer', styles: DrawerStyles, withTheme: true, },
  { name: 'ExpansionPanel', styles: ExpansionPanelStyles, withTheme: true, },
  { name: 'ExpansionPanelActions', styles: ExpansionPanelActionsStyles, withTheme: true, },
  { name: 'ExpansionPanelDetails', styles: ExpansionPanelDetailsStyles, withTheme: true, },
  { name: 'ExpansionPanelSummary', styles: ExpansionPanelSummaryStyles, withTheme: true, },
  { name: 'Fade', styles: FadeStyles, withTheme: false, },
  { name: 'FormControl', styles: FormControlStyles, withTheme: true, },
  { name: 'FormControlLabel', styles: FormControlLabelStyles, withTheme: true, },
  { name: 'FormGroup', styles: FormGroupStyles, withTheme: false, },
  { name: 'FormHelperText', styles: FormHelperTextStyles, withTheme: true, },
  { name: 'FormLabel', styles: FormLabelStyles, withTheme: true, },
  { name: 'Grid', styles: GridStyles, withTheme: true, },
  { name: 'GridList', styles: GridListStyles, withTheme: false, },
  { name: 'GridListTile', styles: GridListTileStyles, withTheme: false, },
  { name: 'GridListTileBar', styles: GridListTileBarStyles, withTheme: true, },
  { name: 'Icon', styles: IconStyles, withTheme: true, },
  { name: 'IconButton', styles: IconButtonStyles, withTheme: true, },
  { name: 'Input', styles: InputStyles, withTheme: true, },
  { name: 'Textarea', styles: TextareaStyles, withTheme: false, },
  { name: 'InputAdornment', styles: InputAdornmentStyles, withTheme: true, },
  { name: 'InputLabel', styles: InputLabelStyles, withTheme: true, },
  { name: 'SwitchBase', styles: SwitchBaseStyles, withTheme: false, },
  { name: 'LinearProgress', styles: LinearProgressStyles, withTheme: true, },
  { name: 'List', styles: ListStyles, withTheme: true, },
  { name: 'ListItem', styles: ListItemStyles, withTheme: true, },
  { name: 'ListItemAvatar', styles: ListItemAvatarStyles, withTheme: true, },
  { name: 'ListItemIcon', styles: ListItemIconStyles, withTheme: true, },
  { name: 'ListItemSecondaryAction', styles: ListItemSecondaryActionStyles, withTheme: false, },
  { name: 'ListItemText', styles: ListItemTextStyles, withTheme: true, },
  { name: 'ListSubheader', styles: ListSubheaderStyles, withTheme: true, },
  { name: 'Menu', styles: MenuStyles, withTheme: false, },
  { name: 'MenuItem', styles: MenuItemStyles, withTheme: true, },
  { name: 'MobileStepper', styles: MobileStepperStyles, withTheme: true, },
  { name: 'Modal', styles: ModalStyles, withTheme: true, },
  { name: 'NativeSelect', styles: NativeSelectStyles, withTheme: true, },
  { name: 'Paper', styles: PaperStyles, withTheme: true, },
  { name: 'Popover', styles: PopoverStyles, withTheme: false, },
  { name: 'Radio', styles: RadioStyles, withTheme: true, },
  { name: 'Select', styles: SelectStyles, withTheme: true, },
  { name: 'Snackbar', styles: SnackbarStyles, withTheme: true, },
  { name: 'SnackbarContent', styles: SnackbarContentStyles, withTheme: true, },
  { name: 'Step', styles: StepStyles, withTheme: true, },
  { name: 'StepButton', styles: StepButtonStyles, withTheme: true, },
  { name: 'StepConnector', styles: StepConnectorStyles, withTheme: true, },
  { name: 'StepContent', styles: StepContentStyles, withTheme: true, },
  { name: 'StepIcon', styles: StepIconStyles, withTheme: true, },
  { name: 'StepPositionIcon', styles: StepPositionIconStyles, withTheme: true, },
  { name: 'StepLabel', styles: StepLabelStyles, withTheme: true, },
  { name: 'Stepper', styles: StepperStyles, withTheme: true, },
  { name: 'SvgIcon', styles: SvgIconStyles, withTheme: true, },
  { name: 'Switch', styles: SwitchStyles, withTheme: true, },
  { name: 'Tab', styles: TabStyles, withTheme: true, },
  { name: 'Table', styles: TableStyles, withTheme: true, },
  { name: 'TableCell', styles: TableCellStyles, withTheme: true, },
  { name: 'TablePagination', styles: TablePaginationStyles, withTheme: true, },
  { name: 'TableRow', styles: TableRowStyles, withTheme: true, },
  { name: 'TableSortLabel', styles: TableSortLabelStyles, withTheme: true, },
  { name: 'Tabs', styles: TabsStyles, withTheme: true, },
  { name: 'TabIndicator', styles: TabIndicatorStyles, withTheme: true, },
  { name: 'TabScrollButton', styles: TabScrollButtonStyles, withTheme: true, },
  { name: 'Toolbar', styles: ToolbarStyles, withTheme: true, },
  { name: 'Tooltip', styles: TooltipStyles, withTheme: true, },
  { name: 'Typography', styles: TypographyStyles, withTheme: true, },
];

const styles = theme => ({
  flex: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
  },
});

class App extends Component {
  state = {
    theme: defaultTheme,
    overwrite: {},
    openDialog: false,
  };

  constructor(props) {
    super(props);
    console.log(defaultTheme);
  }

  updateTheme = () => {
    const { overwrite } = this.state;

    try {
      this.setState({ theme: createMuiTheme(overwrite) });
    } catch (e) {
      console.log('Error updating theme: ', e);
    }
  }

  handleUpdateOverwrite = (path, newValue = null) => {
    if (newValue === undefined) {
      return;
    }

    console.log('Updating', path, ':', newValue);

    const overwrite = { ...this.state.overwrite };
    if (newValue !== null) {
      _.set(overwrite, path, newValue);
    } else {
      _.unset(overwrite, path);
    }
    this.setState({ overwrite }, this.updateTheme);
  }

  handleRemoveOverwrite = (path) => {
    console.log('Removing', path);

    const overwrite = { ...this.state.overwrite };
    _.unset(overwrite, path);
    this.setState({ overwrite }, this.updateTheme);
  }

  handleAddOverwrite = (path, newKey, newValue) => {
    if (newKey  === undefined) {
      return;
    }

    console.log('Adding', path, newKey, newValue);
  
    const overwrite = { ...this.state.overwrite };
    _.set(overwrite, `${path}.${newKey}`, newValue || Object.create(null));
    this.setState({ overwrite }, this.updateTheme);
  }

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  }

  render() {
    const { classes } = this.props;
    const { theme: overrideTheme, overwrite, openDialog } = this.state;

    const { palette, zIndex } = overrideTheme;
    const attributesList = [
      {
        label: 'Palette',
        defaultValues: palette,
        overwriteValues: overwrite.palette,
        baseKey: 'palette',
      },
      {
        label: 'z-index',
        defaultValues: zIndex,
        overwriteValues: overwrite.zIndex,
        baseKey: 'zIndex',
      },
      ...muiComponents.map(muiComponent => ({
        label: muiComponent.name,
        defaultValues: muiComponent.withTheme ? muiComponent.styles(overrideTheme) : muiComponent.styles,
        overwriteValues: _.get(overwrite, `overrides.Mui${muiComponent.name}`),
        baseKey: `overrides.Mui${muiComponent.name}`,
      })),
    ];
    const generatedThemeObject = cleanObject(overwrite);
    const generatedTheme = Object.keys(generatedThemeObject).length > 0
      ? stringifyObject(generatedThemeObject, { singleQuotes: false })
      : null
    ;

    return (
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={defaultTheme}>
          <Layout
            topbar={
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Next Material UI Theme Generator (beta)
                  </Typography>
                  <IconButton
                    href="https://github.com/yanngdev/next-mui-theme-generator"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </IconButton>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.handleOpenDialog}
                    className={classes.rightButton}
                  >
                    Generate
                    <FileDownloadIcon className={classes.rightIcon} />
                  </Button>
                </Toolbar>
              </AppBar>
            }
            sidebar={
              <List component="div" disablePadding>
                {attributesList.map(attributes => (
                  <Attributes
                    key={`attributes-${attributes.label}`}
                    label={attributes.label}
                    values={merge(attributes.defaultValues, attributes.overwriteValues ? { ...attributes.overwriteValues } : {})}
                    keys={[attributes.baseKey]}
                    overwrite={overwrite}
                    handleUpdateOverwrite={this.handleUpdateOverwrite}
                    handleAddOverwrite={this.handleAddOverwrite}
                    handleRemoveOverwrite={this.handleRemoveOverwrite}
                  />
                ))}          
              </List>
            }
          >
            <MuiThemeProvider theme={overrideTheme}>
              <Content />
            </MuiThemeProvider>
          </Layout>
          <GenerateDialog
            open={openDialog}
            handleClose={this.handleCloseDialog}
            content={generatedTheme}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
