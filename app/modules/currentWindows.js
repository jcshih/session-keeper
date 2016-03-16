const SET_CURRENT_WINDOWS = 'currentWindows/GET_CURRENT_WINDOWS';

const currentWindows = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_WINDOWS:
      return action.windows;
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

export default currentWindows;
export {
  SET_CURRENT_WINDOWS,
  getCurrentWindows,
  setCurrentWindows
};
