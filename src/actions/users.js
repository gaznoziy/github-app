import {
    SET_USERS,
    SET_TOTAL_PAGE_COUNT,
    SET_SEARCHING_CRITERIA,
    SET_SORTING_CRITERIA,
    SET_ASCENDING_ORDER
} from '../constants/actionTypes';
import { GITHUB_CREDENTIALS } from '../config/config';

const GITHUB_URL = 'https://api.github.com/search/users?q=type:user';

export const setSearchingCriteria = (searchingCriteria) => {
    return dispatch => {
        dispatch({ type: SET_SEARCHING_CRITERIA, searchingCriteria });
    };
}

export const setSortingCriteria = (sortingCriteria) => {
    return dispatch => {
        dispatch({ type: SET_SORTING_CRITERIA, sortingCriteria });
    };
}

export const setAscendingOrder = (value) => {
    return dispatch => {
        dispatch({ type: SET_ASCENDING_ORDER, ascendingOrder: value });
    }
}

export const fetchUsers = (page, filters) => {
    page = `&page=${page}`;
    return (dispatch, getState) => {
        fetch(`${GITHUB_URL}${filters}&access_token=${GITHUB_CREDENTIALS.OAUTH_TOKEN}${page}`)
          .then(response => response.json())
          .then(result => {
            const { usersPerPage } = getState().userState;
            const totalPageCount = Math.ceil(result.total_count / usersPerPage);

            dispatch({ type: SET_TOTAL_PAGE_COUNT, totalPageCount});
            dispatch({ type: SET_USERS, users: result.items});
          });
    }
}