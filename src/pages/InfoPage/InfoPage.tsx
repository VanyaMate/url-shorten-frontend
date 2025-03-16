import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useStore } from '../../app/hook/useStore.ts';
import { Alert } from '../../shared/notification/Alert/Alert.tsx';
import { AlertStyle } from '../../shared/notification/Alert/AlertStyle.ts';
import css from './InfoPage.module.css';
import {
    GoToShortenLink,
} from '../../feature/url-shorten/GoToShortenLink/GoToShortenLink.tsx';
import {
    GoToAnalyticsLink,
} from '../../feature/url-shorten/GoToAnalyticsLink/GoToAnalyticsLink.tsx';
import {
    getUrlInfoEffect,
    urlInfo, urlInfoError,
    urlInfoPending,
} from '../../app/models/url-info.model.ts';


export type InfoPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const InfoPage: FC<InfoPageProps> = memo(function InfoPage (props) {
    const { className, ...other } = props;
    const params                  = useParams<{ aliasId: string }>();
    const info                    = useStore(urlInfo);
    const pending                 = useStore(urlInfoPending);
    const error                   = useStore(urlInfoError);

    useLayoutEffect(() => {
        if (params.aliasId) {
            getUrlInfoEffect(`${ __API__ }/${ params.aliasId }`);
        }
    }, [ params.aliasId ]);

    if (pending) {
        return <div>Loading..</div>;
    }

    if (error) {
        return <Alert header={ 'Ошибка загрузки информации' }
                      styleType={ AlertStyle.ERROR }>{ error }</Alert>;
    }

    if (!params.aliasId || !info) {
        return <Alert header={ 'Ошибка загрузки информации' }
                      styleType={ AlertStyle.ERROR }>Ничего не найдено</Alert>;
    }

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h2>{ params.aliasId }</h2>
            <GoToShortenLink alias={ params.aliasId }/>
            <GoToAnalyticsLink alias={ params.aliasId }/>
            <ul>
                <li>
                    <span>Ссылка на:</span> { info.originalUrl }
                </li>
                <li>
                    <span>Создана:</span> { new Date(info.createdAt).toLocaleString() }
                </li>
                <li>
                    <span>Количество переходов:</span> { info.clickCount }
                </li>
            </ul>
        </section>
    );
});