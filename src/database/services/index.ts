import { Repository } from 'typeorm'

export abstract class Services<T> {
  protected repository: Repository<T>;

  constructor (repository: Repository<T>) {
    this.repository = repository
  }
}
