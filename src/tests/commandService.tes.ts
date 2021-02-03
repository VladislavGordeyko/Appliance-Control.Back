/* eslint-disable no-undef */

import CommandServices from '../api/resources/commands/services'
import mockCommandRepo from '../api/resources/commands/mocks/mockCommandRepo'

const commandService = new CommandServices(mockCommandRepo)

describe('list', () => {
  it('Should return mock commands data', async () => {
    const response = await commandService.list()
    expect(response).toEqual([
      { 'description': 'test', 'duratation': 120, 'id': '1' },
      { 'description': 'test2', 'duratation': 60, 'id': '2' }
    ])
  })
})

describe('getById', () => {
  it('Should return mock command by id', async () => {
    const response = await commandService.getById('1')
    expect(response).toEqual(
      { 'description': 'test', 'duratation': 120, 'id': '1' })
  })
})

describe('deleteById', () => {
  it('Should retrun undefined', async () => {
    const response = await commandService.deleteById('1')
    expect(response).toEqual(undefined)
  })
})

describe('deleteById', () => {
  it('Should retrun undefined', async () => {
    const response :any = await commandService.deleteById('3')
    expect(response.message).toEqual('Command not found')
  })
})
