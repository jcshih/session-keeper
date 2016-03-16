import React, { Component, PropTypes } from 'react';

import { TabList } from '.';

class Window extends Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    deleteWindow: PropTypes.func.isRequired
  };

  render() {
    const { tabs, name, id, deleteWindow } = this.props;

    return (
      <div>
        <h2>
          <button onClick={() => deleteWindow(id)}>x</button>
          {name}
        </h2>
        <TabList tabs={tabs} />
      </div>
    );
  }
}

export default Window;
