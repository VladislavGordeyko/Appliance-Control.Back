/* eslint-disable no-undef */
import CommandsController from '../api/resources/commands/controller'
import CommandServices from '../api/resources/commands/services'
import mockCommandRepo from '../api/resources/commands/mocks/mockCommandRepo'
import { createServer } from '../server'
import request from 'supertest'
import mockWashinMachineRepo from '../api/resources/washingMachines/mocks/mockWashinMachineRepo'
import WashingMachineServices from '../api/resources/washingMachines/services'
import WashingMachineController from '../api/resources/washingMachines/controller'
import { mockWashingMachineData } from '../api/resources/washingMachines/mocks/mockData'
import { mockCommandsData } from '../api/resources/commands/mocks/mockData'

/** Mocking Repositories */
const commandsServices = new CommandServices(mockCommandRepo)
const commandsController = new CommandsController(commandsServices)
const washingMachineServices = new WashingMachineServices(mockWashinMachineRepo)
const washingMachineController = new WashingMachineController(washingMachineServices, commandsServices)

const server = createServer(washingMachineController, commandsController)

const data = mockWashingMachineData

// APPLIANCES

describe('GET all', () => {
  it('Should return all mocked appliances', async () => {
    const result = await request(server).get('/api/washingMachines').send()

    expect(result.status).toBe(200)
    expect(result.body.data).toStrictEqual({ washingMachines: data })
  })
})

describe('GET by ID', () => {
  it('Should return Appliance by id', async () => {
    const result = await request(server).get('/api/washingMachines/1').send()

    expect(result.status).toBe(200)
    expect(result.body.data).toStrictEqual(data[0])
  })
})

describe('GET invalid Id', () => {
  it('Should return 404 and error that Appliance doesnt exist', async () => {
    const result = await request(server).get('/api/washingMachines/-1').send()

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Washing machine not found')
  })
})

describe('Create Appliance', () => {
  it('Should return created Appliance ', async () => {
    const appliance = { name: 'Washing Machine' }
    const result = await request(server).post('/api/washingMachines').send(appliance)

    const newId = result.body.data.id

    expect(result.status).toBe(200)
    expect(result.body.data.name).toEqual(appliance.name)

    const checkResult = await request(server).get(`/api/washingMachines/${newId}`).send()

    expect(checkResult.status).toBe(200)
    expect(checkResult.body.data).toStrictEqual(result.body.data)
  })
})

describe('Create invalid Appliance', () => {
  it('Should return 400', async () => {
    const command = { duratation: 40 }
    const result = await request(server).post('/api/washingMachines').send(command)

    expect(result.status).toBe(400)
    expect(result.body.error.code).toEqual(10)
  })
})

describe('Create invalid Appliance', () => {
  it('Should return 400', async () => {
    const command = { }
    const result = await request(server).post('/api/washingMachines').send(command)

    expect(result.status).toBe(400)
    expect(result.body.error.code).toEqual(10)
  })
})

describe('Update Appliance', () => {
  it('Should return created Appliance ', async () => {
    const appliance = { id: '1', name: 'appliance' }
    const result = await request(server).put('/api/washingMachines').send(appliance)

    expect(result.status).toBe(200)

    const checkResult = await request(server).get('/api/washingMachines/1').send()

    expect(checkResult.status).toBe(200)
    expect(checkResult.body.data).toStrictEqual(appliance)
  })
})

describe('Update invalid Appliance', () => {
  it('Should return 404 ', async () => {
    const appliance = { id: '55' }
    const result = await request(server).put('/api/washingMachines').send(appliance)

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Washing machine not found')
  })
})

describe('Delete Appliance', () => {
  it('Should delete command ', async () => {
    const result = await request(server).delete('/api/washingMachines/1').send()

    expect(result.status).toBe(200)

    const checkResult = await request(server).get('/api/washingMachines/1').send()

    expect(checkResult.status).toBe(404)
    expect(checkResult.body.error.message).toBe('Washing machine not found')
  })
})

describe('Delete invalid Appliance', () => {
  it('Should return 404 ', async () => {
    const result = await request(server).delete('/api/washingMachines/88').send()

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Washing machine not found')
  })
})

// COMMANDS

const commandsData = mockCommandsData

describe('GET all', () => {
  it('Should return all mocked commands', async () => {
    const result = await request(server).get('/api/commands').send()

    expect(result.status).toBe(200)
    expect(result.body.data).toStrictEqual({ commands: commandsData })
  })
})

describe('GET by ID', () => {
  it('Should return command by id', async () => {
    const result = await request(server).get('/api/commands/1').send()

    expect(result.status).toBe(200)
    expect(result.body.data).toStrictEqual(commandsData[0])
  })
})

describe('GET invalid Id', () => {
  it('Should return 404 and error that command doesnt exist', async () => {
    const result = await request(server).get('/api/commands/-1').send()

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Command not found')
  })
})

describe('Create Command', () => {
  it('Should return created command ', async () => {
    const command = { description: 'description', duratation: 40 }
    const result = await request(server).post('/api/commands').send(command)

    const newId = result.body.data.id

    expect(result.status).toBe(200)
    expect(result.body.data.description).toEqual(command.description)

    const checkResult = await request(server).get(`/api/commands/${newId}`).send()

    expect(checkResult.status).toBe(200)
    expect(checkResult.body.data).toStrictEqual(result.body.data)
  })
})

describe('Create invalid Command', () => {
  it('Should return 400', async () => {
    const command = { duratation: 40 }
    const result = await request(server).post('/api/commands').send(command)

    expect(result.status).toBe(400)
    expect(result.body.error.code).toEqual(10)
  })
})

describe('Create invalid Command', () => {
  it('Should return 400', async () => {
    const command = { }
    const result = await request(server).post('/api/commands').send(command)

    expect(result.status).toBe(400)
    expect(result.body.error.code).toEqual(10)
  })
})

describe('Update Command', () => {
  it('Should return created command ', async () => {
    const command = { id: '1', description: 'description', duratation: 40 }
    const result = await request(server).put('/api/commands').send(command)

    expect(result.status).toBe(200)

    const checkResult = await request(server).get('/api/commands/1').send()

    expect(checkResult.status).toBe(200)
    expect(checkResult.body.data).toStrictEqual(command)
  })
})

describe('Update invalid Command', () => {
  it('Should return 404 ', async () => {
    const command = { id: '55', description: 'description', duratation: 40 }
    const result = await request(server).put('/api/commands').send(command)

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Command not found')
  })
})

describe('Delete command', () => {
  it('Should delete command ', async () => {
    const result = await request(server).delete('/api/commands/1').send()

    expect(result.status).toBe(200)

    const checkResult = await request(server).get('/api/commands/1').send()

    expect(checkResult.status).toBe(404)
    expect(checkResult.body.error.message).toBe('Command not found')
  })
})

describe('Delete invalid command', () => {
  it('Should return 404 ', async () => {
    const result = await request(server).delete('/api/commands/88').send()

    expect(result.status).toBe(404)
    expect(result.body.error.message).toBe('Command not found')
  })
})
