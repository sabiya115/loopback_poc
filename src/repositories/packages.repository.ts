import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Packages, PackagesRelations} from '../models';

export class PackagesRepository extends DefaultCrudRepository<
  Packages,
  typeof Packages.prototype.id,
  PackagesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Packages, dataSource);
  }

  // Method to change the collection name dynamically
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
    console.log("colletion name is", collectionName);
  }
}
