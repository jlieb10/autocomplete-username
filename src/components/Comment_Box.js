import React, { Component } from 'react';

// import subcomponent(s)
import UsersList from './Users_List';

// import data
import userdata from '../data/UserData';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      matchedUsers: []
    };

    // Scope data to component
    this.userdata = userdata;

    // Scope functions to component
    this.resetState = this.resetState.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // Look for '@' in text and trigger username query if present
    // If present, send substring (subtracting @) to user lookup
    if (this.state.value !== nextState.value) {
      const query = nextState.value.match(/@\w+/)
        ? nextState.value.match(/@\w+/)[0]
        : null;
      if (query) {
        this.findUsers(query.substr(1, query.length));
      } else {
        this.resetState();
      }
    }
  }

  resetState() {
    // Reset username-search related state to defaults
    this.setState({
      matchedUsers: []
    });
  }

  handleTyping(e) {
    // Update state while typing so input can be
    // scanned for username lookup trigger
    this.setState({
      value: e.target.value
    });
  }

  handleEscape(e) {
    // Reset matchedUsers list when user hits escape
    if (e.which === 27) {
      this.resetState();
    }
  }

  findUsers(query) {
    // Search usernames list for match against user query
    // Match can be at any part of a user name
    // eg: for username 'jliebeman,' the query 'lieb' would match
    const queryRgx = new RegExp(query, 'gi');
    const matchedUsers = [];

    for (let i = 0; i < this.userdata.length; i++) {
      if (this.userdata[i].username.match(queryRgx)) {
        matchedUsers.push(this.userdata[i]);
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
          value={this.state.value}
          onChange={this.handleTyping}
          onKeyDown={this.handleEscape}
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
