 
import express from 'express';
import agencyController from '../controllers/agencyController';
 
const routes = express.Router();
 
routes.get('/:id', agencyController.findAgencyById);
routes.get('/', agencyController.getAgencys);
routes.post('/', agencyController.createAgency);
routes.delete('/:id', agencyController.deleteAgencyById)
 
export {routes as default}