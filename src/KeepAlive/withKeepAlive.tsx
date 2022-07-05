import React, { useRef, useContext, useEffect, useState, useCallback } from 'react';
import KeepAliveContext from './KeepAliveContext';
function withKeepAlive(
    OldComponent: typeof React.Component,
    { cacheId = window.location.pathname }
) {
    return function (props: any) {
        const { cacheState, dispatch, mount } = useContext(KeepAliveContext);
        const divRef = useRef<HTMLDivElement | null>(null);
        const activity = useCallback((handler: (message: string, data: any) => void) => {
            setTimeout(() => {
                PubSub.subscribe(cacheId, handler);
            }, 1000);
        }, []);
        useEffect(() => {
            const cahce = cacheState[cacheId];

            if (cahce && cahce.realDom && cahce.realDom.length) {
                cahce.realDom.forEach((dom: ChildNode) => divRef.current?.appendChild(dom));
                setTimeout(() => PubSub.publish(cacheId), 100)
            } else {
                mount({ cacheId, element: <OldComponent {...props} activity={(cb: () => void) => activity(cb)} /> });
            }
        }, [cacheState, mount, props, activity]);

        return <div id={`keep-alive_${cacheId}`} ref={divRef}></div>
    }
}

export default withKeepAlive;