import React from 'react';
import { useRef } from 'react';

function withKeepAlive(
    OldComponent: typeof React.Component,
    { cacheId = window.location.pathname }
) {
    return function () {
        const divRef = useRef(null);
        return <div id={`keep-alive_${cacheId}`} ref={divRef}>
            <OldComponent />
        </div>
    }
}

export default withKeepAlive;