import * as React from 'react';
import { block } from 'bem-cn';
import moment from 'moment';
import { Section, PassList } from 'src/types/station';
import { mesureDistance } from 'src/utils/distance';
import Arrow from './Arrow';
import Icon from './Icon';

const b = block('accordion-card');

interface TypeTransportProps {
  transportName: string;
  destination: string;
}

const TypeTransport: React.FC<TypeTransportProps> = ({
  transportName,
  destination,
}) => (
  <div>
    {!transportName ? (
      'Walk '
    ) : (
      <span>
        Take <b className={b('transport-name')}> {transportName} </b>{' '}
      </span>
    )}
    to {destination}
  </div>
);

const StationList = (list: PassList, i: number) => {
  return (
    <div key={i} className={'list'}>
      <span className={b('time')}>
        {list.arrival && moment(list.arrival).format('HH:mm')}
      </span>
      {list.station.name}
    </div>
  );
};

const AccordionCard: React.FC<Section> = ({
  departure,
  arrival,
  journey,
  walk,
}) => {
  const [setActive, setActiveState] = React.useState(false);
  const passLists = journey && journey.passList && journey.passList.length;

  function toggleAccordion() {
    passLists && setActiveState(!setActive);
  }

  return (
    <div className={b()}>
      <div className={b('header')} onClick={toggleAccordion}>
        <div className={b('transport-icon')}>
          <Icon type={(journey && journey.transportType) || 'walk'} />
        </div>
        <div className={b('info')}>
          <div className={b('destination')}>
            <TypeTransport
              destination={arrival.station.name}
              transportName={journey && journey.name}
            />
          </div>
          <div className={b('distance')}>
            <span>{mesureDistance(departure.departure, arrival.arrival)}</span>
            {!walk && <span>{passLists} stations</span>}
          </div>
        </div>
        {passLists && (
          <Arrow
            className={String(
              b('header-icon', {
                state: setActive ? 'expanded' : 'collapsed',
              }),
            )}
            width={20}
            fill={'#777'}
          />
        )}
      </div>
      <div
        className={b('body', { state: setActive ? 'expanded' : 'collapsed' })}
      >
        {journey && journey.passList.map(StationList)}
      </div>
    </div>
  );
};

export default AccordionCard;
