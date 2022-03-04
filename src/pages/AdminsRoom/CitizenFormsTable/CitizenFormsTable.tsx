import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, PageHeader, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';
import { getCitizenFormsList } from 'api/api';
import { useCitizenTablePage } from 'pages/AdminsRoom/PageProvider/useCitizenTablePage';
import { useAuth } from 'core/auth/useAuth';
import { AdminsRoomColumns } from './columns.CitizenFormsTable';

import styles from './CitizenFormsTable.module.scss';

const CitizenFormsTable = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [tableData, setTableData] = useCitizenTablePage();
  const [isTableDataLoading, setIsTableDataLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTableItems, setTotalTableItems] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const load = async () => {
      setIsTableDataLoading(true);

      const { total, data } = await getCitizenFormsList(pageNumber);

      if (abortController.signal.aborted) return;

      setTableData(data.map((item) => ({ ...item, key: item.id })));
      setTotalTableItems(total);
      setIsTableDataLoading(false);
    };

    load();

    return () => abortController.abort();
  }, [pageNumber, setTableData]);

  const goToParentPage = useCallback(() => navigate(ROUTES.root), [navigate]);

  const onPageNumberChange = useCallback((number) => setPageNumber(number), []);

  const pagination = useMemo(
    () => ({
      current: pageNumber,
      pageSize: 10,
      onChange: onPageNumberChange,
      hideOnSinglePage: true,
      showSizeChanger: false,
      total: totalTableItems,
    }),
    [pageNumber, totalTableItems, onPageNumberChange],
  );

  return (
    <div className={styles.container}>
      <PageHeader
        onBack={goToParentPage}
        title={PageTitles.ADMINS_ROOM}
        className={styles.header}
        extra={[
          <Button key='1' type='text' danger onClick={signout}>
            Вийти
          </Button>,
        ]}
      />

      <Table
        columns={AdminsRoomColumns}
        dataSource={tableData}
        loading={isTableDataLoading}
        pagination={pagination}
        size='small'
        sticky
      />
    </div>
  );
};

export default CitizenFormsTable;
