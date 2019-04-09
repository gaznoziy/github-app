import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import UserInfo from './UserInfo';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class UsersTablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleBackButtonClick}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </div>
    );
  }
}

UsersTablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  UsersTablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '500px',
  },
  table: {
    minWidth: 100,
  },
  avatar: {
    float: 'right'
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UsersTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedUser: undefined
    };
  }

  handleChangePage = (event, page) => {
    this.props.onChangePage(event, page);
  };

  handleUserClicked = (user) => {
    window.scrollTo(0, 0);
    this.setState({ selectedUser: user });
  }

  unselectUser = () => {
    this.setState({ selectedUser: undefined });
  }

  getUserInfo = () => {
    if (this.state.selectedUser)
      return <UserInfo
        user={this.state.selectedUser}
        onUserInfoClose={this.unselectUser} />;
  }

  render() {
    const { classes, users, totalPageCount, usersPerPage, page } = this.props;

    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <div style={{float: 'left', width: '28%'}}>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Login</TableCell>
                    <TableCell align="right">Avatar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user=> (
                    <TableRow
                      key={user.id}
                      hover
                      onClick={event => this.handleUserClicked(user) }
                      style={{cursor: 'pointer'}}>
                      <TableCell component="th" scope="row">{user.id}</TableCell>
                      <TableCell>{user.login}</TableCell>
                      <TableCell align="right">
                        <Avatar src={user.avatar_url} className={classes.avatar} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[]}
                      colSpan={3}
                      count={totalPageCount}
                      rowsPerPage={usersPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
        </div>
        <div style={{ marginTop: '30px'}}>
        { this.getUserInfo() }
        </div>
      </div>
    );
  }
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(UsersTable));
