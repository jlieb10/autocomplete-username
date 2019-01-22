import React, { Component } from 'react';
import UserCard from './User_Card';

class UsersList extends Component {
  render() {
    // map users into individual user cards
    const users = this.props.users.map(user => (
      <UserCard key={user.username} {...user} />
    ));

    return (
      <div className="users-list">
        <span className="users-list__header">select user below</span>
        <span className="users-list__dialog">
          press <code>esc</code> to close
        </span>
        <ul className="users-list__list">{users}</ul>
      </div>
    );
  }
}

export default UsersList;
