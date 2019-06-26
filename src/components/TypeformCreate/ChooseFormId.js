/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Spinner } from '..';

const ChooseFormId = ({ forms, selectedForm, setSelectedForm }) => {
  return forms.length ? (
    <>
      <div className="modal_list">
        {forms.map(item => (
          <div
            className={`list_item ${item.id === selectedForm.id ? 'list_item--active' : ''}`}
            onClick={() => setSelectedForm(item)}
            key={item.id}
          >
            <div className="list_item_title">
              {item.title}
              <div className="list_item_date">
                {`${moment(item.last_updated_at).format('Do MMM YY')}`}
              </div>
            </div>
            <div className="list_item_id">{item.id}</div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Spinner />
  );
};

ChooseFormId.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedForm: PropTypes.objectOf(PropTypes.any).isRequired,
  setSelectedForm: PropTypes.func.isRequired,
};

export default ChooseFormId;
