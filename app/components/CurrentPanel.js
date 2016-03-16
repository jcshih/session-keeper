import React, { Component, PropTypes } from 'react';

import styles from './Panel.css';

class CurrentPanel extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.refresh();
  }

  windowsList(windows) {
    return windows.map(win => (
      <div key={win.id}>
        {this.tabsList(win.tabs)}
      </div>
    ));
  }

  tabsList(tabs) {
    return tabs.map(tab => (
      <div key={tab.id}>
        {tab.title}
      </div>
    ));
  }

  render() {
    const { windows, refresh } = this.props;

    return (
      <div className={styles.panel}>
        <button onClick={refresh}>refresh</button>
        {this.windowsList(windows)}
      </div>
    );
  }
}

export default CurrentPanel;
