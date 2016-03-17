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
      return state.filter(window => window.id !== action.id);
    case DELETE_TAB:
      const { windowId, id } = action;
      return state.map(window => (
        window.id === windowId ? currentWindow(window, action) : window
      ));
    default:
      return state;
  }
};

const currentWindow = (state, action) => {
  switch (action.type) {
    case DELETE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter(tab => tab.id !== action.id)
      };
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
          .then(windows => {
            chrome.tabs.getCurrentAsync()
                  .then(tab => [ windows, tab.id ])
                  .then(([ windows, currentTabId ]) => {
                    windows = windows.map(win => ({
                      id: win.id,
                      tabs: win.tabs
                               .filter(tab => tab.id !== currentTabId)
                               .map(tab => ({
                                 id: tab.id,
                                 title: tab.title,
                                 url: tab.url,
                                 favIconUrl: tab.favIconUrl
                               }))
                    }));
                    dispatch(setCurrentWindows(windows));
                  });
          });
  };
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
