import React, { Component, PropTypes } from 'react';

import 'normalize.css';
import styles from './App.css';
import {
  SessionPanel,
  CurrentPanel
} from '.';
import {
  Header,
  SideBar
} from '../components';

class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <SideBar />
        <div className={styles.main}>
          <Header />
          <div className={styles.panelContainer}>
            <SessionPanel />
            <CurrentPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
