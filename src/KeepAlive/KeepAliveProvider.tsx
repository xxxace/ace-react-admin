import React, { useCallback, useReducer } from 'react';
import cacheReducer from './cacheReducer';
import CacheContext from './CacheContext';
import { CacheType } from './types';
interface KeepAliveProviderProps {
    children: JSX.Element
}

function KeepAliveProvider(props: KeepAliveProviderProps) {
    const [cacheState, dispatch] = useReducer(cacheReducer, { name: 1 });
    const mount = useCallback(({ cacheId, element }: { cacheId: string, element: typeof React.Component }) => {
        // dispatch({ type: CacheType.CREATE })
    }, [])

    return (
        <CacheContext.Provider value={{ cacheState, dispatch }}>
            {props.children}
        </CacheContext.Provider>
    )
}

export default KeepAliveProvider;