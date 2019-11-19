import React from 'react';
import SearchForm from './SearchForm';
import { block } from 'bem-cn';
import ActionCard from './AccordionCard';

import { useTrainStationData } from 'src/context/TrainStationContext';

const b = block('home');

const Home = () => {
  const { duration, transfers, sections, error } = useTrainStationData();

  return (
    <div className={b()}>
      <SearchForm />
      {sections.length > 0 && (
        <>
          <div className={b('info')}>
            <div>
              Duration {duration.day} {duration.hours} {duration.minutes}{' '}
              {duration.seconds}
            </div>
            <div>Transfers {transfers}</div>
          </div>
          <br />
          {sections.map((section, i) => {
            // use Id instead
            return <ActionCard key={i} {...section} />;
          })}
        </>
      )}
      <div className={b('error')}>{error}</div>
    </div>
  );
};

export default Home;
