const SAVE = 'sessions/SAVE';

const sessions = (state = [], action) => {
  switch (action.type) {
    case SAVE:
      console.log('save', action);
      const { name, windows } = action.session;
      return [
        {
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
