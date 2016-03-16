import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { WindowList } from '../components';

import {
  getCurrentWindows,
  deleteWindow
} from '../modules/currentWindows';
import { saveSession } from '../modules/sessions';

class CurrentPanel extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired
  };

  componentWillMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    this.props.actions.getCurrentWindows();
  }

  handleSave() {
    const { windows, actions: { saveSession } } = this.props;
    saveSession(windows);
  }

  handleDeleteWindow(id) {
    this.props.actions.deleteWindow(id);
  }

  render() {
    const { windows } = this.props;

    return (
      <div className={styles.panel}>
        <button onClick={this.handleRefresh.bind(this)}>refresh</button>
        <button onClick={this.handleSave.bind(this)}>save</button>
        <WindowList
            windows={windows}
            deleteWindow={this.handleDeleteWindow.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windows: state.currentWindows
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getCurrentWindows,
    deleteWindow,
    saveSession
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPanel);
