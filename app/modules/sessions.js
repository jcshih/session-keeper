/* Constants */
const SAVE = 'sessions/SAVE';
const SET_ACTIVE_SESSION = 'sessions/SET_ACTIVE_SESSION';
const DELETE_WINDOW = 'sessions/DELETE_WINDOW';
const DELETE_TAB = 'sessions/DELETE_TAB';

/* Reducers */
const initialState = {
  activeSessionId: null,
  list: []
};

const sessions = (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      const { name, windows } = action.session;
      const id = Math.random().toString().slice(2);
      return {
        ...state,
        activeSessionId: id,
        list: [
          {
            id: id,
            name: name,
            windows: windows
          },
          ...state.list
        ]
      };
    case SET_ACTIVE_SESSION:
      return {
        ...state,
        activeSessionId: action.id
      };
    case DELETE_WINDOW:
      return state;
    case DELETE_TAB:
      return state;
    default:
      return state;
  }
};

/* Actions */
const saveSession = (session) => ({
  type: SAVE,
  session
});

const setActiveSession = (id) => ({
  type: SET_ACTIVE_SESSION,
  id
});

const deleteWindow = (id) => ({
  type: DELETE_WINDOW,
  id
});

const deleteTab = (windowId, id) => ({
  type: DELETE_TAB,
  windowId,
  id
});

export default sessions;
export {
  saveSession,
  setActiveSession,
  deleteWindow,
  deleteTab
};
