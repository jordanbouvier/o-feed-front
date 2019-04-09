/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import Username from 'src/containers/User/Username';
import LazyLoad from 'react-lazyload';

/*
 * Local import
 */
import { getUsername } from 'src/utils/userUtils';

const UserSmall = ({
  name,
  picture,
  id,
}) => (
  <LazyLoad height={25} offset={[50, 50]} once overflow>
    <div className="user-small">
      <img className="user-small-picture" src={picture} alt={name} />
      <span className="user-small-name">
        <Username id={id} name={name} />
      </span>
    </div>
  </LazyLoad>
);
UserSmall.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  id: PropTypes.string.isRequired,
};
UserSmall.defaultProps = {
  picture: '',
};
export default UserSmall;
