import React from 'react';
import PropTypes from 'prop-types';

import './user-info.css';

/**
 * UserInfo também é um stateless component
 *
 * @param {Object} userInfo Dados do usuário
 */
export const UserInfo = ({ userInfo }) => {
  return !!userInfo.login ? _getUserRender(userInfo) : null;
};

const _getUserRender = userInfo => {
  return (
    <div className="user-info">
      <img src={userInfo.avatar} alt={userInfo.name} className="avatar" />

      <div>
        <h2>
          {userInfo.name}&nbsp;
          <a
            className="full-name-link"
            href={`https://github.com/${userInfo.login}`}
            target="_blank"
            rel="noopener noreferrer">
            {`(${userInfo.login})`}
          </a>
        </h2>

        <ul className="user-data">
          <li>Seguidores: {userInfo.followers}</li>
          <li>Seguindo: {userInfo.following}</li>
        </ul>
      </div>
    </div>
  );
};

UserInfo.defaultProps = {
  avatar: '',
  followers: 0,
  following: 0,
  login: 'nao_encontrado',
  name: 'Não encontrado',
  repos: [],
};

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
  }),
};
