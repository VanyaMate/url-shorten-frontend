import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    CreateUrlForm,
} from '../../widget/url-shorten/CreateUrlForm/CreateUrlForm.tsx';
import { UrlList } from '../../widget/url-shorten/UrlList/UrlList.tsx';


export type HomePageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const HomePage: FC<HomePageProps> = memo(function HomePage (props) {
    const { ...other } = props;

    return (
        <div { ...other }>
            <h1>Сократить ссылку</h1>
            <CreateUrlForm/>
            <UrlList/>
        </div>
    );
});