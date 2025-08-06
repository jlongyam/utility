import env from '../../src/env/env.js';

let envs = Object.getOwnPropertyNames(env);

envs.forEach((key) => {
  self.postMessage('Worker  : env.' + key + ': ' + '{' + typeof env[key] + '} ' + env[key] + '\n');
});
