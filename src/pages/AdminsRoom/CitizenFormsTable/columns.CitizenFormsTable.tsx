import React from 'react';
import { Link } from 'react-router-dom';

import type { ICitizenFormDataForTable } from 'pages/AdminsRoom/types.AdminsRoom';

import { ROUTES } from 'constants/routes';
import AcceptFormBtn from 'pages/AdminsRoom/CitizenFormsTable/AcceptFormBtn/AcceptFormBtn';

import styles from './FormLink.module.scss';

export const AdminsRoomColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: "Ім'я",
    dataIndex: 'name',
    key: 'name',
    render: (_: unknown, values: ICitizenFormDataForTable) => (
      <Link
        to={`${ROUTES.citizens}/${values.id}`}
        className={values.is_done ? styles.accepted : styles.waiting}
        title={values.is_done ? 'Заявка прийнята' : 'Заявка не прийнята'}
      >{`${values.last_name} ${values.name}`}</Link>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Номер телефону',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Прийняти заявку',
    key: 'accept',
    render: (_: unknown, values: ICitizenFormDataForTable) => (
      <AcceptFormBtn formId={values.id} isDone={values.is_done} />
    ),
  },
];
