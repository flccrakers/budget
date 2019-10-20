export default function reducer(state = {}, action) {
  switch (action.type) {

    case "persist/REHYDRATE": {
      if (action.payload !== undefined) {
        return {...state, ...action.payload.account};
      }
      return {...state}
    }
    default:
      return {...state};
  }
}