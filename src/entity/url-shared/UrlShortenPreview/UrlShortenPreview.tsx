import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UrlShortenPreview.module.css';
import { DomainUrl } from '@vanyamate/url-shorten';


export type UrlShortenPreviewProps =
    {
        urlShorten: DomainUrl;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UrlShortenPreview: FC<UrlShortenPreviewProps> = memo(function UrlShortenPreview (props) {
    const { className, urlShorten, children, ...other } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h4>{ urlShorten.id }</h4>
            <ul>
                <li><span>ссылка на:</span>{ urlShorten.originalUrl }</li>
                <li>
                    <span>действует до:</span>
                    {
                        urlShorten.expiresAt
                        ? new Date(urlShorten.expiresAt).toLocaleString()
                        : 'Неограниченно'
                    }
                </li>
            </ul>
            { children }
        </article>
    );
});