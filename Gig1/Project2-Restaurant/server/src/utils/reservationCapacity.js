const ZONE_CAPACITY = Object.freeze({
  'Main Dining Hall': 40,
  'Outdoor Terrace Garden': 24,
  'Private Chef Table': 8,
  'Skyline Rooftop Lounge': 30
});

const isReservationActive = (status) => !['Cancelled', 'Completed'].includes(status);

module.exports = { ZONE_CAPACITY, isReservationActive };
