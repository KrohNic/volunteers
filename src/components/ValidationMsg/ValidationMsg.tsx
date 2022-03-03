import React, { ReactNode } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { ValidationMsgProps } from './constants.ValidationMsg';

import styles from './ValidationMsg.module.scss';

type BasicDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type DefinedProps = 'children' | 'role';
type NotDefinedBasicDivProps = Omit<BasicDivProps, DefinedProps>;

interface Props extends NotDefinedBasicDivProps {
  message?: ReactNode;
}

const ValidationMsg = ({ message = '', className, ...restProps }: Props) => (
  <div
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
    className={cn('explain-error', styles.container, className)}
    role='alert'
  >
    <AnimatePresence>
      {message && (
        <motion.div
          initial={ValidationMsgProps.initial}
          animate={ValidationMsgProps.animate}
          exit={ValidationMsgProps.exit}
          className={styles.msg}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default ValidationMsg;
