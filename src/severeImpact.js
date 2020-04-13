const severeImpact = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
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

  return { severeCurrentlyInfected, severeInfectionsByRequestedTime };
};

module.exports = {
  severeImpact
};
