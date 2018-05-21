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
  IconButton,
  ListSubheader,
} from '@material-ui/core';
import {
  FileDownload as FileDownloadIcon,
  Save as SaveIcon,
  Cached as CachedIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from '@material-ui/icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/fontawesome-free-brands';

import stringifyObject from './vendor/stringify-object';
import { cleanObject } from './utils';
import muiComponents from './muiComponents';
import Layout from './Layout';
import Attributes from './Attributes';
import Content from './Content';
import GenerateDialog from './GenerateDialog';

const defaultTheme = createMuiTheme();

const styles = theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
  },
  listSubHeader: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

class App extends Component {
  state = {
    theme: defaultTheme,
    overwrite: {},
    overwriteString: {},
    openDialog: false,
    saved: false,
    loaded: false,
    reseted: false,
  };

  updateTheme = () => {
    // Generate new theme with overwrite values
    const { overwrite } = this.state;

    try {
      this.setState({ theme: createMuiTheme(overwrite) });
    } catch (e) {
      console.log('Error updating theme: ', e);
    }
  }

  handleUpdateOverwrite = (path, newValue) => {
    // Update value from overwrite object
    if (newValue === undefined) {
      return;
    }

    const overwrite = { ...this.state.overwrite };
    _.set(overwrite, path, newValue);
    this.setState({ overwrite }, this.updateTheme);
  }

  handleRemoveOverwrite = (path) => {
    // Remove value from overwrite object
    const overwrite = { ...this.state.overwrite };
    _.unset(overwrite, path);
    this.setState({ overwrite }, this.updateTheme);
  }

  handleAddOverwrite = (path, newKey, newValue) => {
    // Add new value to overwrite object
    if (newKey  === undefined) {
      return;
    }
  
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

  handleSaveTheme = () => {
    // Save to LocalStorage
    const { overwrite } = this.state;
    localStorage.setItem('theme', JSON.stringify(overwrite));
    this.setState(
      { saved: true },
      () => _.delay(() => this.setState({ saved: false }), 2000)
    );
  }

  handleResetTheme = () => {
    // Reset overwrite object
    this.setState(
      { overwrite: {}, reseted: true },
      () => {
        _.delay(() => this.setState({ reseted: false }), 2000);
        this.updateTheme();
      }
    );
  }

  handleLoadTheme = () => {
    // Load from LocalStorage
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setState(
        { overwrite: JSON.parse(theme), loaded: true },
        () => {
          _.delay(() => this.setState({ loaded: false }), 2000);
          this.updateTheme();
        }
      );
    }
  }

  handleGenerateTheme = () => {
    // Generate overriding theme Object
    const { overwrite } = this.state;

    const generatedThemeObject = cleanObject(overwrite);
    const generatedTheme = Object.keys(generatedThemeObject).length > 0
      ? stringifyObject(generatedThemeObject, { singleQuotes: false })
      : null
    ;

    this.setState(
      { overwriteString: generatedTheme },
      this.handleOpenDialog,
    );
  }

  render() {
    const { classes } = this.props;
    const {
      theme: overrideTheme,
      overwrite, 
      overwriteString,
      openDialog,
      saved,
      loaded,
      reseted,
    } = this.state;

    // Theme and MUI components styles attributes
    const {
      palette,
      shadows,
      transitions,
      typography,
      zIndex,
    } = overrideTheme;
    const baseAttributes = [
      {
        label: 'palette',
        defaultValues: palette,
        overwriteValues: overwrite.palette,
        baseKey: 'palette',
      },
      {
        label: 'shadows',
        defaultValues: shadows,
        overwriteValues: overwrite.shadows,
        baseKey: 'shadows',
      },
      {
        label: 'transitions',
        defaultValues: transitions,
        overwriteValues: overwrite.transitions,
        baseKey: 'transitions',
      },
      {
        label: 'typography',
        defaultValues: typography,
        overwriteValues: overwrite.typography,
        baseKey: 'typography',
      },
      {
        label: 'z-index',
        defaultValues: zIndex,
        overwriteValues: overwrite.zIndex,
        baseKey: 'zIndex',
      },
    ]
    const muiAttributes = muiComponents.map(muiComponent => ({
      label: muiComponent.name,
      defaultValues: muiComponent.withTheme ? muiComponent.styles(overrideTheme) : muiComponent.styles,
      overwriteValues: _.get(overwrite, `overrides.Mui${muiComponent.name}`),
      baseKey: `overrides.Mui${muiComponent.name}`,
    }));
    const attributesLists = [
      { subheader: 'Base Theme', list: baseAttributes },
      { subheader: 'MUI override', list: muiAttributes },
    ];

    return (
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Layout
          topbar={
            <AppBar position="static">
              <Toolbar>
                <div className={classes.flex}>
                  <Typography variant="title" color="inherit">
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
                </div>
                <Button
                  variant="raised"
                  size="small"
                  color="secondary"
                  onClick={this.handleResetTheme}
                  className={classes.rightButton}
                  disabled={reseted}
                >
                  {reseted ? <CheckIcon /> : <DeleteIcon />}
                </Button>
                <Button
                  variant="raised"
                  size="small"
                  color="secondary"
                  onClick={this.handleLoadTheme}
                  className={classes.rightButton}
                  disabled={loaded}
                >
                  {loaded ? <CheckIcon /> : <CachedIcon />}
                </Button>
                <Button
                  variant="raised"
                  size="small"
                  color="secondary"
                  onClick={this.handleSaveTheme}
                  className={classes.rightButton}
                  disabled={saved}
                >
                  {saved ? <CheckIcon /> : <SaveIcon />}
                </Button>
                <Button
                  variant="raised"
                  size="small"
                  color="secondary"
                  onClick={this.handleGenerateTheme}
                  className={classes.rightButton}
                >
                  <FileDownloadIcon />
                </Button>
              </Toolbar>
            </AppBar>
          }
          sidebar={
            <div>
              {attributesLists.map(attributesList => (
                <List
                  component="div"
                  key={`attributes-list-${attributesList.subheader}`}
                  dense
                  disablePadding
                  subheader={
                    <ListSubheader component="div" className={classes.listSubHeader}>
                      {attributesList.subheader}
                    </ListSubheader>
                  }
                >
                  {attributesList.list.map(attributes => (
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
              ))}
            </div>
          }
        >
          <MuiThemeProvider theme={overrideTheme}>
            <Content />
          </MuiThemeProvider>
        </Layout>
        <GenerateDialog
          open={openDialog}
          handleClose={this.handleCloseDialog}
          content={overwriteString}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
