/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import '../../assets/css/index.scss';
import validate from 'validate.js';
import '../../assets/css/button.scss';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { CardActions, Button, DialogActions } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import HomeFooter from './homeFooter';
import { covid19ImpactEstimator } from '../../estimator';

const schema = {
  timeToElapse: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 1,
      maximum: 25
    }
  },
  population: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3,
      maximum: 25
    }
  },
  reportedCases: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 1,
      maximum: 25
    }
  },
  totalHospitalBeds: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 25,
      minimum: 2
    }
  }
};

const useStyles = makeStyles((theme) => createStyles({
  formData: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey
  },
  paper: {
    padding: theme.spacing(1),
    //   textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Home = () => {
  const classes = useStyles();
  const [resultsData, setResults] = useState('');
  const [functionData, setData] = useState('');
  const [formState, setFormState] = useState({
    values: {
      period: 'days'
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    // @ts-ignore
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {Object} target
   *
   * @returns {void}
   */

  const handleInputChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name || event.target.id]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleClear = (event) => {
    event.preventDefault();
    setFormState((formState) => ({
      values: {},
      isValid: false,
      touched: {},
      errors: {}
    }));
  };

  const refreshPage = () => {
    window.location.reload(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      reportedCases, timeToElapse, population, period, totalHospitalBeds
    } = formState.values;
    const data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      periodType: period,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };
    setData(data);
    setResults('done');
  };
  const noData = (<Typography variant="caption" display="inline" gutterBottom>
     no data, add to view covid numerics
    </Typography>);
  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));
  return (
    <div className={classes.root} >
            <Grid container direction="row" justify="center" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Covid Estimator
                </Typography>
            </Grid><br/>

      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <Typography variant="overline" display="block" gutterBottom>
        Input Covid details Below
      </Typography>
            <form className={classes.formData} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <TextField
                    type="number"
                    label="Reported Cases"
                    id="outlined-size-normal"
                    placeholder="Reported Cases"
                    variant="outlined"
                    onChange={handleInputChange}
                    name="reportedCases"
                    value={formState.values.reportedCases || ''}
                    error={hasError('reportedCases')}
                    helperText={
                        // @ts-ignore
                        hasError('reportedCases') ? formState.errors.reportedCases[0] : null
                    }
                    />
                    <TextField
                    type="number"
                    label="Total Hospital Beds"
                    id="outlined-size-normal"
                    name="totalHospitalBeds"
                    value={formState.values.totalHospitalBeds || ''}
                    placeholder="Total Hospital Beds"
                    defaultValue="Normal"
                    variant="outlined"
                    error={hasError('totalHospitalBeds')}
                    helperText={
                        // @ts-ignore
                        hasError('totalHospitalBeds') ? formState.errors.totalHospitalBeds[0] : null
                    }
                    onChange={handleInputChange}
                    />
                    <TextField
                    type="number"
                    label="Population"
                    id="outlined-size-normal"
                    name="population"
                    placeholder="Population"
                    defaultValue="Normal"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formState.values.population || ''}
                    error={hasError('population')}
                    helperText={
                        // @ts-ignore
                        hasError('population') ? formState.errors.population[0] : null
                    }
                    />
                </div>
                <div>
                <TextField
                    type="number"
                    label="Time To Elapse"
                    id="outlined-size-normal"
                    name="timeToElapse"
                    placeholder="Time To Elapse"
                    defaultValue="Normal"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formState.values.timeToElapse || ''}
                    error={hasError('timeToElapse')}
                    helperText={
                        // @ts-ignore
                        hasError('timeToElapse') ? formState.errors.timeToElapse[0] : null
                    }
                    />
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Select Period Type (default period is days) </FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                        value="days"
                        control={<Radio color="primary" />}
                        label="Days"
                        labelPlacement="Days"
                        name="period"
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                    value="weeks"
                    control={<Radio color="primary" />}
                    label="Weeks"
                    labelPlacement="Weeks"
                    name="period"
                    onChange={handleInputChange}
                    />
                    <FormControlLabel
                    value="months"
                    control={<Radio color="primary" />}
                    label="Months"
                    labelPlacement="Months"
                    name="period"
                    onChange={handleInputChange}
                    />
                    </RadioGroup>
                    </FormControl>
                </div>
                    <DialogActions>
                    <Button onClick={handleClear} color="primary">
                        Clear
                    </Button>
                    <Button variant="contained" color="primary" type="submit" disabled={!formState.isValid} >
                        data-go-estimate
                    </Button>
                    </DialogActions>
             </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="overline" display="block" gutterBottom>
            View your estimates Below
        </Typography>
        <Typography variant="body1" display="block" gutterBottom style={{ color: '#29b6f6' }}>
            Estimated Impact
        </Typography>
      { resultsData === '' ? noData : (<>
          <Paper className={classes.paper}>CurrentlyInfected : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.impact.currentlyInfected}</span></Paper><br/>
          <Paper className={classes.paper}>Infections By Requested Time : <span style={{ color: 'black' }} >{covid19ImpactEstimator(functionData).estimate.impact.infectionsByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Severe Cases By Requested Time : <span style={{ color: 'black' }} >{covid19ImpactEstimator(functionData).estimate.impact.severeCasesByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Hospital Beds By Requested Time : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.impact.hospitalBedsByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Dollars In Flight : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.impact.dollarsInFlight}</span></Paper><br/>
          <Paper className={classes.paper}>Cases For Ventilators By Requested Time : <span style={{ color: 'black' }} >{covid19ImpactEstimator(functionData).estimate.impact.casesForVentilatorsByRequestedTime}</span></Paper><br/>

        </>)}
        <Typography variant="body1" display="block" gutterBottom style={{ color: '#29b6f6' }}>
        Estimated Severe Impact
      </Typography>
      { resultsData === '' ? noData : (<>
        <Paper className={classes.paper}>CurrentlyInfected : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.severeImpact.currentlyInfected}</span></Paper><br/>
          <Paper className={classes.paper}>Infections By Requested Time : <span style={{ color: 'black' }} >{covid19ImpactEstimator(functionData).estimate.severeImpact.infectionsByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Severe Cases By Requested Time : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.severeImpact.severeCasesByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Hospital Beds By Requested Time : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.severeImpact.hospitalBedsByRequestedTime}</span></Paper><br/>
          <Paper className={classes.paper}>Dollars In Flight : <span style={{ color: 'black' }} >{ covid19ImpactEstimator(functionData).estimate.severeImpact.dollarsInFlight}</span></Paper><br/>
          <Paper className={classes.paper}>Cases For Ventilators By Requested Time : <span style={{ color: 'black' }} >{covid19ImpactEstimator(functionData).estimate.severeImpact.casesForVentilatorsByRequestedTime}</span></Paper><br/>
          </>)}
      </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
