import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Session } from '../components';

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.id === state.sessions.activeSessionId
});

const ActiveSession = connect(mapStateToProps)(Session);

export default ActiveSession;
