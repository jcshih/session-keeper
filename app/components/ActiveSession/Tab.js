import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { TAB } from '../../constants';

class Tab extends Component {

  static propTypes = {
    tab: PropTypes.object.isRequired,
    windowId: PropTypes.string.isRequired,
    deleteTab: PropTypes.func.isRequired,
    showUrl: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const {
      tab: { id, title, url },
      windowId,
      deleteTab,
      showUrl,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div style={{opacity: isDragging ? 0 : 1}}>
        <h4>
          <button onClick={() => deleteTab(windowId, id)}>x</button>
          {title}
        </h4>
        <div>
          {showUrl ? url : null}
        </div>
      </div>
    ));
  }
}

const tabSource = {
  beginDrag(props) {
    const { windowId, tab: { id: tabId } } = props;
    return {
      id: [ windowId, tabId ],
      originalIndex: props.findTab(tabId).index
    };
  },

  isDragging(props, monitor) {
    return props.tab.id === monitor.getItem().id[1];
  }
};

const tabTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: [ draggedWindowId, draggedTabId ] } = monitor.getItem();
    const {
      windowId: overWindowId,
      tab: { id: overTabId }
    } = props;
    if (draggedTabId !== overTabId) {
      const { index: overIndex } = props.findTab(overTabId);
      props.moveTab(draggedTabId, overIndex);
    }
  }
};

Tab = DragSource(TAB, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Tab);
Tab = DropTarget(TAB, tabTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Tab);

export default Tab;
