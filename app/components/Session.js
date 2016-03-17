import React, { Component, PropTypes } from 'react';

class Session extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    windows: PropTypes.array.isRequired
  };

  render() {
    const { name, windows } = this.props;

    return (
      <div>
        {name}
      </div>
    );
  }
}

export default Session;
