// import covid19ImpactEstimator from './estimator.js';
// let router = require('express').Router();
const { covid19ImpactEstimator } = require('./estimator.js');

const Index = () => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 38,
    reportedCases: 2747,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  covid19ImpactEstimator(data);
};

Index();

module.exports = {
  Index
};
