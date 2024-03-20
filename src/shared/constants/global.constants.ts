//eslint-disable-next-line
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SIGNATURE;
export const JWT_EXPIRY_SECONDS = 3600;



export enum Role {
  Admin = 'admin',
  User = 'user',
  Sales = 'sales',
  Billing = 'billing',
  Supervisor = 'supervisor',
  SuperAdmin = 'super-admin'
}
export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 100;

export const DEFAULT_SORT_BY = 'id';

export const API_PREFIX = '/api/v1';

//Regex
export const PHONE_REGEX = /^[0-9\s+-.()]+$/;

export const SLUG_SEPARATOR = '-';


/* Model Select Attributes */
export const USER_ATTRIBUTES = ["id", "firstName", "lastName", "mobile", "email", "isActive", "isMobileAccessOnly"]
export const ROLE_ATTRIBUTES = ["id", "name"]