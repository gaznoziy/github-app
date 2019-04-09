import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      reposCount: 0
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleGoToProfile = (url) => {
    window.open(
      url,
      '_blank'
    );
  }

  handleClose = event => {
    this.props.onUserInfoClose(event);
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={user.avatar_url} className={classes.avatar}>
            </Avatar>
          }
          action={
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          }
          title={user.login}
          subheader={`ID: ${user.id}`}
        />
        <CardContent>
          <p>Role: {user.type}</p>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Go to profile"
            onClick={event => this.handleGoToProfile(user.html_url)}>
            <LinkIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
