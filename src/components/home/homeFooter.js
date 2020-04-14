// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import ROUTES from '../../utils/routes';
import '../../assets/css/index.scss';

const HomeFooter = (props) => (
    <div className={props.footerClass}>
    {props.page === 'login'
      ? <span>New to Olympia? <a href={ROUTES.register}>Get Started</a></span>
      : <a href={ROUTES.home}>Back to Login</a>
    }
        <br/>
        <span className={props.copyright}>
        Copyright @ {new Date().getFullYear()}.
        Olympia Inc. All rights reserved. Terms and Conditions Apply.
        </span>
    </div>

);

HomeFooter.protoType = {
  footerClass: PropTypes.string,
  page: PropTypes.string,
  copyright: PropTypes.string
};

HomeFooter.defaultProps = {
  footerClass: 'login-footer',
  page: 'login'
};

export default HomeFooter;
