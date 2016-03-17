import update from 'react/lib/update';

/* Constants */
const TOGGLE_URL = 'filter/TOGGLE_URL';

/* Reducers */
const initialState = {
  url: false
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_URL:
      return update(state, {
        url: { $set: state.url ? false : true }
      });
    default:
      return state;
  }
};

/* Actions */
const toggleUrl = () => ({
  type: TOGGLE_URL
});

export default filter;
export {
  toggleUrl
};
