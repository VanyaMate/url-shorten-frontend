import { DomainUrl, isDomainUrl } from '@vanyamate/url-shorten';
import { isArray } from '@vanyamate/types-kit';


export const getUrlsAction = async function (): Promise<Array<DomainUrl>> {
    return fetch(`${ __API__ }/api/v1/url-shorten`)
        .then((response) => response.json())
        .then((response) => {
            if (isArray(response, isDomainUrl)) {
                return response;
            }

            throw new Error(`Ошибка получения списка URL-ов. ${ response }`);
        });
};