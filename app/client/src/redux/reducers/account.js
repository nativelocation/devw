import { SET_ACCOUNT } from '../constants'

const initialState = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  tokenAuth:"",
  role: 2
}

export default function account(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...action.data
      }
    default:
      return state
  }
}