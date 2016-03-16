import React, { Component, PropTypes } from 'react';

import { TabList } from '.';

class Window extends Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const { tabs, name } = this.props;

    return (
      <div>
        <h2>{name}</h2>
        <TabList tabs={tabs} />
      </div>
    );
  }
}

export default Window;
