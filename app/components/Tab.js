import React, { Component, PropTypes } from 'react';

class Tab extends Component {

  static propTypes = {
    tab: PropTypes.object.isRequired
  };

  render() {
    const { title } = this.props.tab;

    return (
      <div>
        <h4>{title}</h4>
      </div>
    );
  }
}

export default Tab;
