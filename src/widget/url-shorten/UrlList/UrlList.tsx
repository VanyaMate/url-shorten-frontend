import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
    useSyncExternalStore,
} from 'react';
import classNames from 'classnames';
import css from './UrlList.module.css';
import {
    getUrlsEffect, urlsGetListPending,
    urlsList,
} from '../../../app/models/url-shorten.model.ts';


export type UrlListProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UrlList: FC<UrlListProps> = memo(function UrlList (props) {
    const { className, ...other } = props;
    const urls                    = useSyncExternalStore(urlsList.subscribe, urlsList.get);
    const pending                 = useSyncExternalStore(urlsGetListPending.subscribe, urlsGetListPending.get);

    useLayoutEffect(() => {
        getUrlsEffect();
    }, []);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <h2>Список</h2>
            {
                pending ? <p>Loading...</p> : <ol>
                    { urls.map((url) => <li
                        key={ url.id }>{ url.originalUrl }</li>) }
                </ol>
            }
        </div>
    );
});