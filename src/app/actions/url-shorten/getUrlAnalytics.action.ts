import {
    DomainUrlAnalytics,
    isDomainUrlAnalytics,
} from '@vanyamate/url-shorten';
import { request } from '../../fetch/request.ts';


export const getUrlAnalyticsAction = async function (url: string): Promise<DomainUrlAnalytics> {
    return request(
        `${ __API__ }/api/v1/url-shorten/analytics/${ url }`,
        undefined,
        isDomainUrlAnalytics,
        'Ошибка получения аналитики URL-а',
    );
};