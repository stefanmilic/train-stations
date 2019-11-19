import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react';
import { Section, Duration } from 'src/types/station';

export interface TrainStationData {
  sections: Section[];
  duration: Duration;
  transfers: number;
  error?: string;
}

type setTrainStationData = Dispatch<SetStateAction<TrainStationData>>;

export const TrainStationDataContext = createContext<
  TrainStationData | undefined
>(undefined);
export const SetTrainStationContext = createContext<
  setTrainStationData | undefined
>(undefined);

const initialTrainStation: TrainStationData = {
  sections: [],
  duration: {
    day: '',
    hours: '',
    minutes: '',
    seconds: '',
  },
  transfers: 0,
  error: '',
};

export const TrainStationDataProvider: React.FC = ({ children }) => {
  const [trainStationData, setTrainStationData] = useState(initialTrainStation);

  return (
    <SetTrainStationContext.Provider value={setTrainStationData}>
      <TrainStationDataContext.Provider value={trainStationData}>
        {children}
      </TrainStationDataContext.Provider>
    </SetTrainStationContext.Provider>
  );
};

export const useTrainStationData = () => {
  const trainStationData = useContext(TrainStationDataContext);

  if (trainStationData === undefined) {
    throw new Error('You must use this hook inside TrainStationDataProvider');
  }

  return trainStationData;
};

export const useSetTrainStationData = () => {
  const setTrainStationData = useContext(SetTrainStationContext);

  if (setTrainStationData === undefined) {
    throw new Error('You must use this hook inside TrainStationDataProvider');
  }

  return setTrainStationData;
};
