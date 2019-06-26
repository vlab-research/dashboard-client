import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';

import './LoginScreen.css';

const LoginScreen = ({ auth }) => {
  const isAuthenticated = auth.isAuthenticated();
  return (
    <div className="login_container">
      <Card>
        <div className="card_container">
          <h1 className="login_title">Virtual Lab Dashboard</h1>
          <Button
            className="login_button"
            onClick={isAuthenticated ? auth.logout : auth.login}
            type="primary"
            size="large"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

LoginScreen.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LoginScreen;
