import React, { Component, PropTypes } from 'react';
import TabList from './TabList';
import styles from '../Window.css';

class Window extends Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    deleteWindow: PropTypes.func.isRequired,
    deleteTab: PropTypes.func.isRequired
  };

  restoreWindow() {
    chrome.windows.create({
      url: this.props.tabs.map(t => t.url)
    });
  }

  render() {
    const { tabs, name, id, deleteWindow, deleteTab } = this.props;

    return (
      <div>
        <h2>
          <button
              onClick={() => deleteWindow(id)}
              className={styles.close}>
            x
          </button>
          <span
              onClick={this.restoreWindow.bind(this)}
              style={{ cursor: 'pointer' }}>
            {name}
          </span>
        </h2>
        <TabList
            tabs={tabs}
            windowId={id}
            deleteTab={deleteTab} />
      </div>
    );
  }
}

export default Window;
