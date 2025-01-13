import { BadRequestException, NotFoundException } from '../exceptions/apiExceptions'
import { AgencyDTO } from '../dto/agencyDto'
import agencyRepository from '../repositories/agencyRepository'

const findAgency = async (id: number) => {
  try {
    const existentPost = await agencyRepository.findAgency(id)

    if (!existentPost) {
      throw new NotFoundException('Agencia não encontrado')
    }

    return existentPost
  } catch (error) {
    console.error(error)
    throw error
  }
}

const listAgencys = async () => {
  try {
    return await agencyRepository.listAgencys()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const createNewAgency = async (agency: AgencyDTO) => {
  try {
    if (!agency.author) {
      throw new BadRequestException('Autor é um campo obrigatório')
    }
    if (!agency.content) {
      throw new BadRequestException('Conteúdo é um campo obrigatório')
    }
    if (!agency.description) {
      throw new BadRequestException('Descrição é um campo obrigatório')
    }
    if (!agency.title) {
      throw new BadRequestException('Título é um campo obrigatório')
    }

    return await agencyRepository.createAgency(agency)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const deleteAgency = async (id: number) => {
  try {
    const existentAgency = await agencyRepository.findAgency(id)

    if (!existentAgency) {
      throw new NotFoundException('Agencia não encontrado')
    }

    return await agencyRepository.deleteAgency(id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  findAgency,
  listAgencys,
  createNewAgency,
  deleteAgency,
}
