import React from 'react';
import { Button, PageHeader } from 'antd';

import { useAuth } from 'core/auth/useAuth';

import styles from './PageHeaderExitBtn.module.scss';

interface Props {
  title: string;
  goToParentPage: () => void;
}

const PageHeaderExitBtn = ({ title, goToParentPage }: Props) => {
  const { signout } = useAuth();

  return (
    <PageHeader
      onBack={goToParentPage}
      title={title}
      className={styles.header}
      extra={[
        <Button key='1' type='text' danger onClick={signout}>
          Вийти
        </Button>,
      ]}
    />
  );
};

export default PageHeaderExitBtn;
