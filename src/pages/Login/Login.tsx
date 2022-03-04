import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate, useLocation } from 'react-router-dom';

import type { IUserAuth } from 'pages/Login/types.Login';

import { useAuth } from 'core/auth/useAuth';
import { login } from 'api/api';

import styles from './Login.module.scss';

const initialValues = { remember: true };

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [form] = useForm<IUserAuth>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validateTrigger, setValidateTrigger] = useState('onSubmit');

  const onFinish = async (values: IUserAuth) => {
    setIsSubmitting(true);

    const response = await login(values);

    if ('detail' in response) {
      form.setFields([
        {
          name: 'password',
          errors: [
            'Не знайдено активних облікових записів із зазначеними обліковими даними',
          ],
        },
      ]);
    }
    if ('accessToken' in response) {
      signin(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        values.remember,
      );

      const from = (locationState as { from: string } | undefined)?.from;

      if (from !== undefined) navigate(from, { replace: true });
    } else {
      throw new Error('Authentication error');
    }

    setIsSubmitting(false);
  };

  const onFinishFailed = () => setValidateTrigger('onChange');

  return (
    <div className={styles.container}>
      <Form
        form={form}
        name='basic'
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={styles.form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        validateTrigger={validateTrigger}
      >
        <Form.Item
          label='Логін'
          name='login'
          rules={[
            { min: 3, message: 'Введено мало символів' },
            { required: true, message: 'Будь ласка, введіть свій логін!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          rules={[
            { min: 3, message: 'Введено мало символів' },
            { required: true, message: 'Будь ласка, введіть свій пароль!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Запам&apos;ятати мене</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Увійти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
