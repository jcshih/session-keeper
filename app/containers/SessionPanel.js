import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { WindowList } from '../components';

class SessionPanel extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    activeSessionId: PropTypes.string.isRequired
  };

  render() {
    const { activeSessionId, sessions } = this.props;
    const activeSession = sessions.find(({ id: id }) => id === activeSessionId);

    return (
      <div className={styles.panel}>
        {activeSession
         ? <WindowList
               windows={activeSession.windows} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPanel);
