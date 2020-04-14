// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../../assets/css/spinner.scss';

/**
 * Reusable Spinner Component
 *
 * @returns {JSX}
 */
const Spinner = (prop) => (
  <div className="centered">
    <div className={prop.size === 'small' ? 'spinner small' : 'spinner'} />
  </div>
);

Spinner.defaultProps = {
  size: ''
};

export default Spinner;
