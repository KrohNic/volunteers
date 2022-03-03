import React from 'react';
import { motion } from 'framer-motion';

import { PageChangeAnimProps } from 'constants/animationProps';
import Loader from './Loader';

interface Props {
  className?: string;
}

const MotionLoader = ({ className }: Props) => (
  <motion.div
    key='Loader'
    initial={PageChangeAnimProps.initial}
    animate={PageChangeAnimProps.animate}
    exit={PageChangeAnimProps.exit}
    className={className}
  >
    <Loader />
  </motion.div>
);

export default MotionLoader;
