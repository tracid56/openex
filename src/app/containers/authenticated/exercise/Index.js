import React, {Component, PropTypes} from 'react'
import createImmutableSelector from '../../../utils/ImmutableSelect'
import {connect} from 'react-redux'
import {fetchUsers} from '../../../actions/User'
import CircularProgress from 'material-ui/CircularProgress'
import {fromJS} from 'immutable';
import R from 'ramda'

class Index extends Component {
  componentDidMount() {
    console.log("=== Home Index componentDidMount()===")
    this.props.fetchUsers();
  }

  render() {
    console.log("=== Index render() ===")
    let loading;
    if (this.props.loading) {
      loading = <CircularProgress />
    }

    return (
      <div>
        { loading }
        {this.props.users.toList().map(user => {
          return (
            <div key={user.get('user_id')}>User : {user.get('user_firstname')}</div>
          )
        })}
      </div>
    );
  }
}

Index.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  fetchUsers: PropTypes.func.isRequired
}

//Users selector extract only the fields use to render the Home Page.
const usersSelector = state => {
  const users = state.application.getIn(['entities', 'users']).toJS()
  var fields = R.compose(R.dissoc('user_email'), R.dissoc('user_groups'), R.dissoc('user_lastname'));
  return fromJS(R.map(fields, users))
}
const cleanedUsers = createImmutableSelector(usersSelector, users => users)

const select = (state) => {
  return {
    users: cleanedUsers(state),
    loading: state.home.get('loading') //Don't need a selector. Each change will trigger a refresh
  }
}

export default connect(select, {fetchUsers})(Index);