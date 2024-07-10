import {Repository} from '@loopback/repository';
import {RepositoryHelper} from './repository.injections';

export function initializeModels(
  modalServiceProvider: RepositoryHelper
): { [key: string]: Repository<any> } {
  return {
    "packages": modalServiceProvider.packagesRepository,
    "users": modalServiceProvider.userRepository,
  };
}
