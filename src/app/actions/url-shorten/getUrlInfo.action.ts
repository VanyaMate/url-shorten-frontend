import {
    DomainUrlInfo,
    isDomainUrlInfo,
} from '@vanyamate/url-shorten';
import { request } from '../../fetch/request.ts';


export const getUrlInfoAction = async function (url: string): Promise<DomainUrlInfo> {
    return request(
        `${ __API__ }/api/v1/url-shorten/info/${ url }`,
        undefined,
        isDomainUrlInfo,
        'Ошибка получения информации URL-а',
    );
};