import React, { Component } from 'react';

// import subcomponent(s)
import UsersList from './Users_List';

// import data
import userdata from '../data/UserData';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTriggered: false,
      userTriggeredAt: null,
      userQuery: '',
      value: '',
      matchedUsers: []
    };

    // Scope data to component
    this.userdata = userdata;

    // Scope functions to component
    this.resetState = this.resetState.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleUsernameTrigger = this.handleUsernameTrigger.bind(this);
    this.findUsers = this.findUsers.bind(this);
  }

  resetState() {
    // Reset username-search related state to defaults
    this.setState({
      userTriggered: false,
      userTriggeredAt: null,
      userQuery: '',
      matchedUsers: []
    });
  }

  handleUsernameTrigger(e) {
    // Ensure that the userTriggered event is not already true
    // Ensure that the @ key has been pressed (equivalent to keycode 50 + shift)
    if (!this.state.userTriggered && e.which === 50 && e.shiftKey === true) {
      // Update state so the username dropdown can't be opened multiple times
      this.setState(
        {
          userTriggered: true,
          userTriggeredAt: e.target.selectionStart,
          value: e.target.value,
          userQuery: e.target.value.substr(
            e.target.selectionStart,
            e.target.value.length + 1
          )
        },
        this.findUsers(this.state.userQuery, this.userdata)
      );
    }

    // ESC or spacebar to end search
    if (e.which === 32 || e.which === 27) {
      return this.resetState();
    }
  }

  handleTyping(e) {
    if (this.state.userTriggered && this.state.userTriggeredAt) {
      this.setState(
        {
          value: e.target.value,
          userQuery: e.target.value.substr(
            this.state.userTriggeredAt,
            this.state.value.length + 1
          )
        },
        this.findUsers(this.state.userQuery, this.userdata)
      );
    } else {
      this.setState({
        value: e.target.value
      });
    }
  }

  findUsers(query, users) {
    const rgx = query.length > 0 ? new RegExp(query, 'gi') : this.resetState;
    const matchedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].username.match(rgx)) {
        matchedUsers.push(users[i]);
      }
    }

    this.setState({
      matchedUsers: matchedUsers
    });
  }

  render() {
    // pass relevant/matched data to list component to compose the list
    const matchedUsers =
      this.state.matchedUsers.length > 0 ? (
        <UsersList users={this.state.matchedUsers} />
      ) : (
        ''
      );

    return (
      <form className="comment-box">
        <textarea
          className="comment-box__textarea"
          onKeyUp={this.handleUsernameTrigger}
          value={this.state.value}
          onChange={this.handleTyping}
          autoFocus={true}
          rows={5}
        />
        {matchedUsers}
        <input
          value="comment"
          type="submit"
          className="comment-box__submit-button"
        />
      </form>
    );
  }
}

export default CommentBox;
