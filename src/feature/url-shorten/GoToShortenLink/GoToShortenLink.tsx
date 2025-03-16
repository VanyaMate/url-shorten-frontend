import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';


export type GoToShortenLinkProps =
    {
        alias: string;
    }
    & Omit<LinkProps, 'to'>

export const GoToShortenLink: FC<GoToShortenLinkProps> = memo(function GoToShortenLink (props) {
    const { className, alias, ...other } = props;

    return (
        <Link
            { ...other }
            className={ className }
            target={ '_blank' }
            to={ `${ __API__ }/${ alias }` }
        >
            Перейти
        </Link>
    );
});