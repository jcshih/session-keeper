import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tab from './Tab';
import { CURRENT_TAB } from '../../constants';
import { updateTabId } from '../../modules/sessions';

class TabContainer extends Component {

  static propTypes = {
    currentWindows: PropTypes.array.isRequired
  };

  render() {
    return (
      <Tab
          {...this.props}
          dragType={CURRENT_TAB} />
    );
  }
}

const mapStateToProps = (state) => ({
  currentWindows: state.currentWindows,
  showUrl: state.filter.url
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updateTabId
  }, dispatch)
});

TabContainer = connect(mapStateToProps, mapDispatchToProps)(TabContainer);

export default TabContainer;
