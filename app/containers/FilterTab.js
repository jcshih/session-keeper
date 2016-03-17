import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Tab } from '../components';

const mapStateToProps = (state) => ({
  showUrl: state.filter.url
});

const FilterTab = connect(mapStateToProps)(Tab);

export default FilterTab;
