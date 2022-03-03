import React from 'react';
import { Spin } from 'antd';
import cn from 'classnames';

import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

const Loader = ({ className }: Props) => (
  <div className={cn(styles.align_middle, className)}>
    <Spin size='large' />
  </div>
);

export default Loader;
