import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository, Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Packages} from '../models';
import {PackagesRepository} from '../repositories';
import {UserRepository} from '../repositories/users.repository';


export class ObjectsController {
  constructor(
    @repository(PackagesRepository)
    public packagesRepository : PackagesRepository,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

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
    if(modelname === "packages") {
      const collectionName = `${apiKey}.packages`;
      this.packagesRepository.setCollectionName(collectionName)
      return this.packagesRepository.create(requestBody);
    } else if(modelname === "users"){
      const collectionName = `${apiKey}.users`;
      this.userRepository.setCollectionName(collectionName)
      return this.userRepository.create(requestBody);
    }


  }

  @get('/v1/classes/{modelname}/objects/count')
  @response(200, {
    description: 'Packages model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Packages) where?: Where<Packages>,
  ): Promise<Count> {
    return this.packagesRepository.count(where);
  }

  @get('/v1/classes/{modelname}/objects')
  @response(200, {
    description: 'Array of Packages model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Packages, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Packages) filter?: Filter<Packages>,
  ): Promise<Packages[]> {
    return this.packagesRepository.find(filter);
  }

  @patch('/v1/classes/{modelname}/objects')
  @response(200, {
    description: 'Packages PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packages, {partial: true}),
        },
      },
    })
    packages: Packages,
    @param.where(Packages) where?: Where<Packages>,
  ): Promise<Count> {
    return this.packagesRepository.updateAll(packages, where);
  }

  @get('/v1/classes/{modelname}/objects/{id}')
  @response(200, {
    description: 'Packages model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Packages, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Packages, {exclude: 'where'}) filter?: FilterExcludingWhere<Packages>
  ): Promise<Packages> {
    return this.packagesRepository.findById(id, filter);
  }

  @patch('/v1/classes/{modelname}/objects/{id}')
  @response(204, {
    description: 'Packages PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packages, {partial: true}),
        },
      },
    })
    packages: Packages,
  ): Promise<void> {
    await this.packagesRepository.updateById(id, packages);
  }

  @put('/v1/classes/{modelname}/objects/{id}')
  @response(204, {
    description: 'Packages PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() packages: Packages,
  ): Promise<void> {
    await this.packagesRepository.replaceById(id, packages);
  }

  @del('/v1/classes/{modelname}/objects/{id}')
  @response(204, {
    description: 'Packages DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.packagesRepository.deleteById(id);
  }
}
