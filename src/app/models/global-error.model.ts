import { combine } from '@vanyamate/sec';
import { urlAnalyticsError } from './url-analytics.model.ts';
import { urlError } from './url-shorten.model.ts';


export const globalErrorModel = combine(
    [ urlAnalyticsError, urlError ],
    (...stores) => stores.reduce((acc, store) => acc.concat(store.get()), [] as Array<string>),
);