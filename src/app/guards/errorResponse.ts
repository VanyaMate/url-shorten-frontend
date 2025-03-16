import {
    type TypeGuard,
    isObject,
    isString,
    isNumber,
} from '@vanyamate/types-kit';


export type ErrorResponse = {
    message: string;
    error: string;
    statusCode: number;
}

export const isErrorResponse: TypeGuard<ErrorResponse> = function (data): data is ErrorResponse {
    return (
        isObject(data) &&
        isString(data['message']) &&
        isString(data['error']) &&
        isNumber(data['statusCode'])
    );
};