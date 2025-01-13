import { Request, Response, NextFunction } from 'express'
import agencyService from '../service/agencyService'

async function findAgencyById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const agency = await agencyService.findAgency(id as unknown as number)
    res.json(agency)
  } catch(err) {
    next(err)
  } 
}

async function getAgencys(req: Request, res: Response, next: NextFunction) {
  try {
    const Agency = await agencyService.listAgencys()
    res.json(Agency)
  } catch(err) {
    next(err)
  }

}

async function createAgency(req: Request, res: Response, next: NextFunction) {
  try {
    const { author, content, description, title } = req.body
    const newAgency = await agencyService.createNewAgency({
      author,
      content,
      description,
      title,
    })
    res.status(201).json(newAgency)
  } catch(err) {
    next(err)
  } 
}

async function deleteAgencyById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    await agencyService.deleteAgency(id as unknown as number)
    res.status(204).json()
  } catch(err) {
    next(err)
  }

}

export default {
  findAgencyById,
  getAgencys,
  createAgency,
  deleteAgencyById
}
