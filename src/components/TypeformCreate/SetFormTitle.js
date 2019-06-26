import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Input } from 'antd';

const SetFormTitle = ({ selectedForm, setSelectedForm }) => {
  const [title, setTitle] = useState(selectedForm.title);
  return (
    <>
      <Input
        className="title_input"
        value={title}
        onChange={({ target }) => {
          if (target.value.length < 50) {
            setTitle(target.value);
            setSelectedForm(state => ({ ...state, title: target.value }));
          }
        }}
      />
    </>
  );
};

SetFormTitle.propTypes = {
  selectedForm: PropTypes.objectOf(PropTypes.any).isRequired,
  setSelectedForm: PropTypes.func.isRequired,
};

export default SetFormTitle;
