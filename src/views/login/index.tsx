import style from './style/index.module.less';
import LoginForm from './login-form';

function Login() {
    return (
        <div className={style["login"]}>
            <div className={style["logo"]}>
                <img alt="logo"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" />
                <div className={style["logo-text"]}>Ace admin vue</div>
            </div>
            <div className={style["container"]}>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;