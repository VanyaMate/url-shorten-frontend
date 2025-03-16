import { TypeGuard } from '@vanyamate/types-kit';
import { isErrorResponse } from '../guards/errorResponse.ts';


export const request = async function <Response> (input: RequestInfo, init?: RequestInit, guard?: TypeGuard<Response>, customError?: string): Promise<Response> {
    return fetch(input, init)
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            }

            throw await response.json();
        })
        .then((response) => {
            if (guard ? guard(response) : true) {
                return response;
            } else {
                throw new Error(`С сервера вернулись неверные данные`);
            }
        })
        .catch((error: unknown) => {
            if (isErrorResponse(error)) {
                throw new Error(error.message);
            }

            if (error instanceof Error) {
                throw error;
            }

            throw new Error(`${ customError ?? 'Ошибка' }. ${ JSON.stringify(error) }`);
        });
};