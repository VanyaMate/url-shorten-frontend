import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';


export type GoToInfoLinkProps =
    {
        alias: string;
    }
    & Omit<LinkProps, 'to'>

export const GoToInfoLink: FC<GoToInfoLinkProps> = memo(function GoToInfoLink (props) {
    const { className, alias, ...other } = props;

    return (
        <Link
            { ...other }
            className={ className }
            to={ `/info/${ alias }` }
        >
            Информация
        </Link>
    );
});