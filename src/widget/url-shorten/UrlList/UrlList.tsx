import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import css from './UrlList.module.css';
import {
    getUrlsEffect,
    urlGettingError,
    urlsGetListPending,
    urlsList,
} from '../../../app/models/url-shorten.model.ts';
import { useStore } from '../../../app/hook/useStore.ts';
import { Alert } from '../../../shared/notification/Alert/Alert.tsx';
import { AlertStyle } from '../../../shared/notification/Alert/AlertStyle.ts';
import {
    UrlShortenPreview,
} from '../../../entity/url-shared/UrlShortenPreview/UrlShortenPreview.tsx';
import {
    RemoveUrlButton,
} from '../../../feature/url-shorten/RemoveUrlButton/RemoveUrlButton.tsx';
import { Row } from '../../../shared/box/Row/Row.tsx';
import {
    GoToShortenLink,
} from '../../../feature/url-shorten/GoToShortenLink/GoToShortenLink.tsx';
import {
    GoToAnalyticsLink,
} from '../../../feature/url-shorten/GoToShortenLink/GoToAnalyticsLink.tsx';


export type UrlListProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const UrlList: FC<UrlListProps> = memo(function UrlList (props) {
    const { className, ...other } = props;
    const urls                    = useStore(urlsList);
    const pending                 = useStore(urlsGetListPending);
    const error                   = useStore(urlGettingError);

    useLayoutEffect(() => {
        getUrlsEffect();
    }, []);

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h3 className={ css.title }>Список всех ссылок</h3>
            {
                error ? <Alert header={ 'Ошибка' }
                               styleType={ AlertStyle.ERROR }
                               key={ 'error' }>{ error }</Alert>
                      : null
            }
            {
                pending ? <div>Загрузка..</div>
                        : urls.length
                          ? urls.map((url) => (
                                <UrlShortenPreview
                                    urlShorten={ url } key={ url.id }
                                >
                                    <Row>
                                        <GoToAnalyticsLink alias={ url.id }/>
                                        <GoToShortenLink alias={ url.id }/>
                                        <RemoveUrlButton alias={ url.id }/>
                                    </Row>
                                </UrlShortenPreview>
                            ))
                          : <div className={ css.empty }>Ссылок нет</div>
            }
        </section>
    );
});