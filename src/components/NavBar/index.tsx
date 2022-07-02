import PubSub from 'pubsub-js';
import { RouteRaw } from '@/router';
import { Tag } from '@arco-design/web-react';
import style from './style/index.module.less';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

function NavBar() {
    const navigator = useNavigate();
    const [list, setList] = useState<RouteRaw[]>([]);
    const [current, setCurrent] = useState<RouteRaw>();

    useEffect(() => {
        PubSub.subscribe('router', (message, data) => {
            const curr = data.state;

            setList((_list) => {
                const exist = _list.some(l => l.name === curr.name);
                if (!exist && curr.name !== 'workplace') {
                    return [..._list, curr];
                } else {
                    return _list;
                }
            });

            setCurrent(() => curr);
        });
    }, []);

    const handleClick = useCallback((route: RouteRaw) => {
        navigator(route.path, { state: route });
    }, []);

    const handleClose = useCallback((route: RouteRaw) => {
        setList(_list => {
            let index = 0;
            const newList = _list.filter((l, i) => {
                if (l.name !== route.name) {
                    return true;
                } else {
                    index = i > 0 ? i - 1 : -1;
                    return false;
                }
            });

            setTimeout(() => {
                if (index >= 0) {
                    navigator(newList[index].path, { state: newList[index] });
                } else {
                    navigator('/workplace');
                }
            });
            return [...newList];
        });
    }, []);

    return (
        <div className={style['ace-nav-bar']}>
            <div className={style['ace-nav-bar-wrap']}>
                <Tag className={style['tag']} onClick={() => navigator('/workplace')} color={current?.name === 'workplace' ? 'arcoblue' : ''}>首页</Tag>
                {
                    list.map(l => {
                        return (
                            <Tag key={l.name}
                                className={style['tag']}
                                closable
                                onClose={((e) => {
                                    e.stopPropagation();
                                    handleClose(l);
                                })}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick(l)
                                }}
                                color={current?.name === l.name ? 'arcoblue' : ''}>
                                {l?.meta?.title}
                            </Tag>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NavBar;