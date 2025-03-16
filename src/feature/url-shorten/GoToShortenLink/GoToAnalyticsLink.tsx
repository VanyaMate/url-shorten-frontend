import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';


export type GoToAnalyticsLinkProps =
    {
        alias: string;
    }
    & Omit<LinkProps, 'to'>

export const GoToAnalyticsLink: FC<GoToAnalyticsLinkProps> = memo(function GoToAnalyticsLink (props) {
    const { className, alias, ...other } = props;

    return (
        <Link
            { ...other }
            className={ className }
            to={ `/analytics/${ alias }` }
        >
            Аналитика
        </Link>
    );
});