import React, { FunctionComponent, Suspense } from 'react';
import { FullScreenProgress } from '../FullScreenProgress';

export interface SuspenseComponentProps {
  children: React.ReactNode;
}

export const SuspenseComponent: FunctionComponent<SuspenseComponentProps> = ({ children }) => {
  return <Suspense fallback={<FullScreenProgress />}>{children}</Suspense>;
};
