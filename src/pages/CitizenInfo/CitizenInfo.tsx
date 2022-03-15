import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';

import type { ICitizensFormValues } from 'pages/CitizenForm/types.CitizenForm';
import type { IAuthTokens } from 'pages/Login/types.Login';

import { getCitizenForm } from 'api/api';
import Loader from 'components/Loader/Loader';
import PageHeaderExitBtn from 'components/PageHeaderExitBtn/PageHeaderExitBtn';
import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';
import AcceptFormBtn from 'pages/AdminsRoom/CitizensTable/AcceptFormBtn/AcceptFormBtn';
import { useAuth } from 'core/auth/useAuth';

import styles from './CitizenInfo.module.scss';

const CitizenInfo = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<ICitizensFormValues | null>(null);
  const { tokens, signout } = useAuth();
  const { accessToken } = tokens as IAuthTokens;

  const load = useCallback(async () => {
    if (formId === undefined) return;

    setPageData(null);

    const response = await getCitizenForm(Number(formId), accessToken);

    if (!('status' in response)) {
      setPageData(response);
    } else if (response.status === 404) {
      navigate(ROUTES.notFound, { state: { from: window.location.href } });
    } else if (response.status === 401) {
      signout(window.location.href);
    }
  }, [accessToken, formId, signout, navigate]);

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

      <table className={styles.table}>
        <tr>
          <th>Місто</th>
          <td>{pageData.city}</td>
        </tr>

        <tr>
          <th>Ім&apos;я</th>
          <td>{pageData.name}</td>
        </tr>

        <tr>
          <th>Прізвище</th>
          <td>{pageData.last_name}</td>
        </tr>

        <tr>
          <th>Telegram username</th>
          <td>
            <a
              href={`https://t.me/${pageData.tg_username}`}
              target='_blank'
              rel='noreferrer'
            >{`@${pageData.tg_username}`}</a>
          </td>
        </tr>

        <tr>
          <th>Кількість людей</th>
          <td>{pageData.number_of_people}</td>
        </tr>

        <tr>
          <th>Номер телефону</th>
          <td>{pageData.phone_number}</td>
        </tr>

        <tr>
          <th>Мови</th>
          <td>{pageData.languages || '-'}</td>
        </tr>

        <tr>
          <th>Бюджет</th>
          <td>{pageData.budget}</td>
        </tr>

        <tr>
          <th>Захворювання</th>
          <td>{pageData.health_characteristics || '-'}</td>
        </tr>

        <tr>
          <th>Є паспорт</th>
          <td>
            <Checkbox checked={pageData.is_passport} />
          </td>
        </tr>

        <tr>
          <th>Є закордонний паспорт</th>
          <td>
            <Checkbox checked={pageData.is_international_passport} />
          </td>
        </tr>

        <tr>
          <th>Є документи про освіту</th>
          <td>
            <Checkbox checked={pageData.is_education_doc} />
          </td>
        </tr>

        <tr>
          <th>Свідоцтво про народження дітей</th>
          <td>
            <Checkbox checked={pageData.is_childs_birth_certificate} />
          </td>
        </tr>

        <tr>
          <th>Є тварины</th>
          <td>
            <Checkbox checked={pageData.is_pets} />
          </td>
        </tr>

        <tr>
          <th>Переноска на тварин</th>
          <td>
            <Checkbox checked={pageData.is_pet_carrier} />
          </td>
        </tr>

        <tr>
          <th>Паспорт на тварин</th>
          <td>
            <Checkbox checked={pageData.is_passport_for_animals} />
          </td>
        </tr>

        <tr>
          <th>Є судимість</th>
          <td>
            <Checkbox checked={pageData.criminal_records} />
          </td>
        </tr>

        <tr>
          <th>Є багаж</th>
          <td>
            <Checkbox checked={pageData.is_luggage} />
          </td>
        </tr>

        <tr>
          <th>Можете дістатися до точки відправлення</th>
          <td>
            <Checkbox checked={pageData.is_point} />
          </td>
        </tr>

        <tr>
          <th>Додаткова інформація</th>
          <td>{pageData.additionally || '-'}</td>
        </tr>
      </table>

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
