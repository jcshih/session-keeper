import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { WindowList, ButtonModal } from '../components';

import {
  renameSession,
  deleteWindow,
  deleteTab
} from '../modules/sessions';

class SessionPanel extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    activeSessionId: PropTypes.string
  };

  handleRename(name) {
    this.props.actions.renameSession(name);
  }

  render() {
    const {
      activeSessionId,
      sessions,
      actions: { deleteWindow, deleteTab }
    } = this.props;
    const activeSession = sessions.find(({ id: id }) => id === activeSessionId);

    return activeSession
      ? (
        <div className={styles.panelContainer}>
          <div className={styles.panelHeader}>
            <h2>{activeSession.name}</h2>
            <ButtonModal
                title="rename session"
                buttonText="rename"
                defaultValue={activeSession.name}
                onOk={this.handleRename.bind(this)} />
          </div>
          <div className={styles.panel}>
            <WindowList
                windows={activeSession.windows}
                deleteWindow={deleteWindow}
                deleteTab={deleteTab} />
          </div>
        </div>
      )
      : (
        <div className={styles.panelContainer}></div>
      );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.sessions.list,
  activeSessionId: state.sessions.activeSessionId
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    renameSession,
    deleteWindow,
    deleteTab
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPanel);
