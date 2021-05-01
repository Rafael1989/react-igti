import React from 'react';
import PropTypes from 'prop-types';

import { Search } from '../Search';
import { UserInfo } from '../user-info/UserInfo';

import './home.css';

/**
 * Perceba que Home é um stateless
 * component, ou seja, não guarda
 * estado. Os dados são todos recebidos
 * via props.
 *
 * Obs: as props podem ser recebidas como
 * um objeto (props) ou já definidas com seus
 * identificadores, como no exemplo abaixo.
 *
 * Assim, props.isFetchingData fica como somente
 * isFetchingData, por exemplo.
 *
 * @param {Object} props
 */
export const Home = ({ isFetchingData, handleSearch, userInfo }) => {
  return (
    <div>
      <Search disabled={isFetchingData} handleSearch={handleSearch} />
      {isFetchingData ? _renderSearching() : _renderPage(userInfo)}
    </div>
  );
};

const _renderSearching = () => {
  return <p className="message">Carregando...</p>;
};

const _renderPage = userInfo => {
  return (
    <div>
      {!!userInfo ? (
        <UserInfo userInfo={userInfo} />
      ) : (
        <p className="message">Informe um usuário válido do Github</p>
      )}
    </div>
  );
};

Home.defaultProps = {
  handleSearch: null,
  userInfo: {},
};

Home.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};
