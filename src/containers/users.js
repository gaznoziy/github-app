import { connect } from 'react-redux';
import { Users as UsersComp } from '../components/Users';
import { default as UsersFilterComp } from '../components/UsersFilter';

import { fetchUsers, setSearchingCriteria, setSortingCriteria, setAscendingOrder } from '../actions/users';

const mapStateToProps = store => {
    return {
        users: store.userState.users,
        searchingCriteria: store.userState.searchingCriteria,
        sortingCriteria: store.userState.sortingCriteria,
        ascendingOrder: store.userState.ascendingOrder,
        totalPageCount: store.userState.totalPageCount,
        usersPerPage: store.userState.usersPerPage
    };
};

const userFilterActions = dispatch => {
  return {
    setSearchingCriteria: (searchingCriteria) => dispatch(setSearchingCriteria(searchingCriteria)),
    setSortingCriteria: (sortingCriteria) => dispatch(setSortingCriteria(sortingCriteria)),
    setAscendingOrder: (value) => dispatch(setAscendingOrder(value))
  };
};

const usersActions = dispatch => {
  return {
    fetchUsers: (page, filters) => dispatch(fetchUsers(page, filters))
  };
};

const Users = connect(mapStateToProps, usersActions)(UsersComp);
const UsersFilter = connect(null, userFilterActions)(UsersFilterComp);

export {Users, UsersFilter};