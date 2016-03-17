import React, { Component, PropTypes } from 'react';

import { Tab } from '.';

class TabList extends Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    windowId: PropTypes.string.isRequired,
    deleteTab: PropTypes.func.isRequired
  };

  render() {
    const { tabs, windowId, deleteTab } = this.props;

    return (
      <div>
        {tabs.map(tab =>
          <Tab
              tab={tab}
              windowId={windowId}
              deleteTab={deleteTab}
              key={tab.id} />
         )}
      </div>
    );
  }
}

export default TabList;
