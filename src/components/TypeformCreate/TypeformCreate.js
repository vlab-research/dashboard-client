import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { Typeform } from '../../services';
import './style.css';
import TypeformCreateForm from './TypeformCreateForm';

const { handleAuthorization } = Typeform;

const TypeformCreate = ({ match }) => {
  return (
    <div className="container">
      <Button className="create_button" type="primary" size="large">
        <Link to={`${match.path}/create`}>New Survey</Link>
      </Button>
      <Route path={`${match.path}/auth`} render={props => <TypeformCreateAuth {...props} />} />
      <Route path={`${match.path}/create`} render={props => <TypeformCreateForm {...props} />} />
    </div>
  );
};

const TypeformCreateAuth = ({ location, match, history }) => {
  const code = location.search && location.search.match(/([A-Z,0-9])\w+/)[0];
  if (!code) return <Redirect to={`/${match.path.split('/')[0]}`} />;
  handleAuthorization({ code, history, match });
  return <div> LOADING PAGE AUTH </div>;
};

TypeformCreate.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

TypeformCreateAuth.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TypeformCreate;
