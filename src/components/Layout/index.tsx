import Menu from '../Menu';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import { useEffect, useMemo } from 'react';
import style from "./style/index.module.less";
import { Outlet, useLocation } from 'react-router-dom';
import { routes, getFlatRoutes, RouteMeta } from '@/router/index';

function Layout() {
    let location = useLocation();
    let flatRoutes = useMemo(() => getFlatRoutes(routes, false), []);

    useEffect(() => {
        if (!location.state) {
            const current = flatRoutes.find(r => r.path === location.pathname);
            location.state = current;
        } else {
            document.title = (location.state as RouteMeta).meta.title;
        }

        PubSub.publish('router', location);
    }, [location]);

    return (
        <div className={style['ace-layout']}>
            <Header className={style['ace-layout-header']} />
            <div className={style['ace-layout-body']}>
                <div className={style['left-side']}>
                    <Menu />
                </div>
                <div className={style['container']}>
                    <NavBar />
                    <div className={style['outlet-wrap']}>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Layout;