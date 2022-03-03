import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface HelmetWrapperProps {
  helmetTitle: string;
}

const HelmetWrapper: FC<HelmetWrapperProps> = ({ children, helmetTitle }) => (
  <>
    <Helmet>
      <title>{helmetTitle}</title>
    </Helmet>
    {children}
  </>
);

export default HelmetWrapper;
