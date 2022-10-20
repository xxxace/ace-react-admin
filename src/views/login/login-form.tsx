import * as User from '@/api/user';
import { useDispatch } from 'react-redux';
import useStorage from '@/hooks/useStorage';
import { login } from '@/store/modules/user';
import style from './style/index.module.less';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Notification } from '@arco-design/web-react';

interface loginParams {
    username: string;
    password: string;
}

const rules = {
    username: [{ required: true, message: '账号不能为空' }],
    password: [{ required: true, message: '密码不能为空' }]
}

function LoginForm() {
    const [form] = Form.useForm();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [errorMsg, setErrorMesg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);
    const [loginParams, setLoginParmas] = useStorage('login-params', { username: 'admin' });

    const handleSubmit = useCallback(() => {
        form.validate().then(async (values) => {
            const success = await onLogin(values);
            const from: Location = (location.state as any)?.from || {};
            
            if (!rememberPassword) delete values.password;
            setLoginParmas(() => ({ ...values, rememberPassword }));
            success && Notification.success({
                title: '欢迎回来',
                content: '应无所住，而生其心。',
            });

            setTimeout(() => {
                navigator(from.pathname || '/workplace', { replace: true });
            }, 1500);
        });
    }, [rememberPassword]);

    const handleRememberPassword = useCallback((checked: boolean) => {
        setRememberPassword(() => checked);
    }, []);

    const onLogin = useCallback((data: loginParams) => {
        return new Promise(async resolve => {
            try {
                setIsLoading(true);
                const { jwt: token, user } = await User.login<any, { jwt: string, user: any }>({
                    identifier: data.username,
                    password: data.password
                });

                dispatch(login({
                    id: user.id,
                    name: user.username,
                    avatar: user.avatar,
                    token: token
                }));

                resolve(true);
            } catch (e: any) {
                if (e.response.data && e.response.data.error) {
                    setErrorMesg(e.response.data.error.message);
                } else {
                    setErrorMesg(e.message);
                }
                resolve(false);
            } finally {
                setIsLoading(false);
            }
        })
    }, [])

    useEffect(() => {
        setRememberPassword(loginParams.rememberPassword);
        form.setFieldsValue(loginParams);
    }, [loginParams]);

    return (
        <div className={style["login-form"]}>
            <div className={style["title"]}>登录 Ace admin react</div>
            <div className={style["sub-title"]}>登录 Ace admin react</div>
            <div v-if="errorMsg" className={style["error-msg"]}>{errorMsg}</div>

            <Form form={form} style={{ width: '100%' }} layout="vertical" onSubmit={handleSubmit}>
                <Form.Item field='username' rules={rules.username}>
                    <Input placeholder='账号' />
                </Form.Item>
                <Form.Item field='password' rules={rules.password}>
                    <Input.Password placeholder='密码' />
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={rememberPassword} onChange={handleRememberPassword}>记住密码</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" long loading={isLoading}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm;