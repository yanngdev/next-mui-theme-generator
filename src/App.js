import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { CssBaseline } from 'material-ui';
import set from 'set-value';
import unset from 'unset-value';
import merge from 'deepmerge';
import stringifyObject from 'stringify-object';

import Layout from './Layout';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Content from './Content';
import GenerateDialog from './GenerateDialog';
import { cleanObject } from './utils';

const defaultTheme = createMuiTheme();

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

  updateTheme = (overwrite) => {
    try {
      this.setState({
        theme: createMuiTheme(merge(defaultTheme, overwrite)),
      });
    } catch (e) {
      console.log('Error updating theme: ', e);
    }
  }

  handleUpdateOverwrite = (path, newValue = null) => {
    if (newValue === undefined) {
      return;
    }

    const overwrite = { ...this.state.overwrite };

    console.log('Updating value', path, ':', newValue);
  
    if (newValue !== null) {
      set(overwrite, path, newValue);
    } else {
      unset(overwrite, path);
    }

    console.log(overwrite);
    
    this.setState({ overwrite });
    this.updateTheme(overwrite);
  }

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  }

  render() {
    const { theme, overwrite, openDialog } = this.state;

    const topbar = <Topbar
      handleOpenDialog={this.handleOpenDialog}
    />;

    const sidebar = <Sidebar
      theme={theme}
      overwrite={overwrite}
      handleUpdateOverwrite={this.handleUpdateOverwrite}
    />;

    const generatedThemeObject = cleanObject(overwrite);
    const generatedTheme = Object.keys(generatedThemeObject).length > 0 ? stringifyObject(generatedThemeObject, {
      indent: '  ',
      singleQuotes: false
    }) : null;
    
    if (generatedThemeObject)Object;

    return (
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Layout topbar={topbar} sidebar={sidebar}>
            <Content />
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

export default App;
