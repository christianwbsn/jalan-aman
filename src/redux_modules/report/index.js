import request from 'superagent';

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
  return dispatch => {
    dispatch(loadingUpdateReports());
    return request.get('https://api.jalanaman.ga/report/all')
              .end((err, res) => {
                if (err) {
                  console.log('ERROR LOADING REPORTS: ', err);
                } else {
                  const result = JSON.parse(res.text);
                  if (result.status != 200) {
                    console.log('ERROR LOADING REPORTS: ');
                  } else {
                    const reports = result.data;
                    dispatch(updateReports(reports));
                    dispatch(doneUpdateReports());
                  }
                }
             });
  };
}



//     const promise = new Promise(resolve => setTimeout(resolve, 500)); // ganti => tempak API
//     await promise;
//     const reports = [
//       {
//         id: 1,
//         icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
//         tite: 'begal',
//         datetime: '1-9-2017 12:03:23',
//         address: 'Jl. Cisistew',
//         position: { lat: -6.677542, lng: 107.6036 },
//         description: 'aku ditusuuuk',
//       },
//       {
//         id: 2,
//         icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
//         tite: 'begal',
//         datetime: '14-11-2016 2:21:54',
//         address: 'Jl. Cisistew',
//         position: { lat: -6.777542, lng: 107.6036 },
//         description: 'aku diapa2in',
//       },
//       {
//         id: 3,
//         icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
//         tite: 'begal',
//         datetime: '8-8-1998 1:01:1',
//         address: 'RS MMC',
//         position: { lat: -6.877542, lng: 107.6036 },
//         description: 'aku dicopet',
//       },
//     ];
//     dispatch(updateReports(reports));
//     dispatch(doneUpdateReports());
//   };
// }
