import { AgencyDTO } from 'src/dto/agencyDto'
import { Agency } from '../models/agencyModel'

async function findAgency(id: number): Promise<Agency | null> {
  return await Agency.findByPk(id)
}

async function listAgencys(): Promise<Agency[]> {
  return await Agency.findAll({order: [['createdAt', 'DESC']]})
}

async function createAgency(agency: AgencyDTO): Promise<Agency> {
  return await Agency.create({ ...agency })
}

async function deleteAgency(id: number): Promise<void> {
    await Agency.destroy({where: {id}})
}

export default {
  listAgencys,
  findAgency,
  createAgency,
  deleteAgency
}
