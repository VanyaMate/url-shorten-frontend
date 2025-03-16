import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Alert.module.css';
import { AlertStyle } from './AlertStyle.ts';


export type AlertProps =
    {
        header: string;
        styleType?: AlertStyle;
    }
    & ComponentPropsWithoutRef<'section'>;

export const Alert: FC<AlertProps> = memo(function Alert (props) {
    const {
              className, header, children, styleType = AlertStyle.DEFAULT,
              ...other
          } = props;

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className, css[styleType] ]) }>
            <header>{ header }</header>
            <p>{ children }</p>
        </section>
    );
});