import {
  CREATE_PATIENT,
  CREATE_PATIENT_ERROR,
  EDIT_PATIENT,
  EDIT_PATIENT_ERROR,
} from './types/actionTypes';
import { setAlert } from './alertAction';
import _ from 'lodash';
import client from '../../feathers/feathersClient';

export const createPatient = ({
  name,
  age,
  gender,
  uniqueID,
  phone,
  email,
  address,
  latitude,
  longitude,
  occupation,
  category,
  isHighRisk,
  isDiabetic,
  hasHighBloodPressure,
  isAsthmatic,
  remarks,
}) => async (dispatch) => {
  let contact = {};
  let location = {};
  let coordinates = [];
  let occupationDetails = {};
  let medicalHistory = {};

  coordinates.push(longitude, latitude);
  _.assign(location, {
    type: 'Point',
    coordinates: coordinates,
  });

  _.assign(medicalHistory, {
    isHighRisk,
    isAsthmatic,
    isDiabetic,
    hasHighBloodPressure,
    remarks,
  });

  _.assign(occupationDetails, { occupation, category });

  _.assign(contact, { phone, email, address, location });

  try {
    const patientsService = client.service('patients');
    const res = await patientsService.create({
      name,
      age,
      gender,
      uniqueID,
      contact,
      medicalHistory,
      occupationDetails,
    });
    console.log(res);
    dispatch({ type: CREATE_PATIENT, payload: res });
    dispatch(setAlert('Patient created successfully', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: CREATE_PATIENT_ERROR });
  }
};

// export const updatePatient = ({ name, gender, age }, id) => async (
//   dispatch
// ) => {
//   const body = JSON.stringify({ name, age, gender });
//   try {
//     //const res =
//     //dispatch({ type: EDIT_PATIENT, payload: res.data });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     console.log(errors);
//     if (errors) {
//       for (let error of errors) {
//         dispatch(setAlert(error.msg, 'danger'));
//       }
//     }
//     dispatch({ type: EDIT_PATIENT_ERROR });
//   }
// };
