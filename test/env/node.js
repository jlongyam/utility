import env from '../../src/env.js';

let envs = Object.getOwnPropertyNames(env);

envs.forEach((key) => {
  console.log('env.' + key + ': ' + '{' + typeof env[key] + '} ' + env[key]);
});
