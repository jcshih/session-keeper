import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

App = DragDropContext(HTML5Backend)(App);

export default App;
