import React from 'react';
import {UsersFilter} from '../containers/users';
import UsersTable from './UsersTable';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const filters = this.getApiFilters();
    this.props.fetchUsers(page + 1, filters);
  }

  getApiFilters = () => {
    const { searchingValue, sortingValue, ascendingOrder } = this.state;
    const search = searchingValue ? ` ${searchingValue} in:login` : searchingValue;
    const sort = sortingValue ? `&sort=${sortingValue}` : '';
    const order = ascendingOrder ? '&order=asc' : '';

    return `${search}${sort}${order}`;
  }

  handleChangePage = (event, page) => {
    if (page < 0) return;

    this.setState({ page });
    this.fetchUsers(page);
  }

  render() {
    const { users, totalPageCount, usersPerPage } = this.props;
    const { page } = this.state;

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

export {Users};
