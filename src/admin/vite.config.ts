import { mergeConfig, type UserConfig } from 'vite';
import getBuildID from '../scripts/generate-build-id';

export default (config: UserConfig) => {
  const buildID = getBuildID() ?? "[hash]";

  return mergeConfig(config, {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: `[name]-${buildID}.js`,
        }
      }
    }
  });
};
