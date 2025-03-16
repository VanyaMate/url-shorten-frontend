import { Store } from '@vanyamate/sec';
import { useSyncExternalStore } from 'react';


export const useStore = function <Type> (store: Store<Type>) {
    return useSyncExternalStore(store.subscribe, store.get);
};