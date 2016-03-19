import update from 'react/lib/update';

/* Constants */
const SAVE = 'sessions/SAVE';
const SET_ACTIVE_SESSION = 'sessions/SET_ACTIVE_SESSION';
const RENAME_SESSION = 'sessions/RENAME_SESSION';
const MOVE_SESSION = 'session/MOVE_SESSION';
const MOVE_TAB = 'session/MOVE_TAB';
const ADD_TAB = 'session/ADD_TAB';
const UPDATE_TAB_ID = 'session/UPDATE_TAB_ID';
const DELETE_SESSION = 'sessions/DELETE_SESSION';
const DELETE_WINDOW = 'sessions/DELETE_WINDOW';
const DELETE_TAB = 'sessions/DELETE_TAB';
const DELETE_TAB_BY_INDEX = 'sessions/DELETE_TAB_BY_INDEX';

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
      return update(state, {
        activeSessionId: { $set: id },
        list: {
          $unshift: [{ id, name, windows }]
        }
      });
    case SET_ACTIVE_SESSION:
      return update(state, {
        activeSessionId: { $set: action.id }
      });
    case RENAME_SESSION:
      const sessionIndex = state.list
                                .findIndex(s => s.id === state.activeSessionId);
      return update(state, {
        list: {
          [sessionIndex]: {
            $merge: {
              name: action.name
            }
          }
        }
      });
    case MOVE_SESSION:
      return update(state, {
        list: {
          $splice: [
            [ action.fromIndex, 1 ],
            [ action.toIndex, 0, action.session ]
          ]
        }
      });
    case MOVE_TAB:
      return tab(state, action);
    case ADD_TAB:
      return tab(state, action);
    case UPDATE_TAB_ID:
      return tab(state, action);
    case DELETE_SESSION:
      const index = state.list.findIndex(session => session.id === action.id);
      const activeId = state.activeSessionId === state.list[index].id
        ? null : state.activeSessionId;
      return update(state, {
        activeSessionId: { $set: activeId },
        list: {
          $splice: [[ index, 1 ]]
        }
      });
    case DELETE_WINDOW:
      return window(state, action);
    case DELETE_TAB:
      return tab(state, action);
    case DELETE_TAB_BY_INDEX:
      return tab(state, action);
    default:
      return state;
  }
};

const window = (state, action) => {
  switch (action.type) {
    case DELETE_WINDOW:
      const sessionIndex = state.list
                                .findIndex(s => s.id === state.activeSessionId);
      const windowIndex = state.list[sessionIndex]
                               .windows
                               .findIndex(win => win.id === action.id);
      return update(state, {
        list: {
          [sessionIndex]: {
            windows: {
              $splice: [[ windowIndex, 1 ]]
            }
          }
        }
      });
    default:
      return state;
  }
};

const tab = (state, action) => {
  const sessionIndex = state.list
                            .findIndex(s => s.id === state.activeSessionId);
  switch (action.type) {
    case MOVE_TAB:
      const [ fromWindowIndex, fromTabIndex ] = action.fromIndex;
      const [ toWindowIndex, toTabIndex ] = action.toIndex;

      let splice;
      if (fromWindowIndex === toWindowIndex) {
        splice = {
          [fromWindowIndex]: {
            tabs: {
              $splice: [[ fromTabIndex, 1 ], [ toTabIndex, 0, action.tab ]]
            }
          }
        };
      } else {
        splice = {
          [fromWindowIndex]: {
            tabs: {
              $splice: [[ fromTabIndex, 1 ]]
            }
          },
          [toWindowIndex]: {
            tabs: {
              $splice: [[ toTabIndex, 0, action.tab ]]
            }
          }
        };
      }

      return update(state, {
        list: {
          [sessionIndex]: {
            windows: splice
          }
        }
      });
    case ADD_TAB:
      const tabToAdd = update(action.tab, {
        id: {
          $apply: id => id.length > 10
            ? id
            : `${id}-${Math.random().toString().slice(2)}`
        }
      });
      return update(state, {
        list: {
          [sessionIndex]: {
            windows: {
              [action.windowIndex]: {
                tabs: {
                  $splice: [[
                    action.tabIndex,
                    0,
                    update(action.tab, { dragging: { $set: true } }) ]]
                }
              }
            }
          }
        }
      });
    case UPDATE_TAB_ID:
      let updateWindowIndex = -1, updateTabIndex = -1;
      state.list[sessionIndex].windows.forEach((w, wi) => {
        w.tabs.forEach((t, ti) => {
          if (t.id === action.tabId) {
            updateWindowIndex = wi;
            updateTabIndex = ti;
          }
        });
      });
      if (updateWindowIndex === -1 || updateTabIndex === -1) {
        return state;
      }
      return update(state, {
        list: {
          [sessionIndex]: {
            windows: {
              [updateWindowIndex]: {
                tabs: {
                  [updateTabIndex]: {
                    id: {
                      $apply: id => `${id}-${Math.random().toString().slice(2)}`
                    },
                    dragging: {
                      $set: false
                    }
                  }
                }
              }
            }
          }
        }
      });
    case DELETE_TAB:
      const windowIndex = state.list[sessionIndex]
                               .windows
                               .findIndex(win => win.id === action.windowId);
      const tabIndex = state.list[sessionIndex]
                            .windows[windowIndex]
                            .tabs
                            .findIndex(tab => tab.id === action.id);
      return update(state, {
        list: {
          [sessionIndex]: {
            windows: {
              [windowIndex]: {
                tabs: {
                  $splice: [[ tabIndex, 1 ]]
                }
              }
            }
          }
        }
      });
    case DELETE_TAB_BY_INDEX:
      return update(state, {
        list: {
          [sessionIndex]: {
            windows: {
              [action.windowIndex]: {
                tabs: {
                  $splice: [[ action.tabIndex, 1 ]]
                }
              }
            }
          }
        }
      });
    default:
      return state;
  }
};

/* Actions */
const saveSession = (session) => {
  session = update(session, {
    windows: {
      $apply: ws => ws.map(w => update(w, {
        id: {
          $apply: id => `${id}-${Math.random().toString().slice(2)}`
        },
        tabs: {
          $apply: ts => ts.map(t => update(t, {
            id: {
              $apply: id => `${id}-${Math.random().toString().slice(2)}`
            }
          }))
        }
      }))
    }
  });

  return {
    type: SAVE,
    session
  }
};

const setActiveSession = (id) => ({
  type: SET_ACTIVE_SESSION,
  id
});

const renameSession = (name) => ({
  type: RENAME_SESSION,
  name
});

const moveSession = (session, fromIndex, toIndex) => ({
  type: MOVE_SESSION,
  session,
  fromIndex,
  toIndex
});

const moveTab = (tab, fromIndex, toIndex) => ({
  type: MOVE_TAB,
  tab,
  fromIndex,
  toIndex
});

const addTab = (tab, [ windowIndex, tabIndex ]) => ({
  type: ADD_TAB,
  tab,
  windowIndex,
  tabIndex
});

const updateTabId = (tabId) => ({
  type: UPDATE_TAB_ID,
  tabId
});

const deleteSession = (id) => ({
  type: DELETE_SESSION,
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

const deleteTabByIndex = (windowIndex, tabIndex) => ({
  type: DELETE_TAB_BY_INDEX,
  windowIndex,
  tabIndex
});

export default sessions;
export {
  saveSession,
  setActiveSession,
  renameSession,
  moveSession,
  moveTab,
  addTab,
  updateTabId,
  deleteSession,
  deleteWindow,
  deleteTab,
  deleteTabByIndex
};
