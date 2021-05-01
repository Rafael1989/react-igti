import React from 'react';

/**
 * Uma boa prática para criar componentes é
 * utilizar PropTypes. Isso facilita o trabalho
 * do desenvolvedor que irá utilizar o componente.
 *
 * O VSCode, por exemplo, utiliza as PropTypes para
 * mostrar ao desenvolvedor quais props ele pode
 * utilizar com o componente, por exemplo.
 *
 */
import PropTypes from 'prop-types';

/**
 * O componente TextField faz parte do package Material UI,
 * que leva o Material Design do Google ao React.
 */
import { TextField } from '@material-ui/core';

export const MyInputNumberLottery = ({
  autoFocus,
  error,
  defaultValue,
  label,
  onChange,
  max,
  min
}) => (
  <TextField
    error={error}
    autoFocus={autoFocus}
    defaultValue={defaultValue}
    id="name"
    InputProps={{ inputProps: { min, max } }}
    label={label}
    margin="dense"
    onChange={onChange}
    style={{ marginRight: '20px' }}
    type="number"
  />
);

/**
 * Aqui definimos valores
 * default para cada prop
 */
MyInputNumberLottery.defaultProps = {
  autoFocus: false,
  defaultValue: 30,
  error: false,
  label: '?',
  max: 60,
  min: 1,
  onChange: () => null
};

/**
 * Aqui definimos os tipos
 * de cada prop.
 */
MyInputNumberLottery.propTypes = {
  autoFocus: PropTypes.bool,
  error: PropTypes.bool,
  defaultValue: PropTypes.number,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
