import { routes, RouteRaw } from '@/router';
import { Menu } from '@arco-design/web-react';
import { IconApps } from '@arco-design/web-react/icon';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AceMenu() {
    const location = useLocation();
    const navigator = useNavigate();
    const [openKey, setOpenKey] = useState<string[]>([]);
    const [selectKey, setSelectKey] = useState<string[]>([]);
    const [matchesMap, setMatchesMap] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        let matches: string[] = [];
        let map: { [key: string]: any } = {};
        function travel(_routes: RouteRaw[], level: number) {
            return _routes.forEach(route => {
                if (level === 1) matches = [];
                if (route.children) {
                    matches.push(route.name);
                    travel(route.children, level + 1);
                } else {
                    map[route.path] = [...matches, route.name];
                }
            })
        }
        travel(routes, 1);
        setMatchesMap(() => map);
    }, [routes]);

    useEffect(() => {
        const current = matchesMap[location.pathname];
        if (current) {
            setOpenKey(current.slice(0, current.length));
            setSelectKey([current[current.length - 1]]);
        }
    }, [location, matchesMap]);

    const renderMenu = useCallback(() => {
        function travel(_routes: RouteRaw[]) {
            return _routes.map(route => {
                if (route.children) {
                    return <Menu.SubMenu
                        key={route.name}
                        title={
                            <>
                                <IconApps />{route.meta?.title}
                            </>
                        }
                    >
                        {travel(route.children)}
                    </Menu.SubMenu>
                } else {
                    return <Menu.Item key={route.name} onClick={() => {
                        const self = Object.assign({},route)
                        delete self.component
                        navigator(route.path, { state: self })
                    }}>{route.meta?.title}</Menu.Item>
                }
            })
        }
        return travel(routes);
    }, [routes]);

    const clickSubMenu = useCallback((key: string, openKeys: string[], keyPath: string[]) => {
        if (openKey.includes(key)) {
            setOpenKey(() => []);
        } else {
            setOpenKey(() => [key]);
        }
    }, [openKey]);

    return (
        <div style={{ height: '100%' }}>
            <Menu
                style={{ width: 200, height: '100%' }}
                levelIndent={34}
                accordion={false}
                autoOpen={false}
                autoScrollIntoView={true}
                hasCollapseButton
                openKeys={openKey}
                selectedKeys={selectKey}
                onClickSubMenu={clickSubMenu}
            >
                {renderMenu()}
            </Menu>
        </div>
    )
}

export default AceMenu;