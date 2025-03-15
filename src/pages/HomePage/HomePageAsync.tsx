import { ComponentPropsWithoutRef, FC, lazy, memo } from 'react';


export type HomePageAsyncProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

const HomePage = lazy(() => import('./HomePage.tsx').then((data) => ({
    default: data.HomePage,
})));


export const HomePageAsync: FC<HomePageAsyncProps> = memo(function HomePageAsync () {
    return (
        <HomePage/>
    );
});