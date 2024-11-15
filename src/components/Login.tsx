import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, DatePicker, Form, Input, message } from 'antd';
import axios from 'axios';
import { UserFormField, UserLoginField } from '../models/accounts';
import { accountService } from '../services/account.service';

const api = import.meta.env.VITE_ACCOUNTS_URL;

const onFinish: FormProps<UserLoginField>['onFinish'] = (values) => {
    console.log('Success:', values);

    axios.post(api + "login", values).then(res => {
        if (res.status === 200) {
            accountService.login(res.data.token);
            message.success("Signed In successfully!");
        }
    }).catch(err => {
        message.error(err.response.data.detail);
    });
};

const Login: React.FC = () => (
    <>
        <h2>Sign In</h2>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<UserFormField>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<UserFormField>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item<UserFormField> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    </>
);

export default Login;