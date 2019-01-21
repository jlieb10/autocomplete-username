import React, { Component } from 'react';
import CommentBox from './Comment_Box';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Please type your comment below</h1>
        <h2>To tag a user, use the @ key</h2>
        <CommentBox />
      </div>
    );
  }
}

export default App;
