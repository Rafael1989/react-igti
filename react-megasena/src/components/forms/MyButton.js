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
 * O componente Button faz parte do package Material UI,
 * que leva o Material Design do Google ao React.
 */
import { Button } from '@material-ui/core';

/** Exemplo de componente "puro",
 * pois não guarda estado.
 *
 * Uma boa prática no React é manter
 * os seus componentes sempre puros,
 * deixando o estado para o componente
 * Pai (App).
 */
export const MyButton = ({ title, onClick, disabled }) => {
  return (
    <Button
      style={{ marginRight: '10px' }}
      color="primary"
      variant="raised"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

/**
 * Aqui definimos valores
 * default para cada prop
 */
MyButton.defaultProps = {
  title: '?',
  onClick: () => null,
  disabled: false
};

/**
 * Aqui definimos os tipos
 * de cada prop.
 */
MyButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
