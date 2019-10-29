import AUTH_CONFIG from './Oauth-variables';
import ApiClient from '../api';

class Typeform {
  createOrAuthorize = () => ApiClient.fetcher({ path: '/typeform/form' }).then((res) => {
    if (res.status === 401) return this.typeformAuthorization();
    return res.json();
  });

  typeformAuthorization = () => {
    window.location = `${AUTH_CONFIG.typeformUrl}/oauth/authorize?client_id=${
      AUTH_CONFIG.clientID
    }&scope=${AUTH_CONFIG.scope.join(' ')}&redirect_uri=${encodeURIComponent(
      AUTH_CONFIG.redirect_uri,
    )}`;
  };

  handleAuthorization = ({ code, history, match }) => ApiClient.fetcher({ path: `/typeform/auth/${code}` }).then(() => {
    history.push(`/${match.path.split('/')[1]}/create`);
  });

  createSurvey = ({
    id, title, history, match,
  }) => ApiClient.fetcher({ method: 'POST', path: '/surveys', body: { formid: id, title } })
    .then(res => res.json())
    .then((survey) => {
      history.push(`/${match.path.split('/')[1]}`);
      return survey;
    });
}

export default new Typeform();
