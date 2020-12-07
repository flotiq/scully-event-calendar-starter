import { ScullyConfig } from '@scullyio/scully';
import { environment } from './src/environments/environment';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-event-calendar-starter',
  outDir: './dist/static',
  routes: {
    '/event/:slug': {
      type: 'json',
      slug: {
        url: 'https://api.flotiq.com/api/v1/content/event?hydrate=1',
        property: 'slug',
        headers: {
          'X-AUTH-TOKEN': environment.flotiqApiKey
        },
        resultsHandler: rawData => rawData.data
      }
    },
  }
};
