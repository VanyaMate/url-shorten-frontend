import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Input.module.css';
import { InputSize } from './InputSize.ts';


export type InputProps =
    {
        size?: InputSize;
    }
    & ComponentPropsWithoutRef<'input'>;

export const Input: FC<InputProps> = memo(function Input (props) {
    const { className, size = InputSize.MEDIUM, ...other } = props;

    return (
        <input
            { ...other }
            className={ classNames(css.container, {}, [ className, css[size] ]) }
        />
    );
});