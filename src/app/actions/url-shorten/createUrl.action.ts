import {
    DomainUrl,
    DomainUrlCreateData,
    isDomainUrl,
} from '@vanyamate/url-shorten';
import { request } from '../../fetch/request.ts';


export const createUrlAction = async function (createData: DomainUrlCreateData): Promise<DomainUrl> {
    return request(
        `${ __API__ }/api/v1/url-shorten`,
        {
            method : 'POST',
            body   : JSON.stringify(createData),
            headers: {
                'Content-Type': 'application/json',
            },
        },
        isDomainUrl,
        `Ошибка создания ссылки`,
    );
};