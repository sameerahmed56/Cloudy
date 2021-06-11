import {SWITCH_THEME, NEW_NOTIFICATION, MENU_TILES} from './actions';

export const reducer = (state = {}, action) => {
  // initialState
  let newState = {};
  switch (action.type) {
    case SWITCH_THEME:
      newState = {
        ...state,
        theme: {
          // ...state,       //not required
          ...action.baseTheme,
        },
      };
      return newState;

    case NEW_NOTIFICATION:
      newState = {
        ...state,
        newNotification: {
          ...action.newNotification,
        },
      };
      return newState;

    case MENU_TILES:
      newState = {
        ...state,
        tilesPerRow: action.payload,
      };
      return newState;

    default:
      return state;
  }
};
