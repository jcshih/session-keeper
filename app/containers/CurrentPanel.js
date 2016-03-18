import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Panel.css';
import { WindowList, ButtonModal } from '../components';

import {
  getCurrentWindows,
  deleteWindow,
  deleteTab
} from '../modules/currentWindows';
import { saveSession } from '../modules/sessions';

class CurrentPanel extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired
  };

  componentWillMount() {
    this.props.actions.getCurrentWindows();
  }

  handleSave(name) {
    const { windows, actions: { saveSession } } = this.props;
    saveSession({
      name: name,
      windows
    });
  }

  render() {
    const {
      windows,
      actions: {
        getCurrentWindows,
        deleteWindow,
        deleteTab
      }
    } = this.props;

    return (
      <div className={styles.panelContainer}>
        <div className={styles.panelHeader}>
          <h2>Current Windows</h2>
          <button onClick={getCurrentWindows}>refresh</button>
          <ButtonModal
              title="enter name"
              buttonText="save"
              onOk={this.handleSave.bind(this)} />
        </div>
        <div className={styles.panel}>
          <WindowList
              windows={windows}
              deleteWindow={deleteWindow}
              deleteTab={deleteTab} />
        </div>
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
    deleteTab,
    saveSession
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPanel);
