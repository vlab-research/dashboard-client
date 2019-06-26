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

const StartTimeHistogram = ({ formid, cubejs }) => {
  const stepIntervals = {
    '30 mins': 30,
    '1 hour': 60,
    '3 hours': 180,
  };

  const [activeInterval, setActiveInterval] = useState('30 mins');

  return (
    <div className="chart_container">
      <div className="info_container">
        <h3 className="chart_title">
          <abbr title="Users count chat start time"> Users count chat start time </abbr>
        </h3>
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
          render={renderHistogram(Histogram, stepIntervals[activeInterval])}
        />
      </div>
    </div>
  );
};

StartTimeHistogram.propTypes = {
  formid: PropTypes.string.isRequired,
  cubejs: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StartTimeHistogram;
