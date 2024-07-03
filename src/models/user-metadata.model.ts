import {Entity, model, property} from '@loopback/repository';

@model()
export class UserMetadata extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<UserMetadata>) {
    super(data);
  }
}
