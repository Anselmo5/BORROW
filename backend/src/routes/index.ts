import {Router} from 'express';
import authRoutes from './auth.routes.js';
import itemsRoutes from './items.routes.js';
import loansRoutes from './loans.routes.js';

const router = Router();

router.get('/', (req,res) =>{
    return res.json({
        message:"API BORROW funcionando"
    })
})

router.use('/auth', authRoutes);
router.use('/items', itemsRoutes);
router.use('/loans', loansRoutes);

export default router;