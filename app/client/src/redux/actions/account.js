import { SET_ACCOUNT } from '../constants';

export function setAccount(data) {
  return {
    type: SET_ACCOUNT,
    data
  }
}
