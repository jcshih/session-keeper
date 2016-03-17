import React, { Component, PropTypes } from 'react';

import { Session } from '.';

class SessionList extends Component {

  static propTypes = {
    sessions: PropTypes.array.isRequired
  };

  render() {
    const { sessions } = this.props;

    return (
      <div>
        {sessions.map(session =>
          <Session
              name={session.name}
              windows={session.windows}
              key={session.id} />
         )}
      </div>
    );
  }
}

export default SessionList;
