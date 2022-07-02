import { ReduxState } from '@/store';
import { useDispatch } from 'react-redux';
import style from './style/index.module.less';
import { logout } from '@/store/modules/user';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Avatar, Dropdown, Menu, Modal } from '@arco-design/web-react';
import { IconUser, IconExport, IconSettings } from '@arco-design/web-react/icon';

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

function Header(props: { className: string | undefined; }) {
    const dispatch = useDispatch();
    const user = useAppSelector(state => state.user);

    const dropList = (
        <Menu>
            <Menu.Item key='user'>
                <IconUser style={{ marginRight: 8 }} />
                {user.name}
            </Menu.Item>
            <Menu.Item key='setting'>
                <IconSettings style={{ marginRight: 8 }} />
                设置
            </Menu.Item>
            <Menu.Item key='logout' onClick={() => {
                Modal.confirm({
                    title: '登出确认',
                    content: '是否要登出当前账户？',
                    style: { top: '-300px' },
                    onOk: () => { dispatch(logout()) }
                })
            }}>
                <IconExport style={{ marginRight: 8 }} />
                登出
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={`${props.className} ${style['ace-header']}`}>
            <div className={style['logo']}>
                <img alt="logo"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" />
                <div className={style["logo-text"]}>Ace admin vue</div>
            </div>

            <div className={style['right-side']}>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>
                        <Dropdown droplist={dropList} trigger={['click', 'hover']} position="br">
                            <Avatar size={36} shape='square'>
                                <img src={user.avatar} alt={user.name} />
                            </Avatar>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;