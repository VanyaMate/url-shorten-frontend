import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Button.module.css';
import { ButtonStyle } from './ButtonStyle.ts';
import { ButtonSize } from './ButtonSize.ts';


export type ButtonProps =
    {
        styleType?: ButtonStyle;
        size?: ButtonSize;
    }
    & ComponentPropsWithoutRef<'button'>;

export const Button: FC<ButtonProps> = memo(function Button (props) {
    const {
              className,
              styleType = ButtonStyle.DEFAULT,
              size      = ButtonSize.MEDIUM,
              ...other
          } = props;

    return (
        <button
            { ...other }
            className={ classNames(css.container, {}, [ className, css[styleType], css[size] ]) }
        />
    );
});