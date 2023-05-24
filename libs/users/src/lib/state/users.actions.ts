import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';


export const buildUserSession = createAction('[Users] Build User Session');

export const initUsers = createAction('[Users Page] Init');

export const buildUserSessionsSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailed = createAction(
  '[Users] Build User Session Failed',
);
