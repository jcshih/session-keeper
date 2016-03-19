import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import styles from '../Tab.css';
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
        <h4 className={styles.title}>
          <button
              onClick={() => deleteTab(windowId, id)}
              className={styles.close}>
            x
          </button>
          <a href={url} title={title} target="_blank">{title}</a>
        </h4>
        {showUrl
          ? (
            <div className={styles.url}>
              <a href={url} title={url} target="_blank">{url}</a>
            </div>
          ) : null}
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
