import React from 'react';

import { Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { LoginScreen, SurveyScreen, Surveys } from './containers'; //App
import Teams from './pages/Teams'
import { PrivateRoute, Spinner } from './components';
import { Auth, History } from './services';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    Auth.handleAuthentication();
  }
};

const Root = () => {
  return (
    <Router history={History}>
      <Layout style={{ height: '100vh' }}>
        <PrivateRoute exact path="/" component={Teams} auth={Auth} />
        <PrivateRoute path="/surveys" component={Surveys} auth={Auth} />
        <PrivateRoute path="/surveys/details/:formid" component={SurveyScreen} auth={Auth} />
        <Route exact path="/login" render={props => <LoginScreen {...props} auth={Auth} />} />
        <Route
          path="/auth"
          render={props => {
            handleAuthentication(props);
            return <Spinner {...props} />;
          }}
        />
      </Layout>
    </Router>
  );
};

export default Root;
