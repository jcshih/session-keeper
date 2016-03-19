import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { ButtonModal } from '../components';
import { WindowList } from '../components/ActiveSession';

import {
  renameSession,
  deleteWindow,
  deleteTab
} from '../modules/sessions';

class SessionPanel extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    activeSessionId: PropTypes.string,
    activeSession: PropTypes.object.isRequired
  };

  handleRename(name) {
    this.props.actions.renameSession(name);
  }

  restoreSession() {
    this.props.activeSession.windows.forEach(w =>
      chrome.windows.create({
        url: w.tabs.map(t => t.url)
      })
    );
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
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>
              {activeSession.name}
            </h2>
            <div className={styles.panelHeaderMenu}>
              <ButtonModal
                  title="rename session"
                  buttonText="rename"
                  defaultValue={activeSession.name}
                  onOk={this.handleRename.bind(this)} />
              <button onClick={this.restoreSession.bind(this)}>
                restore
              </button>
            </div>
          </div>
          <div className={styles.panelBody}>
            <WindowList
                windows={activeSession.windows}
                deleteWindow={deleteWindow}
                deleteTab={deleteTab} />
          </div>
        </div>
      )
      : (
        <div className={styles.panel}></div>
      );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.sessions.list,
  activeSessionId: state.sessions.activeSessionId,
  activeSession: state.sessions.list.find(s =>
    s.id === state.sessions.activeSessionId
  )
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    renameSession,
    deleteWindow,
    deleteTab
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPanel);
