/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaArrow from 'react-icons/lib/fa/arrow-right';

/*
 * Component
 */
const RepliesCounter = ({ repliesCount, onClick }) => (
  <div className="replies-count" onClick={onClick}>
    Voir les {repliesCount} réponses <FaArrow />
  </div>
);
RepliesCounter.propTypes = {
  repliesCount: PropTypes.number.isRequired,
};
export default RepliesCounter;
