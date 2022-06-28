/* eslint-disable @typescript-eslint/no-unused-vars */
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

export interface StatsOperator {
  url: string;
  name: string;
  header: string;
  operator: string;
  time_played: string;
  kills: string;
  deaths: string;
  kd: string;
  wins: string;
  losses: string;
  win_: string;
  headshots_: string;
  dbnos: string;
  xp: string;
  melee_kills: string;
  operator_stat: string;
  operator_img: string;
}

export interface APIResponse<T> {
  data: T;
}

export interface APIResponseArray<T> {
  data: T[];
}

export class OperatorService extends BaseService {
  @GET('/op-list/list')
  async listOperators(
    @Query('attacker') attacker: boolean,
  ): Promise<Response<APIResponseArray<Operator>>> {
    return <Response<APIResponseArray<Operator>>>{};
  }
  @GET('/op-list/listAll')
  async listAllOperators(): Promise<Response<APIResponseArray<Operator>>> {
    return <Response<APIResponseArray<Operator>>>{};
  }

  @GET('/op-list/operator_det')
  async getOperator(
    @Query('op_id') operatorId: string,
  ): Promise<Response<Operator>> {
    return <Response<Operator>>{};
  }

  @GET('/op-list/operator_stats')
  async getOperatorStats(
    @Query('platform') platform: string,
    @Query('uname') username: string,
    @Query('op_id') operatorId: string,
  ): Promise<Response<StatsOperator>> {
    return <Response<StatsOperator>>{};
  }
}
