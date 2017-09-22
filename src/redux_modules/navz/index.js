const AT = {
  NAV_HEIGHT: 'app/navz/NAV_HEIGHT',
};

const initialState = {
  navHeight: 68, // default from izzan's laptop
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.NAV_HEIGHT:
      return { ...state, navHeight: action.data };
    default:
      return state;
  }
}

// Action Creator
export function updateNavHeight(navHeight) {
  return { type: AT.NAV_HEIGHT, data: navHeight };
}
