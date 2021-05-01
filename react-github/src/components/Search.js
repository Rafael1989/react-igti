import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  width: '100%',
  marginBottom: '10px',
  fontSize: '1.2em',
};

export const Search = ({ disabled, handleSearch }) => (
  <input
    autoFocus
    style={inputStyle}
    disabled={disabled}
    type="search"
    placeholder="Usuário do Github..."
    onKeyUp={handleSearch}
  />
);

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
