import { container } from 'tsyringe';
import { Request, Response } from 'express';
import fs from 'fs';
import CreateImagePieceService from '@modules/product/services/CreateImagePieceService';

import uploadConfig from '@config/uploadImagePiece';

export default class ImagePieceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createPieces = container.resolve(CreateImagePieceService);
    const { id } = request.params;

    const piece = await createPieces.execute({
      piece_id: Number(id),
      file: request.files[0] ? request.files[0].filename : '',
    });

    return response.json(piece);
  }

  public async index(request: Request, response: Response): Promise<any> {
    const { filename } = request.params;
    const file = `${uploadConfig.directory}/${filename}`;

    fs.stat(file, err => {
      if (err) {
        return response.status(404).end('Imagem não encontrada');
      }

      return response.sendFile(file);
    });
  }
}
