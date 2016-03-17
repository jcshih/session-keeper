import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './SideBar.css';
import { SessionList } from '../components';
import { setActiveSession, deleteSession } from '../modules/sessions';

class SideBar extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired
  };

  render() {
    const {
      sessions,
      actions: { setActiveSession, deleteSession }
    } = this.props;

    return (
      <div className={styles.sideBar}>
        <SessionList
            sessions={sessions}
            setActive={setActiveSession}
            deleteSession={deleteSession} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.sessions.list
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setActiveSession,
    deleteSession
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
