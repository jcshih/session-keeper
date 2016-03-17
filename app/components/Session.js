import React, { Component, PropTypes } from 'react';

import styles from './Session.css';

class Session extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    windows: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { id, name, windows, setActive, isActive } = this.props;

    return (
      <div
          onClick={() => setActive(id)}
          className={isActive ? styles.active : ''}>
        {name}
      </div>
    );
  }
}

export default Session;
