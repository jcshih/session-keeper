import React, { Component, PropTypes } from 'react';

import { ActiveSession } from '../containers';

class SessionList extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired
  };

  render() {
    const { sessions, setActive } = this.props;

    return (
      <div>
        {sessions.map(session =>
          <ActiveSession
              name={session.name}
              windows={session.windows}
              setActive={setActive}
              id={session.id}
              key={session.id} />
         )}
      </div>
    );
  }
}

export default SessionList;
