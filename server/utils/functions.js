const mapDuration = dur => {
  const date = dur.split('d');
  const day = date[0] !== '00' ? `${date[0]}d` : '';
  const [hh, mm, ss] = date[1].split(':');
  return {
    day,
    hours: hh !== '00' ? `${hh}h` : '',
    minutes: mm !== '00' ? `${mm}m` : '',
    seconds: ss !== '00' ? `${ss}s` : '',
  };
};

module.exports = {
  mapDuration,
};
