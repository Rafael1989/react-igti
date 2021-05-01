import React from 'react';

import './number.css';

export const Number = ({ value, picked }) => (
  <div className={`number ${!!picked ? 'picked' : 'not-picked'}`}>{value}</div>
);
