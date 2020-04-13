const severeImpact = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;
  const severeCurrentlyInfected = reportedCases * 50;
  let severeInfectionsByRequestedTime;
  let factor;

  if (periodType === 'days') {
    factor = timeToElapse / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  } else if (periodType === 'months') {
    const noOfDays = timeToElapse * 30;
    factor = noOfDays / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  } else {
    const noOfDays = timeToElapse * 7;
    factor = noOfDays / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  }

  const severeCasesByRequestedTime = (15 / 100) * severeInfectionsByRequestedTime;
  const availableBeds = Math.round((65 / 100) * totalHospitalBeds);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
  return {
    severeCurrentlyInfected,
    severeInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

module.exports = {
  severeImpact
};
