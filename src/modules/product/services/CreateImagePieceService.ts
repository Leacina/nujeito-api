import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploadImagePiece';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  piece_id: number;
  file: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('ProductsRepository') private piecesRepository: IProductsRepository,
  ) {}

  public async execute({ piece_id, file }: IRequest): Promise<string> {
    const product = await this.piecesRepository.findById(Number(piece_id));

    if (product.ds_imagem) {
      const pieceFilePath = path.join(
        uploadConfig.directory,
        product.ds_imagem,
      );
      const pieceAvatarFileExists = await fs.promises.stat(pieceFilePath);

      if (pieceAvatarFileExists) {
        await fs.promises.unlink(pieceFilePath);
      }
    }

    product.ds_imagem = file;

    await this.piecesRepository.save(product);

    return file;
  }
}

export default UpdateUserAvatarService;
