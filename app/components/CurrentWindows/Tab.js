import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { CURRENT_TAB } from '../../constants';

class Tab extends Component {

  static propTypes = {
    tab: PropTypes.object.isRequired,
    windowId: PropTypes.string.isRequired,
    deleteTab: PropTypes.func.isRequired,
    showUrl: PropTypes.bool.isRequired,
    dragType: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const {
      tab: { id, title, url },
      windowId,
      deleteTab,
      showUrl,
      connectDragSource,
      isDragging
    } = this.props;

    return connectDragSource(
      <div style={{opacity: isDragging ? 0 : 1}}>
        <h4>
          <button onClick={() => deleteTab(windowId, id)}>x</button>
          {title}
          {showUrl ? url : null}
        </h4>
      </div>
    );
  }
}

const tabSource = {
  beginDrag(props) {
    const { windowId, tab: { id: tabId }, dragType } = props;
    return {
      id: [ windowId, tabId ],
      dragType
    };
  },

  endDrag(props, monitor) {
    props.actions.updateTabId(monitor.getItem().id[1]);
  }
};

Tab = DragSource(CURRENT_TAB, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Tab);

export default Tab;
