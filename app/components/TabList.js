import React, { Component, PropTypes } from 'react';

import { Tab } from '.';

class TabList extends Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired
  };

  render() {
    const { tabs } = this.props;

    return (
      <div>
        {tabs.map(tab =>
          <Tab
              tab={tab}
              key={tab.id} />
         )}
      </div>
    );
  }
}

export default TabList;
