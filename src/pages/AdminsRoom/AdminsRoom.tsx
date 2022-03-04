import React from 'react';

import CitizenFormsTable from './CitizenFormsTable/CitizenFormsTable';
import { PageProvider } from './PageProvider/PageProvider';

const AdminsRoom = () => (
  <PageProvider>
    <CitizenFormsTable />
  </PageProvider>
);

export default AdminsRoom;
