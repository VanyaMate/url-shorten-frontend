import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UrlRedirectPreview.module.css';
import { DomainRedirect } from '@vanyamate/url-shorten';


export type UrlRedirectPreviewProps =
    {
        redirectInfo: DomainRedirect;
    }
    & ComponentPropsWithoutRef<'ul'>;

export const UrlRedirectPreview: FC<UrlRedirectPreviewProps> = memo(function UrlRedirectPreview (props) {
    const { className, redirectInfo, ...other } = props;

    return (
        <ul  { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <li><span>IP:</span>{ redirectInfo.ip }</li>
            <li>
                <span>Время перехода:</span>{ new Date(redirectInfo.redirectTime).toLocaleString() }
            </li>
        </ul>
    );
});