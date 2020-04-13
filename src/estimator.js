// import { severeImpact } from './severeImpact';
// import Impact from './impact.js';
const { Impact } = require('./impact.js');
const { severeImpact } = require('./severeImpact.js');

const covid19ImpactEstimator = (data) => {
  const {
    impactCurrentlyInfected,
    impactInfectionsByRequestedTime,
    impactCasesByRequestedTime,
    impacthospitalBedsByRequestedTime
  } = Impact(data);
  const {
    severeCurrentlyInfected,
    severeInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  } = severeImpact(data);
  const results = [
    {
      estimate: {
        impact: {
          currentlyInfected: impactCurrentlyInfected,
          infectionsByRequestedTime: impactInfectionsByRequestedTime,
          severeCasesByRequestedTime: impactCasesByRequestedTime,
          hospitalBedsByRequestedTime: impacthospitalBedsByRequestedTime
        },
        severeImpact: {
          currentlyInfected: severeCurrentlyInfected,
          infectionsByRequestedTime: severeInfectionsByRequestedTime,
          severeCasesByRequestedTime,
          hospitalBedsByRequestedTime
        }
      }
    }
  ];
  return results;
};

module.exports = {
  covid19ImpactEstimator
};
