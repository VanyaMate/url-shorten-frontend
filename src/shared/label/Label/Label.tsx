import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Label.module.css';


export type LabelProps =
    {
        header: string;
    }
    & ComponentPropsWithoutRef<'label'>;

export const Label: FC<LabelProps> = memo(function Label (props) {
    const { className, header, children, ...other } = props;

    return (
        <label { ...other }
               className={ classNames(css.container, {}, [ className ]) }>
            <span>{ header }</span>
            { children }
        </label>
    );
});