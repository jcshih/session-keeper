import React, { Component, PropTypes } from 'react';

import 'normalize.css';
import styles from './App.css';
import {
  Header,
  SideBar,
  PanelContainer
} from '.';

class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <SideBar />
        <div className={styles.main}>
          <Header />
          <PanelContainer />
        </div>
      </div>
    );
  }
}

export default App;
