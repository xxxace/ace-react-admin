
import { useState, useEffect, useCallback } from 'react';
import style from './style/index.module.less';
import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
import useStorage from '@/hooks/useStorage';
import { useLoginMutation } from '@/store/thunk/user';
import * as User from '@/api/user';
import { login } from '@/store/modules/user';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMesg] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [loginParams, setLoginParmas] = useStorage('login-params', { username: 'admin' });

    const handleSubmit = useCallback(() => {
        form.validate().then((values) => {
            if (!rememberPassword) delete values.password;
            onLogin(values);
        });
    }, [rememberPassword]);

    const handleRememberPassword = useCallback((checked: boolean) => {
        setRememberPassword(() => checked);
    }, []);

    const onLogin = useCallback(async (data: loginParams) => {

        try {
            setIsLoading(true);
            const res = await User.login({
                identifier: data.username,
                password: data.password
            });

            // console.log(res)
            // if(!res.error)
            // dispatch(login({
            //     id: data.username,
            //     password: data.password
            // }))

            // setLoginParmas(() => ({ ...values, rememberPassword }));
        } catch (e) {
            setErrorMesg(e as string)
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        setRememberPassword(loginParams.rememberPassword);
        form.setFieldsValue(loginParams);
    }, [loginParams]);

    return (
        <div className={style["login-form"]}>
            <div className={style["title"]}>登录 Ace admin vue</div>
            <div className={style["sub-title"]}>登录 Ace admin vue</div>
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