import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox, Descriptions } from 'antd';

import type { ICitizensFormValues } from 'pages/CitizenForm/types.CitizenForm';
import type { IAuthTokens } from 'pages/Login/types.Login';

import { getCitizenForm } from 'api/api';
import Loader from 'components/Loader/Loader';
import PageHeaderExitBtn from 'components/PageHeaderExitBtn/PageHeaderExitBtn';
import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';
import AcceptFormBtn from 'pages/AdminsRoom/CitizenFormsTable/AcceptFormBtn/AcceptFormBtn';
import { useAuth } from 'core/auth/useAuth';

import styles from './CitizenInfo.module.scss';

const CitizenInfo = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<ICitizensFormValues | null>(null);
  const { tokens } = useAuth();
  const { accessToken } = tokens as IAuthTokens;

  const load = useCallback(async () => {
    if (formId === undefined) return;

    setPageData(null);

    const response = await getCitizenForm(Number(formId), accessToken);

    setPageData(response);
  }, [accessToken, formId]);

  useEffect(() => {
    load();
  }, [load]);

  const goToParentPage = useCallback(() => {
    navigate(ROUTES.admins_room);
  }, [navigate]);

  if (pageData === null) return <Loader />;

  return (
    <div className={styles.container}>
      <PageHeaderExitBtn
        title={PageTitles.CITIZENS}
        goToParentPage={goToParentPage}
      />

      <Descriptions
        labelStyle={{
          fontWeight: 'bold',
          padding: '0 0 0 10px',
        }}
        contentStyle={{ padding: '0 10px 0 0', textAlign: 'right' }}
      >
        <Descriptions.Item label='Місто'>{pageData.city}</Descriptions.Item>

        <Descriptions.Item label="Ім'я">{pageData.name}</Descriptions.Item>

        <Descriptions.Item label='Прізвище'>
          {pageData.last_name}
        </Descriptions.Item>

        <Descriptions.Item label='Кількість людей'>
          {pageData.number_of_people}
        </Descriptions.Item>

        <Descriptions.Item label='Номер телефону'>
          {pageData.phone_number}
        </Descriptions.Item>

        <Descriptions.Item label='Мови'>
          {pageData.languages || '-'}
        </Descriptions.Item>

        <Descriptions.Item label='Бюджет'>{pageData.budget}</Descriptions.Item>

        <Descriptions.Item label='Захворювання'>
          {pageData.health_characteristics || '-'}
        </Descriptions.Item>

        <Descriptions.Item label='Є паспорт'>
          <Checkbox checked={pageData.is_passport} />
        </Descriptions.Item>

        <Descriptions.Item label='Є закордонний паспорт'>
          <Checkbox checked={pageData.is_international_passport} />
        </Descriptions.Item>

        <Descriptions.Item label='Є документи про освіту'>
          <Checkbox checked={pageData.is_education_doc} />
        </Descriptions.Item>

        <Descriptions.Item label='Свідоцтво про народження дітей'>
          <Checkbox checked={pageData.is_childs_birth_certificate} />
        </Descriptions.Item>

        <Descriptions.Item label='Є тварины'>
          <Checkbox checked={pageData.is_pets} />
        </Descriptions.Item>

        <Descriptions.Item label='Переноска на тварин'>
          <Checkbox checked={pageData.is_pet_carrier} />
        </Descriptions.Item>

        <Descriptions.Item label='Паспорт на тварин'>
          <Checkbox checked={pageData.is_passport_for_animals} />
        </Descriptions.Item>

        <Descriptions.Item label='Є судимість'>
          <Checkbox checked={pageData.criminal_records} />
        </Descriptions.Item>

        <Descriptions.Item label='Є багаж'>
          <Checkbox checked={pageData.is_luggage} />
        </Descriptions.Item>

        <Descriptions.Item label='Можете дістатися до точки відправлення'>
          <Checkbox checked={pageData.is_point} />
        </Descriptions.Item>

        <Descriptions.Item label='Додаткова інформація'>
          {pageData.additionally || '-'}
        </Descriptions.Item>
      </Descriptions>

      <div className={styles.btn_container}>
        <AcceptFormBtn
          isDone={pageData.is_done}
          formId={Number(formId)}
          onClick={load}
        />
      </div>
    </div>
  );
};

export default CitizenInfo;
