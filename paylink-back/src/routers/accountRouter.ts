 
import express from 'express';
import accountController from '../controllers/accountController';
 
const routes = express.Router();
 
routes.get('/', accountController.getAccount);
routes.get('/:id', accountController.findAccountById);
routes.post('/', accountController.createAccount);
 
export {routes as default}