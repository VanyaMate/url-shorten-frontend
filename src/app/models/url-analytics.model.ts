import { effect, store } from '@vanyamate/sec';
import {
    getUrlAnalyticsAction,
} from '../actions/url-shorten/getUrlAnalytics.action.ts';
import { DomainUrlAnalytics } from '@vanyamate/url-shorten';
import { isString } from '@vanyamate/types-kit';


export const getUrlAnalyticsEffect = effect(getUrlAnalyticsAction);

export const urlAnalyticsPending = store<boolean>(false)
    .on(getUrlAnalyticsEffect, 'onBefore', () => true)
    .on(getUrlAnalyticsEffect, 'onFinally', () => false);

export const urlAnalytics = store<DomainUrlAnalytics | null>(null)
    .on(getUrlAnalyticsEffect, 'onSuccess', (_, { result }) => result!);

export const urlAnalyticsError = store<string>('')
    .on(getUrlAnalyticsEffect, 'onBefore', () => '')
    .on(
        getUrlAnalyticsEffect,
        'onError',
        (_, { error }) => isString(error)
                          ? error
                          : error instanceof Error
                            ? error.message
                            : JSON.stringify(error),
    );