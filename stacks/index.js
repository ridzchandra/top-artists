import { AuthStack } from './AuthStack';
import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';
import { FrontendStack } from './FrontendStack';

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    // This will be the root for the paths you mention in ApiStack for each handler.
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });

  app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
}
