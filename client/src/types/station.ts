export interface Station {
  id: string;
  name: string;
  score: number;
  coordinate: any;
  distance: string;
}

export interface PassList {
  arrival: string;
  departure: string;
  platform: number;
  station: Station;
}

export interface Journey {
  transportType: string;
  name: string;
  number: number;
  categoryCode: number;
  operator: string;
  passList: PassList[];
}

export interface StationInfo {
  arrival: string;
  departure: string;
  station: Station;
}

export interface Section {
  arrival: StationInfo;
  departure: StationInfo;
  journey: Journey;
  walk: any;
}

export interface Duration {
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
}
