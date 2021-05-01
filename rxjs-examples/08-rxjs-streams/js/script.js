'use strict';

import { Streams } from './Streams.js';

/**
 * Boa prática para garantir que qualquer
 * evento será utilizado somente após o
 * total carregamento da página.
 */
window.addEventListener('load', () => new Streams());
