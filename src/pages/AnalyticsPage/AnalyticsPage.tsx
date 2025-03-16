import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useStore } from '../../app/hook/useStore.ts';
import {
    getUrlAnalyticsEffect,
    urlAnalytics, urlAnalyticsError,
    urlAnalyticsPending,
} from '../../app/models/url-analytics.model.ts';
import { Alert } from '../../shared/notification/Alert/Alert.tsx';
import { AlertStyle } from '../../shared/notification/Alert/AlertStyle.ts';
import {
    UrlAnalyticsPreview,
} from '../../entity/url-analytics/UrlAnalyticsPreview/UrlAnalyticsPreview.tsx';
import css from './AnalyticsPage.module.css';


export type AnalyticsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const AnalyticsPage: FC<AnalyticsPageProps> = memo(function AnalyticsPage (props) {
    const { className, ...other } = props;
    const params                  = useParams<{ aliasId: string }>();
    const analytics               = useStore(urlAnalytics);
    const pending                 = useStore(urlAnalyticsPending);
    const error                   = useStore(urlAnalyticsError);

    useLayoutEffect(() => {
        if (params.aliasId) {
            getUrlAnalyticsEffect(`${ __API__ }/${ params.aliasId }`);
        }
    }, [ params.aliasId ]);

    if (pending) {
        return <div>Loading..</div>;
    }

    if (error) {
        return <Alert header={ 'Ошибка загрузки аналитики' }
                      styleType={ AlertStyle.ERROR }>{ error }</Alert>;
    }

    if (!params.aliasId || !analytics) {
        return <Alert header={ 'Ошибка загрузки аналитики' }
                      styleType={ AlertStyle.ERROR }>Ничего не найдено</Alert>;
    }

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h2>{ params.aliasId }</h2>
            <UrlAnalyticsPreview analyticsData={ analytics }/>
        </section>
    );
});