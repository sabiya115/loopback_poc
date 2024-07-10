import {inject} from '@loopback/core';
import {
  Count,
  CountSchema, Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, HttpErrors, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {ObjectId} from 'mongodb';
import {Document} from 'mongoose';
import {Packages} from '../models';
import {initializeModels} from '../services/model-initializer';
import {RepositoryHelper} from '../services/repository.injections';


export class ObjectsController {
  private modelObj;
  constructor(
    // @repository(PackagesRepository)
    // public packagesRepository : PackagesRepository,
    // @repository(UserRepository)
    // public userRepository: UserRepository
    @inject('helper.RepositoryHelper')
    private repositoryHelper: RepositoryHelper,
  ) {
    this.modelObj = initializeModels(this.repositoryHelper);
  }

  @post('/v1/classes/{modelname}/objects')
  @response(200, {
    description: 'Packages model instance',
    content: {'application/json': {schema: getModelSchemaRef(Packages)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          // schema: getModelSchemaRef(Packages, {
          //   title: 'NewPackages',
          //   exclude: ['id'],
          // }),
          schema: { type: 'object', additionalProperties: true }
        },
      },
    })
    // packageInstance: Omit<Packages, 'id'>,
    // user: Omit<UserModel, 'id'>,
    requestBody: any,
    @param.header.string('api_key') apiKey: string,
    @param.path.string('modelname') modelname: string,
  ): Promise<any>  {
    console.log("api key is", apiKey);
    if (!apiKey) {
      throw new HttpErrors.BadRequest('API Key is required');
    }
    console.log("modelname is", modelname);
    // if(modelname === "packages") {
    //   const collectionName = `${apiKey}.packages`;
    //   this.packagesRepository.setCollectionName(collectionName)
    //   return this.packagesRepository.create(requestBody);
    // } else if(modelname === "users"){
    //   const collectionName = `${apiKey}.users`;
    //   this.userRepository.setCollectionName(collectionName)
    //   return this.userRepository.create(requestBody);
    // }
this.repositoryHelper.setCollectionName(apiKey,modelname);
return this.repositoryHelper.modalObj[`${modelname}`].create(requestBody);


  }

  @get('/v1/classes/{modelname}/objects/count')
  @response(200, {
    description: 'Packages model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.path.string('modelname') modelname: string,
    @param.where(Packages) where?: Where<Packages>,

  ): Promise<Count> {
    return this.repositoryHelper.modalObj[`${modelname}`].count(where);
  }

  @get('/v1/classes/{modelname}/objects')
  @response(200, {
    description: 'Array of Packages model instances',
    content: {
      'application/json': {
        schema: {
          // type: 'array',
          // items: getModelSchemaRef(Packages, {includeRelations: true}),
          schema: { type: 'object', additionalProperties: true }
        },
      },
    },
  })
  async find(
    @param.header.string('api_key') apiKey: string,
    @param.path.string('modelname') modelname: string,
    // @param.filter(Packages) filter?: Filter<Packages>,

  ): Promise<any[]> {

    if (!apiKey) {
      throw new HttpErrors.BadRequest('API Key is required');
    }
    console.log("modelname is", modelname);
    // if(modelname === "packages") {
    //   const collectionName = `${apiKey}.packages`;
    //   this.packagesRepository.setCollectionName(collectionName)
    //   return this.packagesRepository.find(filter);
    // } else if(modelname === "users"){
    //   const collectionName = `${apiKey}.users`;
    //   this.userRepository.setCollectionName(collectionName)
    //   return this.userRepository.find(filter);
    // }


    return this.repositoryHelper.modalObj[`${modelname}`].find(requestBody)
  }

  // @patch('/v1/classes/{modelname}/objects')
  // @response(200, {
  //   description: 'Packages PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Packages, {partial: true}),
  //       },
  //     },
  //   })
  //   packages: Packages,
  //   @param.where(Packages) where?: Where<Packages>,
  // ): Promise<Count> {
  //   return this.packagesRepository.updateAll(packages, where);
  // }

  @get('/v1/classes/{modelname}/objects/{id}')
  @response(200, {
    description: 'Packages model instance',
    content: {
      'application/json': {
        schema: { type: 'object', additionalProperties: true },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.path.string('modelname') modelname: string,
  ): Promise<Document> {
    let objectId: ObjectId;
    objectId = new ObjectId(id);
    console.log("coming in get by id", id);
    return this.repositoryHelper.modalObj[modelname].find({_id: objectId});
  }

  // @patch('/v1/classes/{modelname}/objects/{id}')
  // @response(204, {
  //   description: 'Packages PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Packages, {partial: true}),
  //       },
  //     },
  //   })
  //   packages: Packages,
  // ): Promise<void> {
  //   await this.packagesRepository.updateById(id, packages);
  // }

  @put('/v1/classes/{modelname}/objects/{id}')
  @response(204, {
    description: 'Packages PUT success',
  })
  async replaceById(
    @param.path.string('id') id: ObjectId,
    @param.path.string('modelname') modelname: string,
    @requestBody() packages: Packages,
  ): Promise<void> {
    const data_id = new ObjectId(id);
    return this.repositoryHelper.modalObj[modelname].updateById({_id: data_id}, packages);
  }

  // @del('/v1/classes/{modelname}/objects/{id}')
  // @response(204, {
  //   description: 'Packages DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: string): Promise<void> {
  //   await this.packagesRepository.deleteById(id);
  // }
}
