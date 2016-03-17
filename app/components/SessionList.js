import React, { Component, PropTypes } from 'react';

import { ActiveSession } from '../containers';

class SessionList extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired
  };

  render() {
    const { sessions, setActive, deleteSession } = this.props;

    return (
      <div>
        {sessions.map(session =>
          <ActiveSession
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

export default SessionList;
