import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { WindowList } from '../components';

import { deleteWindow, deleteTab } from '../modules/sessions';

class SessionPanel extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    activeSessionId: PropTypes.string
  };

  render() {
    const {
      activeSessionId,
      sessions,
      actions: { deleteWindow, deleteTab }
    } = this.props;
    const activeSession = sessions.find(({ id: id }) => id === activeSessionId);

    return (
      <div className={styles.panel}>
        {activeSession
          ? <WindowList
                windows={activeSession.windows}
                deleteWindow={deleteWindow}
                deleteTab={deleteTab} />
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sessions: state.sessions.list,
  activeSessionId: state.sessions.activeSessionId
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    deleteWindow,
    deleteTab
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPanel);
