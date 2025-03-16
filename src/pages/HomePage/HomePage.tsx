import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    CreateUrlForm,
} from '../../widget/url-shorten/CreateUrlForm/CreateUrlForm.tsx';
import { UrlList } from '../../widget/url-shorten/UrlList/UrlList.tsx';
import css from './HomePage.module.css';
import classNames from 'classnames';


export type HomePageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const HomePage: FC<HomePageProps> = memo(function HomePage (props) {
    const { className, ...other } = props;

    return (
        <div
            className={ classNames(css.container, {}, [ className ]) } { ...other }>
            <h1>Сократить ссылку</h1>
            <CreateUrlForm/>
            <UrlList/>
        </div>
    );
});