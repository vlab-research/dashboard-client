/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { Survey } from '../../containers/Surveys/Surveys';
import ChooseFormId from './ChooseFormId';
import SetFormTitle from './SetFormTitle';
import Actions from './Actions';

import typeformAuth from '../../services/Typeform';

const { createOrAuthorize, createSurvey } = typeformAuth;

const TypeformCreateForm = ({ history, match }) => {
  const { setSurveys } = useContext(Survey);
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState({ title: '', id: '' });
  const [state, setState] = useState(1);

  useEffect(() => {
    createOrAuthorize()
      .then(({ items }) => items && setForms(items))
      .catch(e => console.error(e)); //eslint-disable-line
  }, []);

  const closeModal = () => history.push(`/${match.path.split('/')[1]}`);

  const handleSubmit = async () => {
    const { id, title } = selectedForm;
    const survey = id && (await createSurvey({ id, title, history, match }));
    setSurveys(surveys => [...survey, ...surveys]);
  };

  const {
    MainTitle,
    ComponentMain,
    secondaryAction,
    primaryAction,
    secondaryLabel,
    primaryLabel,
  } = currentState({ state, handleSubmit, setState, id: selectedForm.id, closeModal });

  const Header = <h1 className="modal_title">{MainTitle}</h1>;

  const Footer = (
    <div className="modal_footer">
      <div className="selected">
        <div className="selected_info">
          selected:
          <b>{` ${selectedForm.id}`}</b>
        </div>
        <div className="selected_info">
          title:
          <b>{` ${selectedForm.title}`}</b>
        </div>
      </div>
      <Actions {...{ secondaryAction, primaryAction, secondaryLabel, primaryLabel }} />
    </div>
  );

  return (
    <Modal visible title={Header} onCancel={closeModal} footer={Footer}>
      <ComponentMain {...{ forms, selectedForm, setSelectedForm, state }} />
    </Modal>
  );
};

const defaultState = {
  ComponentMain: null,
  secondaryAction: null,
  secondaryLabel: '',
  primaryAction: null,
  primaryLabel: '',
};

const currentState = ({ state, handleSubmit, setState, id, closeModal }) => {
  switch (state) {
    case 1:
      return {
        MainTitle: 'Choose Your Form',
        ComponentMain: ChooseFormId,
        secondaryAction: closeModal,
        secondaryLabel: 'Cancel',
        primaryAction: () => id && setState(2),
        primaryLabel: 'Choose',
      };
    case 2:
      return {
        MainTitle: 'Select your title',
        ComponentMain: SetFormTitle,
        secondaryAction: () => setState(1),
        secondaryLabel: 'Back',
        primaryAction: handleSubmit,
        primaryLabel: 'Create',
      };
    default:
      return defaultState;
  }
};

TypeformCreateForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TypeformCreateForm;
