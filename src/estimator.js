// import { severeImpact } from './severeImpact';
// import Impact from './impact.js';
const { Impact } = require('./impact.js');
const { severeImpact } = require('./severeImpact.js');

const covid19ImpactEstimator = (data) => {
  const { impactCurrentlyInfected, impactInfectionsByRequestedTime } = Impact(data);
  const { severeCurrentlyInfected, severeInfectionsByRequestedTime } = severeImpact(data);
  const results = [
    {
      estimate: {
        impact: {
          currentlyInfected: impactCurrentlyInfected,
          infectionsByRequestedTime: impactInfectionsByRequestedTime
        },
        severeImpact: {
          currentlyInfected: severeCurrentlyInfected,
          infectionsByRequestedTime: severeInfectionsByRequestedTime
        }
      }
    }
  ];
  return results;
};

module.exports = {
  covid19ImpactEstimator
};
