import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './Session.css';

class Session extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    windows: PropTypes.array.isRequired,
    deleteSession: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  handleDelete(e) {
    e.stopPropagation();
    const { deleteSession, id } = this.props;
    deleteSession(id);
  }

  render() {
    const {
      id, name, windows, setActive, isActive,
      connectDragSource, connectDropTarget, isDragging
    } = this.props;
    const classes = classNames(
      styles.session,
      isActive ? styles.active : '',
      isDragging ? styles.opaque : ''
    );

    return connectDragSource(connectDropTarget(
      <div
          onClick={() => setActive(id)}
          className={classes}>
        <div>
          <button
              onClick={this.handleDelete.bind(this)}
              className={styles.close}>
            x
          </button>
        </div>
        <div>
          {name}
        </div>
      </div>
    ));
  }
}

export default Session;
