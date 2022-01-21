import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/uploadImagePiece';
import multer from 'multer';
import ProductsController from '../controllers/ProductsController';
import ProductsByBarCodeController from '../controllers/ProductsByBarCodeController';
import ProductsShopController from '../controllers/ProductsShopController';
import ProductsEstablishmentController from '../controllers/ProductsEstablismentController';
import ProductsClosedValidateController from '../controllers/ProductsClosedValidateController';
import ImagePieceController from '../controllers/ImagePieceController';

const upload = multer(uploadConfig);
const productsController = new ProductsController();
const productsByBarCodeController = new ProductsByBarCodeController();
const productsShopController = new ProductsShopController();
const imagePieceController = new ImagePieceController();
const productsEstablishmentController = new ProductsEstablishmentController();
const productsClosedValidateController = new ProductsClosedValidateController();

const productsRouter = Router();

productsRouter.get('/imagem/:filename', imagePieceController.index);
productsRouter.use(ensureAuthenticated);
productsRouter.post('/:id/imagem', upload.any(), imagePieceController.create);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.store);
productsRouter.get('/', productsController.show);
productsRouter.get('/perto-validade', productsClosedValidateController.show);
productsRouter.get('/estabelecimento/loja/:id', productsShopController.show);
productsRouter.get(
  '/estabelecimento/:id',
  productsEstablishmentController.show,
);
productsRouter.get('/:codigo/:loja', productsByBarCodeController.index);
productsRouter.get('/:id', productsController.index);

export default productsRouter;
