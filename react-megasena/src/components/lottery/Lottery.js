import React from 'react';

import { Typography } from '@material-ui/core';

import { Number } from '../number/Number';
import './lottery.css';

const _renderNumbers = numbers =>
  numbers
    .sort((a, b) => a > b)
    .map((number, index) => <Number key={index} value={number} picked />);

const _renderNoContestYet = () => (
  <Typography variant="headline">Nenhum número sorteado</Typography>
);

export const Lottery = ({ numbers }) => (
  <div className="row">
    <h2 variant="headline">Sorteio:&nbsp;&nbsp;</h2>

    <div className="row">
      {!!numbers && numbers.length > 0
        ? _renderNumbers(numbers)
        : _renderNoContestYet()}
    </div>
  </div>
);
