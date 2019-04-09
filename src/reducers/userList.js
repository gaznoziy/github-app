import { SET_USERS,
         SET_SEARCHING_CRITERIA,
         SET_SORTING_CRITERIA,
         SET_ASCENDING_ORDER,
         SET_TOTAL_PAGE_COUNT} from '../constants/actionTypes';

const initialState = {
    users: [],
    searchingCriteria: '',
    sortingCriteria: '',
    ascendingOrder: false,
    totalPageCount: 0,
    usersPerPage: 30
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return Object.assign({}, state, { users: action.users });
    case SET_SEARCHING_CRITERIA:
      return Object.assign({}, state, { searchingCriteria: action.searchingCriteria });
    case SET_SORTING_CRITERIA:
      return Object.assign({}, state, { sortingCriteria: action.sortingCriteria });
    case SET_ASCENDING_ORDER:
      return Object.assign({}, state, { ascendingOrder: action.ascendingOrder });
    case SET_TOTAL_PAGE_COUNT:
      return Object.assign({}, state, { totalPageCount: action.totalPageCount });
    default:
      break;
  }

  return state;
}
