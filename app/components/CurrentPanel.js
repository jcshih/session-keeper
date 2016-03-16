import React, { Component, PropTypes } from 'react';

import styles from './Panel.css';
import { WindowList } from '.';

class CurrentPanel extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.refresh();
  }

  render() {
    const { windows, refresh } = this.props;

    return (
      <div className={styles.panel}>
        <button onClick={refresh}>refresh</button>
        <WindowList windows={windows} />
      </div>
    );
  }
}

export default CurrentPanel;
