import { effect, store } from '@vanyamate/sec';
import {
    getUrlAnalyticsAction,
} from '../actions/url-shorten/getUrlAnalytics.action.ts';
import { DomainUrlAnalytics } from '@vanyamate/url-shorten';
import { isString } from '@vanyamate/types-kit';


export const getUrlAnalyticsEffect = effect(getUrlAnalyticsAction);

export const currentUrlAnalyticsForId = store<string>('')
    .on(getUrlAnalyticsEffect, 'onBefore', (_, { args }) => args[0]);

export const urlAnalyticsPending = store<boolean>(false)
    .on(getUrlAnalyticsEffect, 'onBefore', () => true)
    .on(getUrlAnalyticsEffect, 'onFinally', () => false);

export const urlAnalytics = store<DomainUrlAnalytics | null>(null)
    .on(getUrlAnalyticsEffect, 'onSuccess', (_, { result }) => result!);

export const urlAnalyticsError = store<Array<string>>([])
    .on(
        getUrlAnalyticsEffect,
        'onError',
        (state, { error }) => isString(error) ? state.concat(error) : state,
    );