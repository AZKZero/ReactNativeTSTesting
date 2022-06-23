import {BaseService, GET, Query, Response} from 'ts-retrofit';

export interface Bio {
  real_name: string;
  birthplace: string;
}

export interface Operator {
  id: string;
  name: string;
  bio: Bio;
  role: string;
  unit: string;
  png: string;
}

export interface APIResponseArray<T> {
  data: T[];
}

export class OperatorService extends BaseService {
  @GET('/op-list/list')
  async listOperators(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('attacker') attacker: boolean,
  ): Promise<Response<APIResponseArray<Operator>>> {
    return <Response<APIResponseArray<Operator>>>{};
  }
}
