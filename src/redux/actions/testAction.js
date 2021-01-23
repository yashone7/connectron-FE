import { setAlert } from './alertAction';
import {
  CONDUCT_TEST,
  CONDUCT_TEST_ERROR,
  // UPDATE_TEST_RESULT_ERROR,
  // UPDATE_TEST_RESULT,
  // GET_ALL_TEST_RESULTS,
  // GET_ALL_TEST_RESULTS_ERROR,
  // GET_TEST_RESULTS_ORDER_BY_DATE_ERROR,
  // GET_TEST_RESULTS_ORDER_BY_DATE,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE,
  // GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE_ERROR,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK,
  // GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK_ERROR,
} from './types/actionTypes';
import _ from 'lodash';
import client from '../../feathers/feathersClient';

export const conductTest = ({
  test_date,
  doctor_id,
  patient_id,
  latitude,
  longitude,
  status,
}) => async (dispatch) => {
  let location = {};
  let coordinates = [];
  coordinates.push(longitude, latitude);
  _.assign(location, {
    type: 'Point',
    coordinates: coordinates,
  });
  try {
    const testService = client.service('tests');
    const res = await testService.create({
      test_date,
      doctor_id,
      patient_id,
      status,
      location,
    });
    dispatch({
      type: CONDUCT_TEST,
      payload: res,
    });
    dispatch(setAlert('test record created successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: CONDUCT_TEST_ERROR });
  }
};

// export const updateTestResult = (
//   { test_date, doctor_id, status, latitude, longitude },
//   id
// ) => async (dispatch) => {
//   let location = {};
//   let coordinates = [];
//   coordinates.push(longitude, latitude);
//   _.assign(location, {
//     type: "MultiPoint",
//     coordinates: coordinates,
//   });
//   const body = JSON.stringify({
//     test_date,
//     doctor_id,
//     status,
//     location,
//   });
//   try {
//     const res = await axios({
//       method: "POST",
//       // url: apiEndpoint + "/api/tests",
//       url: "/api/tests",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: body,
//     });
//     dispatch({
//       type: UPDATE_TEST_RESULT,
//       payload: res.data,
//     });
//     dispatch(setAlert("Chemist created successfully", "success"));
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({ type: UPDATE_TEST_RESULT_ERROR });
//   }
// };

// export const getAllTestResults = () => async (dispatch) => {
//   try {
//     // const res = await axios.get(`${apiEndpoint}/api/tests?orderBy=none`);
//     const res = await axios.get(`/api/tests?orderBy=none`);
//     dispatch({ type: GET_ALL_TEST_RESULTS, payload: res.data });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({ type: GET_ALL_TEST_RESULTS_ERROR });
//   }
// };

// export const getTestResultsOrderedByDate = (startDate, endDate) => async (
//   dispatch
// ) => {
//   try {
//     // const res = await axios.get(
//     //   `${apiEndpoint}/api/tests?orderBy=date&startDate=${startDate}&endDate=${endDate}`
//     // );
//     const res = await axios.get(
//       `/api/tests?orderBy=date&startDate=${startDate}&endDate=${endDate}`
//     );
//     dispatch({ type: GET_TEST_RESULTS_ORDER_BY_DATE, payload: res.data });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({ type: GET_TEST_RESULTS_ORDER_BY_DATE_ERROR });
//   }
// };

// export const getTestResultsMatchByNegativeGroupByNone = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=negative&groupBy=none`
//       `/api/tests?matchBy=negative&groupBy=none`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByNegativeGroupByHealthy = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=negative&groupBy=healthy`
//       `/api/tests?matchBy=negative&groupBy=healthy`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByNegativeGroupByHighRisk = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=negative&groupBy=highRisk`
//       `/api/tests?matchBy=negative&groupBy=highRisk`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByPositiveGroupByHighRisk = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=positive&groupBy=highRisk`
//       `/api/tests?matchBy=positive&groupBy=highRisk`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByPositiveGroupByNotHighRisk = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=positive&groupBy=notHighRisk`
//       `/api/tests?matchBy=positive&groupBy=notHighRisk`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByPositiveGroupByNone = () => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=positive&groupBy=none`
//       `/api/tests?matchBy=positive&groupBy=none`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByPositiveOrderByDate = (
//   startDate,
//   endDate
// ) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=positive&orderBy=date&startDate=${startDate}&endDate=${endDate}`
//       `/api/tests?matchBy=positive&orderBy=date&startDate=${startDate}&endDate=${endDate}`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE_ERROR,
//     });
//   }
// };

// export const getTestResultsMatchByNegativeOrderByDate = (
//   startDate,
//   endDate
// ) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       // `${apiEndpoint}/api/tests?matchBy=negative&orderBy=date&startDate=${startDate}&endDate=${endDate}`
//       `/api/tests?matchBy=negative&orderBy=date&startDate=${startDate}&endDate=${endDate}`
//     );
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, "danger"));
//       }
//     }
//     dispatch({
//       type: GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE_ERROR,
//     });
//   }
// };
