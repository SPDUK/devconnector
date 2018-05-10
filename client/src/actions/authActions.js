import { TEST_DISPATCH } from './types';
// Register user
export const registerUser = userData => ({
  type: TEST_DISPATCH,
  payload: userData
});
