/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';

/*
 * Local import
 */
import Reaction from 'src/components/Reactions/Reaction';
/*
 * Component
 */
const Reactions = ({ reactions }) => (
  <div className="reactions">
    {
      reactions.map(reaction => (
        <Reaction
          key={reaction.name}
          smiley={reaction.name}
          userList={reaction.users}
        />
      ))
    }
  </div>
);
Reactions.propTypes = {
  reactions: PropTypes.array.isRequired,
};
export default Reactions;
