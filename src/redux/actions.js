// define type
export const SWITCH_THEME = 'SWITCH_THEME';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const MENU_TILES = 'MENU_TILES';
//define actions

export const switchTheme = BaseTheme => ({
  type: SWITCH_THEME,
  baseTheme: BaseTheme,
});

export const newNotification = newNotification => ({
  type: NEW_NOTIFICATION,
  newNotification: newNotification,
});

export const changeMenuTiles = count => ({
  type: MENU_TILES,
  payload: count,
});
