const AT = {
  LOADING: 'app/report/LOADING',
  UPDATE_REPORTS: 'app/report/UPDATE_REPORTS',
  DONE: 'app/report/DONE',
};

const initialState = {
  isLoading: false,
  reports: [],
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.UPDATE_REPORTS:
      return { ...state, reports: action.data };
    case AT.LOADING:
      return { ...state, isLoading: true };
    case AT.DONE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

// Action Creator
export function updateReports(reports) {
  return { type: AT.UPDATE_REPORTS, data: reports };
}

export function loadingUpdateReports() {
  return { type: AT.LOADING };
}

export function doneUpdateReports() {
  return { type: AT.DONE };
}

// Thunk
export function loadReports() {
  return async dispatch => {
    dispatch(loadingUpdateReports());
    const promise = new Promise(resolve => setTimeout(resolve, 500)); // ganti => tempak API
    await promise;
    const reports = [
      {
        position: { lat: -34.397, lng: 150.644 },
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        message: 'cinta',
      },
      {
        position: { lat: -6.877542, lng: 107.6036 },
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        message: 'hanyalah cinta',
      },
      {
        position: { lat: -6.777542, lng: 107.6036 },
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        message: 'HIHIHIH',
      },
    ];
    dispatch(updateReports(reports));
    dispatch(doneUpdateReports());
  };
}
