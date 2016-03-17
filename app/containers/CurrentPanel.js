import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import styles from './Panel.css';
import { WindowList } from '../components';

import {
  getCurrentWindows,
  deleteWindow,
  deleteTab
} from '../modules/currentWindows';
import { saveSession } from '../modules/sessions';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  content: {
    width: '250px',
    height: '150px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

class CurrentPanel extends Component {

  static propTypes = {
    windows: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, name: '' };
  }

  componentWillMount() {
    this.props.actions.getCurrentWindows();
  }

  componentDidUpdate(prevProps, prevState) {
    const modalIsOpen = this.state.modalIsOpen;
    if (prevState.modalIsOpen !== modalIsOpen && modalIsOpen) {
      setTimeout(() => ReactDOM.findDOMNode(this.refs.nameInput).focus(), 0);
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true, name: '' });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleInput(e) {
    this.setState({ name: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSave();
    }
  }

  handleSave() {
    const { windows, actions: { saveSession } } = this.props;
    const name = this.state.name;
    if (name && name.length > 0) {
      saveSession({
        name: name,
        windows
      });
      this.closeModal();
    }
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
      <div className={styles.panel}>
        <button onClick={getCurrentWindows}>refresh</button>
        <button onClick={this.openModal.bind(this)}>save</button>
        <WindowList
            windows={windows}
            deleteWindow={deleteWindow}
            deleteTab={deleteTab} />
        <Modal
            style={modalStyles}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal.bind(this)} >
          <h2>enter name</h2>
          <input
              onChange={this.handleInput.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              ref="nameInput" />
          <button onClick={this.handleSave.bind(this)}>ok</button>
          <button onClick={this.closeModal.bind(this)}>cancel</button>
        </Modal>
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
