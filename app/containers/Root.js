import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import App from './App';

class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={{ height: '100vh', background: '#ffffff' }}>
          <App />
        </div>
      </Provider>
    );
  }
}

export default Root;
