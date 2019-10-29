import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from '@cubejs-client/react';

import { Spinner, LineChart, IntervalSelector } from '../../components';
import { computeHistogramData } from './chartUtil';
import './JoinTimeReport.css';

const renderHistogram = (Component, interval) => ({ resultSet, error }) => {
  if (error) console.error(error); // eslint-disable-line no-console
  return (
    (resultSet && (
      <Component
        resultSet={computeHistogramData(resultSet, interval)}
        barKey="users"
        xAxisKey="date"
      />
    )) || <Spinner />
  );
};

const JoinTimeReport = ({ formid, cubejs }) => {
  const stepIntervals = {
    days: 0,
    months: 1,
  };

  const [activeInterval, setActiveInterval] = useState('days');

  return (
    <div className="chart_container">
      <div className="info_container">
        <h3 className="chart_title">Users joining time</h3>
        <div className="selector_container">
          <div className="selector_title">Interval</div>
          <IntervalSelector
            stepIntervals={stepIntervals}
            activeInterval={activeInterval}
            handleChange={setActiveInterval}
          />
        </div>
      </div>
      <div className="histogram_container">
        <QueryRenderer
          query={{
            measures: ['Responses.startTime'],
            timeDimensions: [
              {
                dimension: 'Responses.timestamp',
              },
            ],
            dimensions: ['Responses.userid'],
            filters: [
              {
                dimension: 'Responses.formid',
                operator: 'equals',
                values: [formid],
              },
            ],
          }}
          cubejsApi={cubejs}
          render={renderHistogram(LineChart, stepIntervals[activeInterval])}
        />
      </div>
    </div>
  );
};

JoinTimeReport.propTypes = {
  formid: PropTypes.string.isRequired,
  cubejs: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default JoinTimeReport;
