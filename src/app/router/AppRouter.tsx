import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePageAsync } from '../../pages/HomePage/HomePageAsync.tsx';
import {
    AnalyticsPageAsync,
} from '../../pages/AnalyticsPage/AnalyticsPageAsync.tsx';


export type AppRouterProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const AppRouter: FC<AppRouterProps> = memo(function AppRouter () {
    return (
        <Routes>
            <Route
                element={ <HomePageAsync/> }
                path={ '/' }
            />
            <Route
                element={ <AnalyticsPageAsync/> }
                path={ '/analytics/:aliasId' }
            />
        </Routes>
    );
});