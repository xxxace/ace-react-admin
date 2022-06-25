import { Link, Outlet } from 'react-router-dom';
import { Button } from "@arco-design/web-react";
function Layout() {
    return (
        <div>
            <div>layout</div>
            <Button type="primary">hello</Button>
            <div>
                 <Link to="/">workplace</Link>
                 <Link to="form">form</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;