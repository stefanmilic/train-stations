import React from 'react';
import { block } from 'bem-cn';
import Home from '@components/Home';
import { TrainStationDataProvider } from './context/TrainStationContext';

const b = block('main-container');

const Main = () => {
  return (
    <div className={b()}>
      <TrainStationDataProvider>
        <Home />
      </TrainStationDataProvider>
    </div>
  );
};

export default Main;
