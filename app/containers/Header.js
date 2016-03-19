import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Header.css';

import { toggleUrl } from '../modules/filter';

class Header extends Component {

  render() {
    const { actions: { toggleUrl } } = this.props;

    return (
      <div className={styles.header}>
        <h1>Session Keeper</h1>
        <div>
          <button onClick={toggleUrl}>toggle urls</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleUrl
  }, dispatch)
});

export default connect(null, mapDispatchToProps)(Header);
