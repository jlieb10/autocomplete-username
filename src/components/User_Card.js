import React, { Component, ReactDOM } from 'react';
import CommentBox from './Comment_Box';

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
    const commentBox = ReactDOM.findDOMNode(<CommentBox />);
    console.log(commentBox.props);
  }

  render() {
    const { username, avatar_url, name } = this.props;

    return (
      <li className="user-card">
        <div className="user-card__avatar-container">
          <img src={avatar_url} alt={'avatar for ' + username} />
        </div>
        <div className="user-card__text-container">
          <span className="user-card__name">{name}</span>
          <span className="user-card__username">@{username}</span>
        </div>
      </li>
    );
  }
}

export default UserCard;
