import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import Window from './Window';
import { SESSION_TAB, CURRENT_TAB } from '../../constants';

class WindowList extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired,
    deleteWindow: PropTypes.func.isRequired,
    deleteTab: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  render() {
    const {
      windows, deleteWindow, deleteTab,
      connectDropTarget
    } = this.props;

    return connectDropTarget(
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

const tabTarget = {
  drop() {
  }
};

WindowList = DropTarget([ SESSION_TAB, CURRENT_TAB ], tabTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(WindowList);

export default WindowList;
