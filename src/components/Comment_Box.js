import React, { Component } from 'react';
import userdata from '../data/UserData';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTriggered: false,
      userTriggeredAt: null,
      userQuery: '',
      value: ''
    };

    this.userdata = userdata;
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
      userQuery: ''
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
    window.data = users;
    const rgx = new RegExp(query, 'g');
    const matchedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].username.match(rgx)) {
        matchedUsers.push(users[i]);
        console.log(matchedUsers);
      }
    }
  }

  render() {
    return (
      <textarea
        className="CommentBox"
        onKeyUp={this.handleUsernameTrigger}
        value={this.state.value}
        onChange={this.handleTyping}
      />
    );
  }
}

export default CommentBox;
