import React, { ReactNode } from 'react';
import TopBar from './top-bar/TopBar';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <TopBar />
      <main>{children}</main>
    </div>
  );
};

export interface LayoutProps {
  children: ReactNode;
}

export default Layout;