const SET_CURRENT_WINDOWS = 'currentWindows/GET_CURRENT_WINDOWS';
const DELETE_WINDOW = 'currentWindows/DELETE_WINDOW';

const currentWindows = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_WINDOWS:
      return action.windows;
    case DELETE_WINDOW:
      return state.filter(window => window.id !== action.id);
    default:
      return state;
  }
};

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

export default currentWindows;
export {
  SET_CURRENT_WINDOWS,
  getCurrentWindows,
  setCurrentWindows,
  deleteWindow
};
