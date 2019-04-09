import { SET_USERS,
         SET_SEARCHING_CRITERIA,
         SET_SORTING_CRITERIA,
         SET_ASCENDING_ORDER } from '../constants/actionTypes';

const getInitialState = () => {
  return {
    users: [],
    searchingCriteria: '',
    sortingCriteria: '',
    ascendingOrder: false
  }
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });
    case SET_SEARCHING_CRITERIA:
      return Object.assign({}, state, { searchingCriteria: action.searchingCriteria });
    case SET_SORTING_CRITERIA:
      return Object.assign({}, state, { sortingCriteria: action.sortingCriteria });
    case SET_ASCENDING_ORDER:
      return Object.assign({}, state, { ascendingOrder: action.ascendingOrder });
    default:
      break;
  }

  return state;
}
