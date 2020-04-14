// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import Spinner from './spinner';

/**
 * Reusable button component for performing
 * actions and canceling
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const Button = (props) => (props.isLoading ? (
    <Spinner size="small" />
) : (
    <div>
      <button className={props.buttonClass} onClick={props.onClickSubmit}>
        {props.ButtonText}
      </button>
    </div>
));

Button.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  ButtonText: PropTypes.string,
  ButtonClass: PropTypes.string,
  isLoading: PropTypes.bool,
  onClickSubmit: PropTypes.func
};

Button.defaultProps = {
  ButtonText: 'LOGIN',
  ButtonClass: '',
  isLoading: false,
  onClickSubmit: PropTypes.func
};

export default Button;
