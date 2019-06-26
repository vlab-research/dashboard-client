import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Actions = ({ secondaryAction, primaryAction, secondaryLabel, primaryLabel }) => {
  return (
    <div className="actionsb_btns">
      <Button className="modal_button" type="normal" size="large" onClick={secondaryAction}>
        {secondaryLabel}
      </Button>
      <Button className="modal_button" type="primary" size="large" onClick={primaryAction}>
        {primaryLabel}
      </Button>
    </div>
  );
};

Actions.propTypes = {
  secondaryAction: PropTypes.func.isRequired,
  primaryAction: PropTypes.func.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  primaryLabel: PropTypes.string.isRequired,
};

export default Actions;
