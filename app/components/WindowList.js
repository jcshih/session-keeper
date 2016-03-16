import React, { Component, PropTypes } from 'react';

import { Window } from '.';

class WindowList extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired
  };

  render() {
    const { windows } = this.props;

    return (
      <div>
        {windows.map((window, i) =>
          <Window
              name={`Window ${i}`}
              tabs={window.tabs}
              key={window.id} />
         )}
      </div>
    );
  }
}

export default WindowList;
