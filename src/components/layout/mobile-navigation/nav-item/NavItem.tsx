import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon/Icon';
import styles from './NavItem.module.scss';

const NavItem: React.FC<NavItemProps> = ({ to, icon }) => {
  return (
    <NavLink
      exact
      to={to}
      className={styles.navLink}
      activeClassName={styles.active}
    >
      <Icon src={icon} className={styles.icon} />
    </NavLink>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
}

export default NavItem;
