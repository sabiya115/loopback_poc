import {repository} from '@loopback/repository';
import {PackagesRepository} from '../repositories/packages.repository';
import {UserRepository} from '../repositories/users.repository';

export class RepositoryHelper {
  public modalObj: { [key: string]: any };
  constructor(
    @repository(PackagesRepository)
    public packagesRepository: PackagesRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
    this.packagesRepository = packagesRepository;

    this.modalObj = {
      "packages": this.packagesRepository,
      "users": this.userRepository
    }
  }

  setCollectionName(apiKey:string, modelname: string) {
    this.modalObj[modelname].setCollectionName(`${apiKey}.${modelname}`)
  }
  // getRepository(modelname: string) {
  //   // this.userRepository.cr
  //   switch (modelname) {
  //     case 'users':
  //       return this.userRepository;
  //     case 'packages':
  //       return this.packagesRepository;
  //     default:
  //       throw new Error(`Invalid model name: ${modelname}`);
  //   }
  // }
}
