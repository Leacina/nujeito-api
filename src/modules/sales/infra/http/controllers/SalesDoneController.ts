import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SaleDoneService } from '../../../services/SaleDoneService';

export default class SalesDoneController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const saleDoneService = container.resolve(SaleDoneService);

    const sale = await saleDoneService.execute(Number(id));

    return response.json(sale);
  }
}
