import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';

import type { IAuthTokens } from 'pages/Login/types.Login';

import { setCitizenFormIsDone } from 'api/api';
import { useCitizenTablePage } from 'pages/AdminsRoom/PageProvider/useCitizenTablePage';
import { useAuth } from 'core/auth/useAuth';
import { AccessError } from 'core/AccessError/AccessError';

interface Props {
  formId: number;
  isDone: boolean;
  onClick?: () => void;
}

const AcceptFormBtn = ({ isDone, formId, onClick = () => {} }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setTableData] = useCitizenTablePage();
  const { tokens, signout } = useAuth();
  const { accessToken } = tokens as IAuthTokens;

  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => () => abortController.abort(), [abortController]);

  const setIsDone = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await setCitizenFormIsDone(formId, !isDone, accessToken);
    } catch (error) {
      if (error instanceof AccessError) signout(window.location.href);
      else throw error;
    }

    if (abortController.signal.aborted) return;

    onClick();
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
  }, [
    isLoading,
    isDone,
    formId,
    abortController,
    accessToken,
    onClick,
    setTableData,
    signout,
  ]);

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
