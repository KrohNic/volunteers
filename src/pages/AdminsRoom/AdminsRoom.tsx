import React from 'react';

import CitizensTable from './CitizensTable/CitizensTable';
import { PageProvider } from './PageProvider/PageProvider';

const AdminsRoom = () => (
  <PageProvider>
    <CitizensTable />
  </PageProvider>
);

export default AdminsRoom;
