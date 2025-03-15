import {
    DomainUrlAnalytics,
    isDomainUrlAnalytics,
} from '@vanyamate/url-shorten';


export const getUrlAnalyticsAction = async function (url: string): Promise<DomainUrlAnalytics> {
    return fetch(`${ __API__ }/api/v1/url-shorten/info/${ url }`)
        .then((response) => response.json())
        .then((response) => {
            if (isDomainUrlAnalytics(response)) {
                return response;
            }

            throw new Error(`Ошибка получения аналитики URL-а. ${ response }`);
        });
};