const Impact = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds, population
  } = data;
  const { avgDailyIncomePopulation } = data.region;
  const impactCurrentlyInfected = reportedCases * 10;
  let impactInfectionsByRequestedTime;
  let factor;
  let noOfDays;

  if (periodType === 'days') {
    noOfDays = timeToElapse;
    factor = noOfDays / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  } else if (periodType === 'months') {
    noOfDays = timeToElapse * 30;
    factor = noOfDays / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  } else {
    noOfDays = timeToElapse * 7;
    factor = noOfDays / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  }

  const impactCasesByRequestedTime = (15 / 100) * impactInfectionsByRequestedTime;
  const availableBeds = Math.round((65 / 100) * totalHospitalBeds);
  const impacthospitalBedsByRequestedTime = availableBeds - impactCasesByRequestedTime;
  const casesForICUByRequestedTime = (5 / 100) * impactInfectionsByRequestedTime;
  const impactCasesForVentilatorsByRequestedTime = (2 / 100) * impactInfectionsByRequestedTime;

  const avgPopulation = Math.round(((impactInfectionsByRequestedTime - population) / population) * 100);
  const ImpactDollarsInFlight = Math.round((impactInfectionsByRequestedTime * avgPopulation) * avgDailyIncomePopulation * noOfDays);
  return {
    impactCurrentlyInfected,
    impactInfectionsByRequestedTime,
    impactCasesByRequestedTime,
    impacthospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    impactCasesForVentilatorsByRequestedTime,
    ImpactDollarsInFlight
  };
};
module.exports = {
  Impact
};
