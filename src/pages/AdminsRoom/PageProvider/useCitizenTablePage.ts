import { useContext } from 'react';

import { PageContext } from './PageProvider';

export const useCitizenTablePage = () => useContext(PageContext);
