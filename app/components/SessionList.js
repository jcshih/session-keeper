import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import { ActiveSession } from '../containers';
import { SESSION } from '../constants';

const sessionTarget = {
  drop() {
  }
};

class SessionList extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    moveSession: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  findSession(id) {
    const index = this.props.sessions.findIndex(s => s.id === id);
    return {
      index,
      session: this.props.sessions[index]
    };
  }

  moveSession(id, toIndex) {
    const { index, session } = this.findSession(id);
    this.props.moveSession(session, index, toIndex);
  }

  render() {
    const { sessions, setActive, deleteSession, connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        {sessions.map(session =>
          <ActiveSession
              findSession={this.findSession.bind(this)}
              moveSession={this.moveSession.bind(this)}
              name={session.name}
              windows={session.windows}
              setActive={setActive}
              deleteSession={deleteSession}
              id={session.id}
              key={session.id} />
         )}
      </div>
    );
  }
}

SessionList = DropTarget(SESSION, sessionTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(SessionList);

export default SessionList;
