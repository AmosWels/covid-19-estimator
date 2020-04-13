// import { severeImpact } from './severeImpact';
// import Impact from './impact.js';
const { Impact } = require('./impact.js');
const { severeImpact } = require('./severeImpact.js');

const covid19ImpactEstimator = (data) => {
  const {
    impactCurrentlyInfected,
    impactInfectionsByRequestedTime,
    impactCasesByRequestedTime,
    impacthospitalBedsByRequestedTime,
    ImpactDollarsInFlight,
    impactCasesForVentilatorsByRequestedTime
  } = Impact(data);
  const {
    severeCurrentlyInfected,
    severeInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    dollarsInFlight,
    casesForVentilatorsByRequestedTime
  } = severeImpact(data);
  const results = [
    {
      estimate: {
        impact: {
          currentlyInfected: impactCurrentlyInfected,
          infectionsByRequestedTime: impactInfectionsByRequestedTime,
          severeCasesByRequestedTime: impactCasesByRequestedTime,
          hospitalBedsByRequestedTime: impacthospitalBedsByRequestedTime,
          dollarsInFlight: ImpactDollarsInFlight,
          casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime
        },
        severeImpact: {
          currentlyInfected: severeCurrentlyInfected,
          infectionsByRequestedTime: severeInfectionsByRequestedTime,
          severeCasesByRequestedTime,
          hospitalBedsByRequestedTime,
          dollarsInFlight,
          casesForVentilatorsByRequestedTime
        }
      }
    }
  ];
  console.log("results", results[0])
  return results;
};

module.exports = {
  covid19ImpactEstimator
};
