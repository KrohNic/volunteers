import React from 'react';
import { Link } from 'react-router-dom';

import type { ICitizenFormDataForTable } from 'pages/AdminsRoom/types.AdminsRoom';

import { ROUTES } from 'constants/routes';
import AcceptFormBtn from 'pages/AdminsRoom/CitizensTable/AcceptFormBtn/AcceptFormBtn';

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
    render: (name: string, values: ICitizenFormDataForTable) => (
      <Link
        to={`${ROUTES.citizens}/${values.id}`}
        title={values.is_done ? 'Заявка прийнята' : 'Заявка не прийнята'}
      >{`${values.last_name} ${name}`}</Link>
    ),
  },
  {
    title: 'Telegram',
    dataIndex: 'tg_username',
    key: 'tg_username',
    render: (username: string) => (
      <a
        href={`https://t.me/${username}`}
        target='_blank'
        rel='noreferrer'
      >{`@${username}`}</a>
    ),
  },
  {
    title: 'Адреса',
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
