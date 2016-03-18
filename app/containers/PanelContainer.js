import React, { Component } from 'react';

import styles from './PanelContainer.css';
import { SessionPanel, CurrentPanel } from '.';

class PanelContainer extends Component {

  render() {
    return (
      <div className={styles.panelContainer}>
        <SessionPanel />
        <CurrentPanel />
      </div>
    );
  }
}

export default PanelContainer;
