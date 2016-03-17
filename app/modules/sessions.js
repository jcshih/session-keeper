const SAVE = 'sessions/SAVE';

const sessions = (state = [], action) => {
  switch (action.type) {
    case SAVE:
      const { name, windows } = action.session;
      return [
        {
          id: Math.random().toString().slice(2),
          name: name,
          windows: windows
        },
        ...state
      ];
    default:
      return state;
  }
};

const saveSession = (session) => ({
  type: SAVE,
  session
});

export default sessions;
export {
  saveSession
};
