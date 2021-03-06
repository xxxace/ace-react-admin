import PubSub from 'pubsub-js';
import NProgress from 'nprogress';
import { isLogin } from "@/utils/auth";
import Layout from "@/components/Layout";
import loadable from '@loadable/component';
import { useCallback, useMemo } from "react";
import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { KeepAliveProvider, withKeepAlive } from '@/KeepAlive';

export type RouteMeta = {
    title?: string;
    icon?: string;
    [key: string]: any;
}

export type RouteRaw = {
    name: string;
    path: string;
    redirect?: string;
    component?: JSX.Element | any;
    children?: RouteRaw[];
    meta?: RouteMeta
}
function load(fn: any) {
    const Component = loadable(fn);
    Component.preload = fn.requireAsync || fn;
    return Component;
}
// const Workplace = load(() => import('../views/dashboard/workplace/index.tsx'));
// const KeepAliveWorkplace = withKeepAlive(Workplace as any, { cacheId: 'KeepAliveWorkplace' })

export const routes: RouteRaw[] = [{
    name: 'dashboard',
    path: '/',
    redirect: '/workplace',
    meta: {
        title: '仪表盘'
    },
    // children: [{
    //     name: 'workplace',
    //     path: '/workplace',
    //     component: <KeepAliveWorkplace/>,
    //     meta: {
    //         title: '工作站'
    //     }
    // }],
    children: [{
        name: 'workplace',
        path: '/workplace',
        component: 'dashboard/workplace/index',
        meta: {
            title: '工作站'
        }
    }],
    // children: [{
    //     name: 'workplace',
    //     path: '/workplace',
    //     component: <Workplace />,
    //     meta: {
    //         title: '工作站'
    //     }
    // }]
},
{
    name: 'form',
    path: '/form',
    meta: {
        title: 'form'
    },
    children: [{
        name: 'form1',
        path: '/form/form1',
        component: 'form/form1/index',
        meta: {
            title: '表单1'
        }
    }]
}, {
    name: 'list',
    path: '/list',
    meta: {
        title: 'list'
    },
    children: [{
        name: 'list1',
        path: '/list/list1',
        component: 'list/list1/index',
        meta: {
            title: '列表1'
        }
    }]
}
];



const Login = load(() => import('@/views/login'));

function AuthWrapper({ children }: { children: JSX.Element; }) {
    let location = useLocation();
    if (!isLogin()) {
        return <Navigate to="/login" state={{ from: location }} replace={true} />
    }
    // NProgress.start();
    PubSub.publish('router', location);
    return children
}

export function getFlatRoutes(routes: RouteRaw[], isImport: boolean = true) {
    function travel(_routes: RouteRaw[]) {
        const flat: RouteRaw[] = [];
        _routes.forEach(route => {
            if (route.children) {
                flat.push(...travel(route.children));
            } else {
                const r = Object.assign({}, route);
                if (isImport && typeof r.component === 'string') {
                    try {
                        const componentName = r.component;
                        const Component = load(() => import(`../views/${componentName}.tsx`));
                        const KeepAlive = withKeepAlive(Component as any, { cacheId: route.path })
                        r.component = <KeepAlive/>
                    } catch (e) {
                        console.log(e)
                    }
                }
                flat.push(r);
            }
        });

        return flat;
    }

    return travel(routes);
}

function Router() {
    const flatRoutes = useMemo(() => getFlatRoutes(routes), [routes]);

    const renderRoutes = useCallback(() => {
        function travel(routes: RouteRaw[]) {
            return routes.map((route) => {
                // const KeepAlive = withKeepAlive(<div>111</div> as any, { cacheId: route.path })
                // const KeepAlive = withKeepAlive(route.component as any,{cacheId:route.path})
                return (
                    <Route key={route.name} path={route.path} element={<AuthWrapper>{route.component}</AuthWrapper>} />
                )
            })
        }

        return travel(flatRoutes);
    }, [flatRoutes]);

    return (
        <BrowserRouter>
            <KeepAliveProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to='/workplace' replace={true} />}></Route>
                        {/* <Route path="/workplace" element={<KeepAliveWorkplace />}></Route> */}
                        {renderRoutes()}
                    </Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="*" element={<div>error</div>}></Route>
                </Routes>
            </KeepAliveProvider>
        </BrowserRouter>
    )
}

export default Router;