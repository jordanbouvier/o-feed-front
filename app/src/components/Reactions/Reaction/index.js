/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
/*
 * Component
 */
const Reaction = ({ smiley, userList }) => (
  <span className="reaction">
    <Emoji
      emoji={smiley}
      size={20}
      fallback={(emoji, props) => (
        <Emoji emoji=":question:" size={20} />
      )}
    />
    <span className="reaction-count">{userList.length}</span>
    <span className="reaction-users-list">
      {
        userList.map(user => (
          user.display_name + " "
        ))
      } reacted with :{ smiley }:
    </span>
  </span>
);
Reaction.propTypes = {
  smiley: PropTypes.string.isRequired,
  //userList: PropTypes.array.isRequired,
};
export default Reaction;
