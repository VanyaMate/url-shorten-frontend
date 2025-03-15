import {
    DomainUrl,
    DomainUrlCreateData,
    isDomainUrl,
} from '@vanyamate/url-shorten';


export const createUrlAction = async function (createData: DomainUrlCreateData): Promise<DomainUrl> {
    return fetch(`${ __API__ }/api/v1/url-shorten`, {
        method : 'POST',
        body   : JSON.stringify(createData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((response) => {
            if (isDomainUrl(response)) {
                return response;
            }

            throw new Error(`Ошибка создания ссылки. ${ response }`);
        });
};