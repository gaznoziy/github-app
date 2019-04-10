import React from 'react';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class UsersFilter extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      search: '',
      sort: '',
      ascendingSortChecked: false
    }
  }

  handleChange = name => event => {
    if (name === 'search') {
      this.props.setSearchingCriteria(event.target.value);
    } else if (name === 'sort') {
      this.props.setSortingCriteria(event.target.value);

      if (event.target.value === '') {
        this.setState({ ascendingSortChecked: false }, () => {
          this.props.setAscendingOrder(false);
        });
      }
    }

    this.setState({ [name]: event.target.value });
  }

  handleCheckboxChange = name => event => {
    if (name === 'ascendingSortChecked') {
      this.props.setAscendingOrder(event.target.checked);
    }

    this.setState({ [name]: event.target.checked });
  }

  render() {
    const { classes } = this.props;
    const sortTypeCheckbox = this.state.sort ? 
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.ascendingSortChecked}
            onChange={this.handleCheckboxChange('ascendingSortChecked')}
            value="ascendingSortChecked"
            color="primary"
          />
        }
        label="Ascending sort"
      /> : undefined;

    return (
      <div>
        <div>
          <TextField
            className={classes.textField}
            value={this.state.search}
            label="Search value"
            onChange={this.handleChange('search')}
            margin="normal"
          />
        </div>
        <div style={{marginLeft: '10px', width: '200px'}}>
          <InputLabel htmlFor="age-simple">Sorting</InputLabel>
          <Select
            style={{width: '200px'}}
            value={this.state.sort}
            onChange={this.handleChange('sort')}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'followers'}>Followers</MenuItem>
            <MenuItem value={'repositories'}>Repositories</MenuItem>
            <MenuItem value={'joined'}>Joined</MenuItem>
          </Select>
          { sortTypeCheckbox }
        </div>
      </div>);
  }
}

export default withStyles(styles)(UsersFilter);
