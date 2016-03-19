import React, { Component, PropTypes } from 'react';

class Tab extends Component {

  static propTypes = {
    tab: PropTypes.object.isRequired,
    windowId: PropTypes.string.isRequired,
    deleteTab: PropTypes.func.isRequired,
    showUrl: PropTypes.bool.isRequired
  };

  render() {
    const {
      tab: { id, title, url },
      windowId,
      deleteTab,
      showUrl
    } = this.props;

    return (
      <div>
        <h4>
          <button onClick={() => deleteTab(windowId, id)}>x</button>
          {title}
          {showUrl ? url : null}
        </h4>
      </div>
    );
  }
}

export default Tab;
