import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import { DomainUrlAnalytics } from '@vanyamate/url-shorten';
import {
    UrlRedirectPreview,
} from '../../url-redirect/UrlRedirectPreview/UrlRedirectPreview';
import css from './UrlAnalyticsPreview.module.css';


export type UrlAnalyticsPreviewProps =
    {
        analyticsData: DomainUrlAnalytics;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UrlAnalyticsPreview: FC<UrlAnalyticsPreviewProps> = memo(function UrlAnalyticsPreview (props) {
    const { className, analyticsData, ...other } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <ul>
                <li>
                    <span>Количество переходов:</span>{ analyticsData.count }
                </li>
            </ul>
            <section className={ css.list }>
                <h4>Последние 5:</h4>
                {
                    analyticsData.lastRedirects.map((redirect) => (
                        <UrlRedirectPreview
                            redirectInfo={ redirect }
                            key={ redirect.id }
                        />
                    ))
                }
            </section>
        </article>
    );
});