import React, { ReactNode, useCallback, useReducer } from 'react';
import cacheReducer from './cacheReducer';
import KeepAliveContext from './KeepAliveContext';
import { CacheType } from './types';
interface KeepAliveProviderProps {
    children: JSX.Element
}

function KeepAliveProvider(props: KeepAliveProviderProps) {
    const [cacheState, dispatch] = useReducer(cacheReducer, {});
    const mount = useCallback(({ cacheId, element }: { cacheId: string, element: typeof React.Component }) => {
        if (!cacheState[cacheId]) {
            dispatch({ type: CacheType.CREATE, payload: { cacheId, element } });
        }
    }, [cacheState]);

    const destroy = useCallback((cacheId: string) => {
        if (!cacheState[cacheId]) {
            dispatch({ type: CacheType.DESTROY, payload: { cacheId } });
        }
    }, [cacheState]);

    return (
        <KeepAliveContext.Provider value={{ cacheState, dispatch, mount, destroy }}>
            {props.children}
            {
                Object.values(cacheState).map(({ cacheId, element }) => {
                    return (
                        <div id={`keep-alive_${cacheId}`} key={cacheId} ref={
                            (dom) => {
                                const cache = cacheState[cacheId];

                                if (dom && (!(cache.realDom))) {
                                    setTimeout(() => {
                                        const children = dom.childNodes;
                                        if (children.length) {
                                            const realDom = Array.from(dom.childNodes);
                                            dispatch({ type: CacheType.CREATED, payload: { cacheId, realDom } })
                                        } else {
                                            dispatch({ type: CacheType.CREATED, payload: { cacheId } })
                                        }
                                    }, 70)
                                }
                            }
                        }>{(element as ReactNode)}</div>
                    )
                })
            }
        </KeepAliveContext.Provider>
    )
}

export default KeepAliveProvider;