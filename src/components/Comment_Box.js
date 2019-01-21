import React, { Component } from 'react';
import CommentTriggerHandler from './Comment_Trigger_Handler';

class CommentBox extends Component {
  render() {
    return (
      <div className="CommentBox">
        <CommentTriggerHandler />
      </div>
    );
  }
}

export default CommentBox;
