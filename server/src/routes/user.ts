import { Router } from 'express';
import { deleteUser, getUser, getUsers, loginUser, newUser, postUser, updateUser } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', postUser);
router.put('/:id', updateUser);

export default router;