import { effect, store } from '@vanyamate/sec';
import { createUrlAction } from '../actions/url-shorten/createUrl.action.ts';
import { getUrlsAction } from '../actions/url-shorten/getUrls.action.ts';
import { DomainUrl } from '@vanyamate/url-shorten';
import { isString } from '@vanyamate/types-kit';


export const createUrlEffect = effect(createUrlAction);
export const getUrlsEffect   = effect(getUrlsAction);

export const urlsList = store<Array<DomainUrl>>([])
    .on(getUrlsEffect, 'onSuccess', (_, { result }) => result!)
    .on(createUrlEffect, 'onSuccess', (state, { result }) => state.concat(result!));

export const urlsGetListPending = store<boolean>(false)
    .on(getUrlsEffect, 'onBefore', () => true)
    .on(getUrlsEffect, 'onFinally', () => false);

export const urlCreatePending = store<boolean>(false)
    .on(createUrlEffect, 'onBefore', () => true)
    .on(createUrlEffect, 'onFinally', () => false);

export const urlError = store<Array<string>>([])
    .on(
        getUrlsEffect,
        'onError',
        (state, { error }) => isString(error) ? state.concat(error) : state,
    )
    .on(
        createUrlEffect,
        'onError',
        (state, { error }) => isString(error) ? state.concat(error) : state,
    );