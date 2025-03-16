import { FC, lazy, memo } from 'react';


const InfoPage = lazy(() => import('./InfoPage.tsx').then((data) => ({
    default: data.InfoPage,
})));

export const InfoPageAsync: FC = memo(function InfoPageAsync () {
    return (
        <InfoPage/>
    );
});