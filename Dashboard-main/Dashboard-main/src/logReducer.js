// logReducer.js

const initialState = {
    errorCount: 0,
    warningCount: 0,
    infoCount: 0,
  };
  
  const logReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_ERROR':
        return { ...state, errorCount: state.errorCount + 1 };
      case 'INCREMENT_WARNING':
        return { ...state, warningCount: state.warningCount + 1 };
      case 'INCREMENT_INFO':
        return { ...state, infoCount: state.infoCount + 1 };
      default:
        return state;
    }
  };
  
  export default logReducer;
  