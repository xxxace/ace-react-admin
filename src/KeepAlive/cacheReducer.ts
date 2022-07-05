import react from 'react';
import { CacheType, CacheTypes } from "./types";

type CacheMap = {
    cacheId: string;
    element?: typeof react.Component;
    realDom?: ChildNode[];
    type?: CacheTypes
}

interface CacheReducerState {
    [key: string]: CacheMap
}

function cacheReducer(state: CacheReducerState, action: { type: CacheTypes, payload: CacheMap }) {
    const { type, payload } = action;
    const { cacheId } = payload;

    switch (type) {
        case CacheType.CREATE:
            return {
                ...state,
                [cacheId]: {
                    cacheId,
                    realDom: undefined,
                    element: payload.element,
                    status: CacheType.CREATE
                }
            }
        case CacheType.CREATED:
            return {
                ...state,
                [cacheId]: {
                    ...state[cacheId],
                    realDom: payload.realDom,
                    status: CacheType.CREATED
                }
            }
        case CacheType.DESTROY:
            delete state[cacheId];
            return { ...state }
        // case CacheType.CREATE:
        //     return {
        //         ...state,
        //         [payload.cacheId]: {
        //             cacheId: payload.cacheId,
        //             realDom: undefined,
        //             element: payload.element,
        //             status: CacheType.CREATE
        //         }
        //     }
        default:
            return state
    }
}

export default cacheReducer;