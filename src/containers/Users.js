import { connect } from 'react-redux';
import { Users as UsersComp } from '../components/Users';

import { fetchUsers } from '../actions/users';

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

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: (page, filters) => dispatch(fetchUsers(page, filters))
  };
};

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersComp);
export {Users};