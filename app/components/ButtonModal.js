import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: '250px',
    height: '100px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: '#eeeeee'
  }
};

const buttonsStyles = {
  paddingTop: '15px'
};

const buttonStyle = {
  borderRadius: 0,
  backgroundColor: 'lightgrey',
  border: 'none',
  outline: 'none',
  margin: '0 5px'
};

class ButtonModal extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onOk: PropTypes.func.isRequired,
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    defaultValue: ''
  };

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, value: props.defaultValue };
  }

  componentDidUpdate(prevProps, prevState) {
    const modalIsOpen = this.state.modalIsOpen;
    if (prevState.modalIsOpen !== modalIsOpen && modalIsOpen) {
      setTimeout(() => ReactDOM.findDOMNode(this.refs.valueInput).select(), 0);
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true, value: this.props.defaultValue });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleInput(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleOk();
    }
  }

  handleOk() {
    const value = this.state.value;
    if (value && value.trim().length > 0) {
      this.props.onOk(value);
      this.closeModal();
    }
  }

  render() {
    const { title, buttonText, defaultValue } = this.props;

    return (
      <div>
        <button onClick={this.openModal.bind(this)}>{buttonText}</button>
        <Modal
            style={modalStyles}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal.bind(this)} >
          <h2>{title}</h2>
          <input
              onChange={this.handleInput.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              value={this.state.value}
              ref="valueInput" />
          <div style={buttonsStyles}>
            <button
                onClick={this.handleOk.bind(this)}
                style={buttonStyle}>
              ok
            </button>
            <button
                onClick={this.closeModal.bind(this)}
                style={buttonStyle}>
              cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ButtonModal;
