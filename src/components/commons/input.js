// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { SelectInput as Select } from './selectInput';

export class Input extends Component {
  render() {
    const {
      name,
      value,
      inputClass,
      type,
      labelName,
      labelClass,
      placeholder,
      onChange,
      options
    } = this.props;

    return (
      <div>
        <label htmlFor={name} className={labelClass}>
          {labelName}
        </label>
        <div>
        {type === 'select' ? (
          <Select
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            name={name}
            className={inputClass}
          />
        )
          : (
            <input
            type={type}
            className={inputClass}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          )
          }
      </div>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string
};

Input.defaultProps = {
  value: 'text',
  type: 'text',
  labelClass: 'input1',
  placeholder: ''
};

export default Input;
