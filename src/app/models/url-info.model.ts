import { effect, store } from '@vanyamate/sec';
import { getUrlInfoAction } from '../actions/url-shorten/getUrlInfo.action.ts';
import { DomainUrlInfo } from '@vanyamate/url-shorten';
import { isString } from '@vanyamate/types-kit';


export const getUrlInfoEffect = effect(getUrlInfoAction);

export const urlInfoPending = store<boolean>(false)
    .on(getUrlInfoEffect, 'onBefore', () => true)
    .on(getUrlInfoEffect, 'onFinally', () => false);

export const urlInfo = store<DomainUrlInfo | null>(null)
    .on(getUrlInfoEffect, 'onSuccess', (_, { result }) => result!);

export const urlInfoError = store<string>('')
    .on(
        getUrlInfoEffect,
        'onError',
        (_, { error }) => isString(error)
                          ? error
                          : error instanceof Error
                            ? error.message
                            : JSON.stringify(error),
    );