import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tab from './Tab';
import {
  moveTab, deleteTab, deleteTabByIndex, addTab
} from '../../modules/sessions';
import { deleteTab as deleteCurrentTab } from '../../modules/currentWindows';
import { SESSION_TAB } from '../../constants';

class TabContainer extends Component {

  static propTypes = {
    activeSession: PropTypes.object.isRequired,
    currentWindows: PropTypes.array.isRequired
  };

  findTab(tabId) {
    const { activeSession } = this.props;
    const [ windowIndex, tabIndex, tab ] = (() => {
      for (let wi = 0; wi < activeSession.windows.length; wi++) {
        let w = activeSession.windows[wi];
        for (let ti = 0; ti < w.tabs.length; ti++) {
          let t = w.tabs[ti];
          if (t.id === tabId) {
            return [ wi, ti, t ];
          }
        }
      }
    })();
    return {
      index: [ windowIndex, tabIndex ],
      tab
    };
  }

  moveTab(tabId, atIndex) {
    const { tab, index } = this.findTab(tabId);
    this.props.actions.moveTab(tab, index, atIndex);
  }

  findCurrentTab(tabId) {
    const { currentWindows } = this.props;
    const [ windowIndex, tabIndex, tab ] = (() => {
      for (let wi = 0; wi < currentWindows.length; wi++) {
        let w = currentWindows[wi];
        for (let ti = 0; ti < w.tabs.length; ti++) {
          let t = w.tabs[ti];
          if (t.id === tabId) {
            return [ wi, ti, t ];
          }
        }
      }
      return [ -1, -1, null ];
    })();
    return {
      index: [ windowIndex, tabIndex ],
      tab
    };
  }

  moveCurrentTab(windowId, tabId, atIndex) {
    const {
      deleteCurrentTab, deleteTab, deleteTabByIndex, addTab
    } = this.props.actions;
    const {
      index: [ windowIndex, tabIndex ],
      tab: currentTab
    } = this.findCurrentTab(tabId);
    if (windowIndex !== -1 && tabIndex !== -1) {
      deleteCurrentTab(windowId, tabId);
      addTab(currentTab, atIndex);
    } else {
      const { index, tab } = this.findTab(tabId);
      deleteTabByIndex(...index);
      addTab(tab, atIndex);
    }
  }

  render() {
    return (
      <Tab
          {...this.props}
          dragType={SESSION_TAB}
          findTab={this.findTab.bind(this)}
          moveTab={this.moveTab.bind(this)}
          moveCurrentTab={this.moveCurrentTab.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => ({
  showUrl: state.filter.url,
  currentWindows: state.currentWindows,
  activeSession: state.sessions.list.find(
    s => s.id === state.sessions.activeSessionId
  )
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    moveTab,
    addTab,
    deleteTab,
    deleteTabByIndex,
    deleteCurrentTab
  }, dispatch)
});

TabContainer = connect(mapStateToProps, mapDispatchToProps)(TabContainer);

export default TabContainer;
