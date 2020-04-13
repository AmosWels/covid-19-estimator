const severeImpact = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds, population
  } = data;
  const { avgDailyIncomePopulation } = data.region;
  const severeCurrentlyInfected = reportedCases * 50;
  let severeInfectionsByRequestedTime;
  let factor;
  let noOfDays;

  if (periodType === 'days') {
    noOfDays = timeToElapse;
    factor = timeToElapse / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  } else if (periodType === 'months') {
    noOfDays = timeToElapse * 30;
    factor = noOfDays / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  } else {
    noOfDays = timeToElapse * 7;
    factor = noOfDays / 3;
    severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** Math.round(factor));
  }

  const severeCasesByRequestedTime = (15 / 100) * severeInfectionsByRequestedTime;
  const availableBeds = Math.round((65 / 100) * totalHospitalBeds);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;

  const casesForVentilatorsByRequestedTime = (2 / 100) * severeCasesByRequestedTime;

  const avgPopulation = Math.round(((severeInfectionsByRequestedTime - population) / population) * 100);
  const dollarsInFlight = Math.round((severeInfectionsByRequestedTime * avgPopulation) * avgDailyIncomePopulation * noOfDays);
  return {
    severeCurrentlyInfected,
    severeInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    dollarsInFlight,
    casesForVentilatorsByRequestedTime
  };
};

module.exports = {
  severeImpact
};
