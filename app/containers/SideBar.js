import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './SideBar.css';
import { SessionList } from '../components';

class SideBar extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired
  };

  render() {
    const { sessions } = this.props;

    return (
      <div className={styles.sideBar}>
        <SessionList sessions={sessions} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.sessions
});

export default connect(mapStateToProps)(SideBar);
