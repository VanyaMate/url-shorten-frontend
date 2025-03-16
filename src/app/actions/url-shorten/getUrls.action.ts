import { DomainUrl, isDomainUrl } from '@vanyamate/url-shorten';
import { isArray } from '@vanyamate/types-kit';
import { request } from '../../fetch/request.ts';


export const getUrlsAction = async function (): Promise<Array<DomainUrl>> {
    return request(`${ __API__ }/api/v1/url-shorten`, undefined, (data) => isArray(data, isDomainUrl), `Ошибка получения списка ссылок`);
};