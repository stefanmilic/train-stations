import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSubway,
  faBus,
  faTram,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';

// dont know all types of transports
const transportIcons = {
  train: faSubway,
  tram: faTram,
  bus: faBus,
  walk: faWalking,
};

interface IconProps {
  type: string;
}

const Icon: React.SFC<IconProps> = ({ type }) => (
  <div>
    <FontAwesomeIcon icon={transportIcons[type]} size='2x' />
  </div>
);

export default Icon;
