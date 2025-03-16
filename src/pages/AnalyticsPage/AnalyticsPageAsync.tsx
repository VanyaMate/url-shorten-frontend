import { FC, lazy, memo } from 'react';


const AnalyticsPage = lazy(() => import('./AnalyticsPage.tsx').then((data) => ({
    default: data.AnalyticsPage,
})));

export const AnalyticsPageAsync: FC = memo(function AnalyticsPageAsync () {
    return (
        <AnalyticsPage/>
    );
});