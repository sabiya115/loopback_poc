import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Packages extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  api_key?: string;

  @property({
    type: 'number',
  })
  feedback_count?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Packages>) {
    super(data);
  }
}

export interface PackagesRelations {
  // describe navigational properties here
}

export type PackagesWithRelations = Packages & PackagesRelations;
