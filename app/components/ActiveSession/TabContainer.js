import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tab from './Tab';
import { moveTab } from '../../modules/sessions';

class TabContainer extends Component {

  static propTypes = {
    activeSession: PropTypes.object.isRequired
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

  render() {
    return (
      <Tab
          {...this.props}
          findTab={this.findTab.bind(this)}
          moveTab={this.moveTab.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => ({
  showUrl: state.filter.url,
  activeSession: state.sessions.list.find(
    s => s.id === state.sessions.activeSessionId
  )
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    moveTab
  }, dispatch)
});

TabContainer = connect(mapStateToProps, mapDispatchToProps)(TabContainer);

export default TabContainer;
