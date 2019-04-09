import React from 'react';
import UsersFilter from './UsersFilter';
import UsersTable from './UsersTable';

import { GITHUB_CREDENTIALS } from '../config/config';
import { store } from '../store';
import { connect } from 'react-redux';
import { SET_USERS } from '../constants/actionTypes';

const mapStateToProps = store => {
  return {
    users: store.userState.users || [],
    searchingCriteria: store.userState.searchingCriteria,
    sortingCriteria: store.userState.sortingCriteria,
    ascendingOrder: store.userState.ascendingOrder
  }
}

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPageCount: 0,
      usersPerPage: 30,
      page: 0,
      searchingValue: '',
      sortingValue: '',
      ascendingOrder: false
    }
  }

  componentDidUpdate = (prevProps) => {
    const { searchingCriteria, sortingCriteria, ascendingOrder } = this.props;

    if (prevProps.searchingCriteria !== searchingCriteria) {
      this.setState({ page: 0, searchingValue: searchingCriteria }, () => {
        this.fetchUsers(this.state.page);
      });
    }

    if (prevProps.sortingCriteria !== sortingCriteria) {      
      this.setState({ page: 0, sortingValue: sortingCriteria }, () => {
        this.fetchUsers(this.state.page);
      });
    }

    if (prevProps.ascendingOrder !== ascendingOrder) {
      this.setState({ page: 0, ascendingOrder }, () => {
        this.fetchUsers(this.state.page);
      });
    }
  }

  componentDidMount() {
    this.fetchUsers(this.state.page);
  }

  fetchUsers = (page) => {
    const url = this.applyApiFilters(page);

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const totalPageCount = Math.ceil(result.total_count / this.state.usersPerPage);
        this.setState({ totalPageCount });

        store.dispatch({
          type: SET_USERS,
          users: result.items
        });
      });
  }

  applyApiFilters = (page) => {
    const { searchingValue, sortingValue, ascendingOrder } = this.state;
    const search = searchingValue ? ` ${searchingValue} in:login` : searchingValue;
    const sort = sortingValue ? `&sort=${sortingValue}` : '';
    const order = ascendingOrder ? '&order=asc' : '';

    return `https://api.github.com/search/users?q=type:user${search}${sort}${order}&access_token=${GITHUB_CREDENTIALS.OAUTH_TOKEN}&page=${page + 1}`;
  }

  handleChangePage = (event, page) => {
    if (page < 0) return;

    this.setState({ page });
    this.fetchUsers(page);
  }

  render() {
    const { users } = this.props;
    const { totalPageCount, usersPerPage, page } = this.state;

    return (
      <div>
        <UsersFilter />
        <UsersTable
          users={users}
          onChangePage={this.handleChangePage}
          totalPageCount={totalPageCount}
          usersPerPage={usersPerPage}
          page={page}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Users);
