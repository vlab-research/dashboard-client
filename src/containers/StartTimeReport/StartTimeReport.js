import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from '@cubejs-client/react';

import { Spinner, Histogram, IntervalSelector } from '../../components';
import { computeHistogramData } from './chartUtil';
import './StartTimeReport.css';

const renderHistogram = (Component, interval) => ({ resultSet, error }) => {
  if (error) console.error(error); // eslint-disable-line no-console
  return (
    (resultSet && (
      <Component
        resultSet={computeHistogramData(resultSet, interval)}
        barKey="Users"
        xAxisKey="time"
      />
    )) || <Spinner />
  );
};

const StartTimeHistogram = ({ formids, cubejs }) => {
  const stepIntervals = {
    '30 mins': 30,
    '1 hour': 60,
    '3 hours': 180,
  };

  const [activeInterval, setActiveInterval] = useState('1 hour');

  return (
    <div className="chart-container">
      <div className="info-container">
        <h3 className="chart-title">Users count chat start time</h3>
        <div className="selector-container">
          <div className="selector-title">Interval</div>
          <IntervalSelector
            stepIntervals={stepIntervals}
            activeInterval={activeInterval}
            handleChange={setActiveInterval}
          />
        </div>
      </div>
      <div className="histogram-container">
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
                values: formids,
              },
            ],
          }}
          cubejsApi={cubejs}
          render={renderHistogram(Histogram, stepIntervals[activeInterval])}
        />
      </div>
    </div>
  );
};

StartTimeHistogram.propTypes = {
  formids: PropTypes.arrayOf(PropTypes.string).isRequired,
  cubejs: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StartTimeHistogram;
