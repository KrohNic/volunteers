import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';

import { setCitizenFormIsDone } from 'api/api';
import { useCitizenTablePage } from 'pages/AdminsRoom/PageProvider/useCitizenTablePage';

interface Props {
  formId: number;
  isDone: boolean;
  onClick?: () => void;
}

const AcceptFormBtn = ({ isDone, formId, onClick = () => {} }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setTableData] = useCitizenTablePage();

  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => () => abortController.abort(), [abortController]);

  const setIsDone = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    await setCitizenFormIsDone(formId, !isDone);

    onClick();

    if (abortController.signal.aborted) return;

    setTableData((prevData) => {
      const dataCopy = [...prevData];
      const dataItemIndex = dataCopy.findIndex(({ id }) => id === formId);

      dataCopy[dataItemIndex] = {
        ...dataCopy[dataItemIndex],
        is_done: !isDone,
      };

      return dataCopy;
    });
    setIsLoading(false);
  }, [isLoading, isDone, formId, abortController, onClick, setTableData]);

  if (isDone)
    return (
      <Button type='primary' danger onClick={setIsDone} loading={isLoading}>
        Відкликати
      </Button>
    );

  return (
    <Button type='primary' onClick={setIsDone} loading={isLoading}>
      Прийняти
    </Button>
  );
};

export default AcceptFormBtn;
