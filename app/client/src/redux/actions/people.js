import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE } from '../constants';

export function getPeople() {
  return {
    type: FETCHING_PEOPLE
  }
}

export function getPeopleSuccess(data) {
  return {
    type: FETCHING_PEOPLE_SUCCESS,
    data,
  }
}

export function getPeopleFailure() {
  return {
    type: FETCHING_PEOPLE_FAILURE
  }
}
