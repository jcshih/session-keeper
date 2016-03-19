import React, { Component, PropTypes } from 'react';

import Window from './Window';

class WindowList extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired,
    deleteWindow: PropTypes.func.isRequired,
    deleteTab: PropTypes.func.isRequired
  };

  render() {
    const { windows, deleteWindow, deleteTab } = this.props;

    return (
      <div>
        {windows.map((window, i) =>
          <Window
              name={`Window ${i}`}
              tabs={window.tabs}
              deleteWindow={deleteWindow}
              deleteTab={deleteTab}
              id={window.id}
              key={window.id} />
         )}
      </div>
    );
  }
}

export default WindowList;
