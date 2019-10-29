import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from '@cubejs-client/react';

import { Spinner, Histogram, IntervalSelector } from '../../components';
import { computeHistogramData } from './chartUtil';
import './DurationReport.css';

const renderHistogram = (Component, interval) => ({ resultSet, error }) => {
  if (error) console.error(error); // eslint-disable-line no-console
  return (
    (resultSet && (
      <Component
        resultSet={computeHistogramData(resultSet, interval)}
        barKey="Users"
        xAxisKey="interval"
      />
    )) || <Spinner />
  );
};

const DurationHistogram = ({ formid, cubejs }) => {
  const stepIntervals = {
    '30 mins': 0.5,
    '1 hour': 1,
    '3 hours': 3,
  };

  const [activeInterval, setActiveInterval] = useState('3 hours');

  return (
    <div className="chart_container">
      <div className="info_container">
        <h3 className="chart_title">
          <abbr title="Duration per user"> Duration per user </abbr>
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
            measures: ['Responses.startTime', 'Responses.endTime'],
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

DurationHistogram.propTypes = {
  formid: PropTypes.string.isRequired,
  cubejs: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DurationHistogram;
