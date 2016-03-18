import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';

import { Session } from '../components';
import { SESSION } from '../constants';

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.id === state.sessions.activeSessionId
});

const sessionSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findSession(props.id).index
    };
  },
  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    if (!monitor.didDrop()) {
      props.moveSession(droppedId, originalIndex);
    }
  }
};

const sessionTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    if (draggedId !== overId) {
      const overIndex = props.findSession(overId).index;
      props.moveSession(draggedId, overIndex);
    }
  }
};

let ActiveSession = connect(mapStateToProps)(Session);
ActiveSession = DragSource(SESSION, sessionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ActiveSession);
ActiveSession = DropTarget(SESSION, sessionTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ActiveSession);

export default ActiveSession;
