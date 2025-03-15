import { ComponentPropsWithoutRef, FC, memo, Suspense } from 'react';
import { AppRouter } from './app/router/AppRouter.tsx';
import { BrowserRouter } from 'react-router-dom';


export type AppProps =
    {}
    & ComponentPropsWithoutRef<'main'>;

export const App: FC<AppProps> = memo(function App (props) {
    return (
        <main { ...props }>
            <BrowserRouter>
                <Suspense fallback={ <h2>Loading...</h2> }>
                    <AppRouter/>
                </Suspense>
            </BrowserRouter>
        </main>
    );
});