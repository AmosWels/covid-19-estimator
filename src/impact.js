const Impact = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
  const impactCurrentlyInfected = reportedCases * 10;
  let impactInfectionsByRequestedTime;
  let factor;

  if (periodType === 'days') {
    factor = timeToElapse / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  } else if (periodType === 'months') {
    const noOfDays = timeToElapse * 30;
    factor = noOfDays / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  } else {
    const noOfDays = timeToElapse * 7;
    factor = noOfDays / 3;
    impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.round(factor));
  }

  return { impactCurrentlyInfected, impactInfectionsByRequestedTime };
};
module.exports = {
  Impact
};
