/**
 * This function is used to load redux state from localstorage
 */
export const loadState = () => {
    // console.log("loading state")
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      let state = JSON.parse(serializedState);
      state['user']['errors'] = [];
      state['user']['success'] = [];
      return state;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
  /**
   * This function is used to save redux state to localstorage
   */
  export const saveState = (state) => {
    // console.log("saving state")
    // console.log(state)
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      console.log(err);
    }
  };