import {
    SET_USERS,
    SET_TOTAL_PAGE_COUNT,
    SET_SEARCHING_CRITERIA,
    SET_SORTING_CRITERIA,
    SET_ASCENDING_ORDER
} from '../constants/actionTypes';

import { fetchUsersRequest } from '../svc/users';

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
    return async (dispatch, getState) => {
        const data = await fetchUsersRequest(page, filters);
        const { usersPerPage } = getState().userState;
        const totalPageCount = Math.ceil(data.total_count / usersPerPage);

        dispatch({ type: SET_TOTAL_PAGE_COUNT, totalPageCount});
        dispatch({ type: SET_USERS, users: data.items});
    }
}