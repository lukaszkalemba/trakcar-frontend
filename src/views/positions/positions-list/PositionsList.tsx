import React, { memo } from 'react';
import { Position } from 'modules/positions';
import PositionListItem from './position-list-item/PositionListItem';
import styles from './PositionsList.module.scss';

const PositionsList: React.FC<PositionsListProps> = ({ positions }) => {
  return (
    <ul className={styles.list}>
      {positions.map((position) => (
        <PositionListItem key={position._id} position={position} />
      ))}
    </ul>
  );
};

interface PositionsListProps {
  positions: Position[];
}

export default memo(PositionsList);
