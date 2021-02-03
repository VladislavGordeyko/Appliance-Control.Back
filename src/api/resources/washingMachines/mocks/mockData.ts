import { ApplianceStatus, CommandStatus } from '../../../common/enums/enums'
import { mockCommandsData } from '../../commands/mocks/mockData'
import { IWashingMachine, IActiveCommand } from '../model'

const activeCommands: IActiveCommand[] = [
  {
    id: '1',
    command: mockCommandsData[0],
    finishAt: '2020-12-17T04:24:00',
    startAt: '2020-12-17T03:24:00',
    status: CommandStatus.INPROCESS
  }
]

export const mockWashingMachineData : IWashingMachine[] = [
  {
    id: '1',
    activeCommands: [],
    createdAt: '2020-12-17T03:24:00',
    name: 'test',
    status: ApplianceStatus.IDLE
  },
  {
    id: '2',
    activeCommands: activeCommands,
    createdAt: '2020-12-17T03:24:00',
    name: 'test',
    status: ApplianceStatus.IDLE
  }
]
