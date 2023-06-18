import { ResponseModel } from './responseModel';

export interface SingleResponseNodel<T> extends ResponseModel {
  data: T;
}
