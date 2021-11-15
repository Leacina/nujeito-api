import { Request, Response } from 'express';
import qr from 'qr-image';

export default class EstablishmentQrCodeController {
  public async index(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    const code = qr.image(
      `http://191.252.192.163:3333/api/produto/estabelecimento/${String(id)}`,
      {
        type: 'png',
      },
    );

    response.type('png');

    code.pipe(response);
  }
}
