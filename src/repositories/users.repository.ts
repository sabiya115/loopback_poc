// const UserModel =  require('../models/users.model');

import {Users, UsersRelations} from '../models/users.model';




import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserMetadata} from '../models/user-metadata.model';

export class UserRepository extends DefaultCrudRepository<
// UserMetadata,
//   typeof UserMetadata.prototype.id
Users,
  typeof Users.prototype.id,
  UsersRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    // super(UserMetadata,dataSource);
    // this.modelClass = UserModel;

    super(Users, dataSource)
  }

  setCollectionName(collectionName: string) {
    this.dataSource = new juggler.DataSource({
      ...this.dataSource.settings,
      collection: collectionName,
    });
    if (!this.modelClass.definition.settings) {
      this.modelClass.definition.settings = {};
    }
    this.modelClass.definition.settings.mongodb = {
      collection: collectionName,
    };
  }

  async createDocument(data: Partial<UserMetadata>): Promise<UserMetadata> {
    // Ensure UserModel is casted to any to access custom static methods
    const userModel = this.modelClass as any;
    return userModel.createDocument(data);
  }

  // Add any custom methods if needed
}


