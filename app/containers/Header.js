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
        Header
        <button onClick={toggleUrl}>toggle url</button>
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
