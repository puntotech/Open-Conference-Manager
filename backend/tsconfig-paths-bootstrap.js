const tsConfigPaths = require('tsconfig-paths');

const paths = require('./tsconfig.json').compilerOptions.paths;

const baseUrl = './';

tsConfigPaths.register({
  baseUrl,
  paths: Object.fromEntries(
    Object.entries(paths).map(([alias, path]) => [alias, path.map((name) => name.replace('.ts', '.js'))])
  ),
});
