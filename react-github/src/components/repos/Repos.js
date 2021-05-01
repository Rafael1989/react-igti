import React from 'react';
import PropTypes from 'prop-types';

import './repos.css';

export const Repos = ({ repos, isFetchingData, type }) => (
  <div className="repos">
    <ul>
      {_hasRepos(repos, isFetchingData)
        ? _getReposList(repos)
        : _noReposFeedback(isFetchingData, type)}
    </ul>
  </div>
);

const _hasRepos = (repos, isFetchingData) =>
  !isFetchingData && !!repos && repos.length > 0;

const _getReposList = repos =>
  repos.map(repo => (
    <li key={repo.url}>
      <a href={repo.url} target="_blank">
        {repo.name}
      </a>
    </li>
  ));

const _noReposFeedback = (isFetchingData, type) => (
  <p>
    {isFetchingData
      ? `Carregando ${
          type === 'starred' ? 'repositórios favoritos' : 'repositórios'
        }...`
      : `Nenhum repositório ${
          type === 'starred' ? 'favorito' : ''
        } encontrado!`}
  </p>
);

Repos.defaultProps = {
  repos: [],
  type: 'repos',
};

Repos.propTypes = {
  repos: PropTypes.array,
  type: PropTypes.string,
};
