import { request } from '../../fetch/request.ts';


export const removeUrlAction = async function (alias: string): Promise<void> {
    return request(`${ __API__ }/api/v1/url-shorten/${ __API__ }/${ alias }`, { method: 'DELETE' }, undefined, 'Ошибка удаления короткой ссылки');
};