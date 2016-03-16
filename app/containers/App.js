import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'normalize.css';
import styles from './App.css';
import {
  Header,
  SideBar,
  SessionPanel,
  CurrentPanel
} from '../components';

import { getCurrentWindows } from '../modules/currentWindows';

class App extends Component {

  static propTypes = {
    currentWindows: PropTypes.array.isRequired
  };

  render() {
    const { currentWindows, actions: { getCurrentWindows } } = this.props;

    return (
      <div className={styles.app}>
        <SideBar />
        <div className={styles.main}>
          <Header />
          <div className={styles.panelContainer}>
            <SessionPanel />
            <CurrentPanel
                windows={currentWindows}
                refresh={getCurrentWindows} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentWindows: state.currentWindows
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getCurrentWindows
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
