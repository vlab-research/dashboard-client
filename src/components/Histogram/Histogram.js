import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

import './Histogram.css';

const renderTooltip = ({ active, label, payload }) => {
  const { name } = active && payload[0];
  return (
    active && (
      <div className="custom_tooltip">
        <p className="custom_tooltip_label">{label}</p>
        <p className="custom_tooltip_name">
          {`${name} : `}
          <span className="custom_tooltip_value">{payload[0].payload[name]}</span>
        </p>
      </div>
    )
  );
};

const Histogram = ({ resultSet, xAxisKey, barKey }) => (resultSet.length ? (
  <ResponsiveContainer>
    <BarChart data={resultSet}>
      <CartesianGrid vertical={false} stroke="#f5f5f5" />
      <YAxis
        width={40}
        allowDecimals={false}
        domain={[0, 'dataMax']}
        label={{ value: barKey, angle: -90, position: 'insideLeft' }}
      />
      <XAxis dataKey={xAxisKey} />
      <Tooltip content={renderTooltip} />
      <Bar dataKey={barKey} fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
) : (
  <h1>No data available for this form!</h1>
));

Histogram.propTypes = {
  barKey: PropTypes.string.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  resultSet: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Histogram;
