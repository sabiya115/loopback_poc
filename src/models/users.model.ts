// import {mongooseCorePlugin} from '../utils/mongooseCorePlugin';

// const mongoose = require('mongoose');

// // Define the Mongoose schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   // Add more fields as needed
// });

// userSchema.plugin(mongooseCorePlugin);

// // Create the Mongoose model
// export const UserModel = mongoose.model('User', userSchema);






import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Users extends Entity {
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
  email: string;

  @property({
    type: 'string',
  })
  name: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type PackagesWithRelations = Users & UsersRelations;


