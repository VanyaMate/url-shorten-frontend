import { effect, store } from '@vanyamate/sec';
import { createUrlAction } from '../actions/url-shorten/createUrl.action.ts';
import { getUrlsAction } from '../actions/url-shorten/getUrls.action.ts';
import { DomainUrl } from '@vanyamate/url-shorten';
import { isString } from '@vanyamate/types-kit';
import { removeUrlAction } from '../actions/url-shorten/removeUrl.action.ts';


export const createUrlEffect = effect(createUrlAction);
export const getUrlsEffect   = effect(getUrlsAction);
export const removeUrlEffect = effect(removeUrlAction);

export const urlsList = store<Array<DomainUrl>>([])
    .on(getUrlsEffect, 'onSuccess', (_, { result }) => result!)
    .on(createUrlEffect, 'onSuccess', (state, { result }) => state.concat(result!))
    .on(removeUrlEffect, 'onSuccess', (state, { args }) => state.filter((url) => url.id !== args[0]));

export const urlsGetListPending = store<boolean>(false)
    .on(getUrlsEffect, 'onBefore', () => true)
    .on(getUrlsEffect, 'onFinally', () => false);

export const urlCreatePending = store<boolean>(false)
    .on(createUrlEffect, 'onBefore', () => true)
    .on(createUrlEffect, 'onFinally', () => false);

export const urlGettingError = store<string>('')
    .on(getUrlsEffect, 'onBefore', () => '')
    .on(
        getUrlsEffect,
        'onError',
        (_, { error }) => isString(error)
                          ? error : error instanceof Error
                                    ? error.message
                                    : JSON.stringify(error),
    );

export const urlCreatingError = store<string>('')
    .on(createUrlEffect, 'onBefore', () => '')
    .on(
        createUrlEffect,
        'onError',
        (_, { error }) => isString(error)
                          ? error : error instanceof Error
                                    ? error.message
                                    : JSON.stringify(error),
    );