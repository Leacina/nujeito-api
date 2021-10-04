import Establishment from '../infra/typeorm/entities/Establishment';
import ICreateEstablishment from '../dtos/ICreateEstablishmentDTO';

export default interface IEstablishmentRepository {
  create(data: ICreateEstablishment): Promise<Establishment>;
  find(): Promise<Establishment[]>;
  findById(id: number): Promise<Establishment>;
  save(establishment: Establishment): Promise<Establishment>;
}
