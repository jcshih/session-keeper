import update from 'react/lib/update';

/* Constants */
const SET_CURRENT_WINDOWS = 'currentWindows/GET_CURRENT_WINDOWS';
const DELETE_WINDOW = 'currentWindows/DELETE_WINDOW';
const DELETE_TAB = 'currentWindows/DELETE_TAB';

/* Reducers */
const currentWindows = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_WINDOWS:
      return action.windows;
    case DELETE_WINDOW:
      return update(state, {
        $splice: [[ state.findIndex(win => win.id === action.id), 1 ]]
      });
    case DELETE_TAB:
      const { windowId, id } = action;
      const windowIndex = state.findIndex(win => win.id === windowId);
      const tabIndex = state[windowIndex].tabs.findIndex(tab => tab.id === id);
      return update(state, {
        [windowIndex]: {
          tabs: {
            $splice: [[ tabIndex, 1]]
          }
        }
      });
    default:
      return state;
  }
};

/* Actions */
const setCurrentWindows = (windows) => ({
  type: SET_CURRENT_WINDOWS,
  windows
});

const getCurrentWindows = () => {
  return (dispatch) => {
    chrome.windows
          .getAllAsync({ populate: true, windowTypes: [ 'normal' ] })
          .then(windows => getTabs(windows, dispatch));
  };
};

const getTabs = (windows, dispatch) => {
  chrome.tabs.getCurrentAsync()
        .then(tab => [ windows, tab.id ])
        .then(([ windows, currentTabId ]) => {
          windows = windows.map(win => ({
            id: String(win.id),
            tabs: win.tabs
                     .filter(tab => tab.id !== currentTabId)
                     .map(tab => ({
                       id: String(tab.id),
                       title: tab.title,
                       url: tab.url,
                       favIconUrl: tab.favIconUrl
                     }))
          }));
          dispatch(setCurrentWindows(windows));
        });
};

const deleteWindow = (id) => ({
  type: DELETE_WINDOW,
  id
});

const deleteTab = (windowId, id) => ({
  type: DELETE_TAB,
  windowId,
  id
});

export default currentWindows;
export {
  SET_CURRENT_WINDOWS,
  getCurrentWindows,
  setCurrentWindows,
  deleteWindow,
  deleteTab
};
