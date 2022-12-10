import faker from 'faker'

import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test'

type SutStypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutStypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return { sut, setStorageSpy }
}

describe('SaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
