import React, { Component, PropTypes } from 'react';

import styles from './Session.css';

class Session extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    windows: PropTypes.array.isRequired,
    deleteSession: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  handleDelete(e) {
    e.stopPropagation();
    const { deleteSession, id } = this.props;
    deleteSession(id);
  }

  render() {
    const {
      id, name, windows, setActive, isActive
    } = this.props;

    return (
      <div
          onClick={() => setActive(id)}
          className={isActive ? styles.active : ''}>
        {name}
        <button onClick={this.handleDelete.bind(this)}>x</button>
      </div>
    );
  }
}

export default Session;
