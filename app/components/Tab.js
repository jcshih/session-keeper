import React, { Component, PropTypes } from 'react';

class Tab extends Component {

  static propTypes = {
    tab: PropTypes.object.isRequired,
    windowId: PropTypes.number.isRequired,
    deleteTab: PropTypes.func.isRequired
  };

  render() {
    const { tab: { id, title }, windowId, deleteTab } = this.props;

    return (
      <div>
        <h4>
          <button onClick={() => deleteTab(windowId, id)}>x</button>
          {title}
        </h4>
      </div>
    );
  }
}

export default Tab;
