import {BaseService, GET, Query, Response} from 'ts-retrofit';

export interface Bio {
  real_name: string;
  birthplace: string;
}

export interface Rating {
  health: number;
  speed: number;
  difficulty: number;
}

export interface Operator {
  id: string;
  name: string;
  bio: Bio;
  ratings: Rating;
  role: string;
  unit: string;
  png: string;
  meta: Meta;
}

export interface Price {
  renown: number;
  r6credits: number;
}

export interface Meta {
  gender: string;
  country: string;
  season: string;
  height: number;
  weight: number;
  price: Price;
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

  @GET('/op-list/operator_det')
  async getOperator(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('op_id') operatorId: string,
  ): Promise<Response<Operator>> {
    return <Response<Operator>>{};
  }
}
