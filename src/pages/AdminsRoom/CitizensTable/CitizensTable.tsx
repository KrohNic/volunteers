import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import type { IAuthTokens } from 'pages/Login/types.Login';

import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';
import { getCitizenFormsList } from 'api/api';
import { useCitizenTablePage } from 'pages/AdminsRoom/PageProvider/useCitizenTablePage';
import PageHeaderExitBtn from 'components/PageHeaderExitBtn/PageHeaderExitBtn';
import { useAuth } from 'core/auth/useAuth';
import { AccessError } from 'core/AccessError/AccessError';
import { AdminsRoomColumns } from './columns.CitizensTable';

import styles from './CitizensTable.module.scss';

const pageSize = 15;

const getRowClassName = ({ is_done }: { is_done: boolean }) =>
  is_done ? styles.done_row : styles.undone_row;

const CitizensTable = () => {
  const navigate = useNavigate();
  const { tokens, signout } = useAuth();
  const [tableData, setTableData] = useCitizenTablePage();
  const [isTableDataLoading, setIsTableDataLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTableItems, setTotalTableItems] = useState(0);

  const { accessToken } = tokens as IAuthTokens;

  useEffect(() => {
    const abortController = new AbortController();

    const load = async () => {
      setIsTableDataLoading(true);

      try {
        const { count, results } = await getCitizenFormsList(
          pageNumber,
          pageSize,
          accessToken,
        );

        if (abortController.signal.aborted) return;

        setTableData(results.map((item) => ({ ...item, key: item.id })));
        setTotalTableItems(count);
        setIsTableDataLoading(false);
      } catch (error) {
        if (error instanceof AccessError) signout(window.location.href);
        else throw error;
      }
    };

    load();

    return () => abortController.abort();
  }, [pageNumber, accessToken, setTableData, signout]);

  const goToParentPage = useCallback(() => navigate(ROUTES.root), [navigate]);

  const onPageNumberChange = useCallback((number) => setPageNumber(number), []);

  const pagination = useMemo(
    () => ({
      current: pageNumber,
      pageSize,
      onChange: onPageNumberChange,
      hideOnSinglePage: true,
      showSizeChanger: false,
      total: totalTableItems,
    }),
    [pageNumber, totalTableItems, onPageNumberChange],
  );

  return (
    <div className={styles.container}>
      <PageHeaderExitBtn
        goToParentPage={goToParentPage}
        title={PageTitles.ADMINS_ROOM}
      />

      <Table
        columns={AdminsRoomColumns}
        dataSource={tableData}
        loading={isTableDataLoading}
        pagination={pagination}
        rowClassName={getRowClassName}
        size='small'
        sticky
      />
    </div>
  );
};

export default CitizensTable;
