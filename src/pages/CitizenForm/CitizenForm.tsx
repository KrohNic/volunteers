import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  PageHeader,
  Modal,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AnimatePresence, motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactPhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import 'react-phone-input-2/lib/style.css';

import type { ICitizensFormValues } from 'pages/CitizenForm/types.CitizenForm';

import { ROUTES } from 'constants/routes';
import { PageTitles } from 'constants/pageTitles';
import { saveCitizenForm } from 'api/api';
import { HeightChangeAnimProps } from 'constants/animationProps';
import {
  animCaptchaTransition,
  citizensFormInitialValues,
} from './constants.CitizenForm';

import styles from './CitizenForm.module.scss';

const CitizenForm = () => {
  const navigate = useNavigate();
  const [form] = useForm<ICitizensFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validateTrigger, setValidateTrigger] = useState('onSubmit');
  const [isCaptchaValidated, setIsCaptchaValidated] = useState(false);

  const onFinish = useCallback(
    async (values: ICitizensFormValues) => {
      setIsSubmitting(true);

      const response = await saveCitizenForm(values);

      if ('errors' in response) {
        const errors = Object.entries(response.errors).map(([key, value]) => ({
          name: key,
          errors: [value],
        }));

        form.setFields(errors);
      } else {
        Modal.info({
          title: 'Анкету надіслано',
        });
      }

      setIsSubmitting(false);
    },
    [form],
  );

  const onFinishFailed = useCallback(() => setValidateTrigger('onChange'), []);

  const goToParentPage = useCallback(() => navigate(ROUTES.root), [navigate]);

  const validateCaptcha = useCallback((value) => {
    setIsCaptchaValidated(value !== null);
  }, []);

  const removeAtSign = useCallback(() => {
    const prevValue = form.getFieldValue('tg_username');
    const value = prevValue.replace('@', '');

    form.setFields([
      {
        name: 'tg_username',
        value,
      },
    ]);
  }, [form]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={citizensFormInitialValues}
      className={styles.form}
      autoComplete='off'
      layout='vertical'
      validateTrigger={validateTrigger}
    >
      <PageHeader
        onBack={goToParentPage}
        title={PageTitles.CITIZENS}
        className={styles.header}
      />

      <Form.Item
        label='Місто'
        name='city'
        rules={[
          { min: 3, message: 'Введено мало символів' },
          { required: true, message: 'Вкажіть місто' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ім'я"
        name='name'
        rules={[
          { min: 3, message: 'Введено мало символів' },
          { required: true, message: "Вкажіть ім'я" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Прізвище'
        name='last_name'
        rules={[
          { min: 3, message: 'Введено мало символів' },
          { required: true, message: 'Вкажіть прізвище' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Telegram username'
        name='tg_username'
        rules={[
          { min: 5, message: 'Введено мало символів' },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9]*[_]?[a-zA-Z0-9]+$/,
            message: 'Невірний формат',
          },
          { required: true, message: 'Вкажіть прізвище' },
        ]}
      >
        <Input addonBefore='@' onChange={removeAtSign} />
      </Form.Item>

      <Form.Item label='Кількість людей' name='number_of_people' required>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label='Номер телефону'
        name='phone_number'
        rules={[
          { min: 3, message: 'Введено мало символів' },
          { required: true, message: 'Вкажіть номер телефону' },
        ]}
      >
        <ReactPhoneInput
          country='ua'
          localization={ru}
          enableSearch
          containerClass={styles.phone_input}
          inputClass={styles.phone_input_input}
        />
      </Form.Item>

      <Form.Item
        label='Мови, якими володієте. Перерахуйте через кому'
        name='languages'
        rules={[
          { min: 2, message: 'Введено мало символів' },
          { required: true, message: 'Вкажіть номер мови' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Бюджет, яким володієте' name='budget' required>
        <InputNumber
          min={0}
          addonAfter='$'
          formatter={(value) =>
            String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
        />
      </Form.Item>

      <fieldset>
        <legend>Документи</legend>

        <Form.Item name='is_passport' valuePropName='checked'>
          <Checkbox>Є паспорт</Checkbox>
        </Form.Item>

        <Form.Item name='is_international_passport' valuePropName='checked'>
          <Checkbox>Є закордонний паспорт</Checkbox>
        </Form.Item>

        <Form.Item name='is_education_doc' valuePropName='checked'>
          <Checkbox>Є документи про освіту</Checkbox>
        </Form.Item>

        <Form.Item name='is_childs_birth_certificate' valuePropName='checked'>
          <Checkbox>Свідоцтво про народження дітей</Checkbox>
        </Form.Item>
      </fieldset>

      <fieldset>
        <legend>Тварины</legend>

        <Form.Item name='is_pets' valuePropName='checked'>
          <Checkbox>Є тварины</Checkbox>
        </Form.Item>

        <Form.Item name='is_pet_carrier' valuePropName='checked'>
          <Checkbox>Переноска на тварин</Checkbox>
        </Form.Item>

        <Form.Item name='is_passport_for_animals' valuePropName='checked'>
          <Checkbox>Паспорт на тварин</Checkbox>
        </Form.Item>
      </fieldset>

      <Form.Item
        label='Перерахуйте хронічні, імунні захворювання, або вагітність'
        name='health_characteristics'
        rules={[{ min: 3, message: 'Введено мало символів' }]}
      >
        <Input />
      </Form.Item>

      <fieldset>
        <legend>Додаткова інформація</legend>

        <Form.Item name='criminal_records' valuePropName='checked'>
          <Checkbox>Є судимість</Checkbox>
        </Form.Item>

        <Form.Item name='is_luggage' valuePropName='checked'>
          <Checkbox>Є багаж</Checkbox>
        </Form.Item>

        <Form.Item name='is_point' valuePropName='checked'>
          <Checkbox>Можете дістатися до точки відправлення</Checkbox>
        </Form.Item>
      </fieldset>

      <Form.Item
        label='Будь-яка інформація, яку нам необхідно знати про вас'
        name='additionally'
        rules={[{ min: 3, message: 'Введено мало символів' }]}
      >
        <Input.TextArea rows={4} />
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

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className={styles.submit_btn}
          loading={isSubmitting}
          disabled={isSubmitting || !isCaptchaValidated}
        >
          Надіслати анкету
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CitizenForm;
