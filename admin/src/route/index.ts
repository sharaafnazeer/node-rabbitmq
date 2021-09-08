import { Router } from 'express';

import product from './productRoute';

let rootRouter = Router();

rootRouter.use('/product', product);

export default rootRouter;