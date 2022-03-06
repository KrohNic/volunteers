import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

import type { IUserAuth } from 'pages/Login/types.Login';
import type { LocationFromState } from 'types/types';

import { useAuth } from 'core/auth/useAuth';
import { login } from 'api/api';
import { animCaptchaTransition } from 'pages/CitizenForm/constants.CitizenForm';
import { HeightChangeAnimProps } from 'constants/animationProps';

import styles from './Login.module.scss';

const initialValues = { remember: true };

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [form] = useForm<IUserAuth>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validateTrigger, setValidateTrigger] = useState('onSubmit');
  const [isCaptchaValidated, setIsCaptchaValidated] = useState(false);

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
        },
        values.remember,
      );

      const from = (locationState as LocationFromState)?.from;

      if (from !== undefined) navigate(from, { replace: true });
    } else {
      throw new Error('Authentication error');
    }

    setIsSubmitting(false);
  };

  const onFinishFailed = () => setValidateTrigger('onChange');

  const validateCaptcha = useCallback((value) => {
    setIsCaptchaValidated(value !== null);
  }, []);

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

        <AnimatePresence initial={false}>
          {!isCaptchaValidated && (
            <motion.div
              initial={HeightChangeAnimProps.initial}
              animate={HeightChangeAnimProps.animate}
              exit={HeightChangeAnimProps.exit}
              transition={animCaptchaTransition}
              className={styles.captcha}
            >
              <ReCAPTCHA
                sitekey='6LeambEeAAAAAN1QVUucIH0E_sIl7DFGx7zoZu0Y'
                onChange={validateCaptcha}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={isSubmitting}
            disabled={isSubmitting || !isCaptchaValidated}
          >
            Увійти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
