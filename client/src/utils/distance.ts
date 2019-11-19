import moment from 'moment';

export function mesureDistance(departure: string, arrival: string) {
  // start time and end time
  const startTime = moment(departure);
  const endTime = moment(arrival);

  // calculate total duration
  const date = moment.duration(endTime.diff(startTime));
  const hours = date.hours() !== 0 ? `${date.hours()}h` : '';
  const minutes = date.minutes() !== 0 ? `${date.minutes()}m` : '';
  const seconds = date.seconds() !== 0 ? `${date.seconds()}s` : '';

  return `${hours} ${minutes} ${seconds}`;
}
