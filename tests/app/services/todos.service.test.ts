import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { todosModel } from '../../../src/app/models/todos.model'
import { todosService } from '../../../src/app/services'


use(chaiAsPromised)

describe('app/models/todos.service', () => {
  beforeEach(sinon.restore)

  describe('list', () => {
    it('should throw if todosModel.list throws', () => {
      sinon.stub(todosModel, 'list').rejects()
      expect(todosService.list()).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosModel, 'list').resolves([])
      expect(todosService.list()).to.eventually.deep.equal([])
    })
  })

  describe('add', () => {
    it('should throw if todosModel.add throws', () => {
      sinon.stub(todosModel, 'add').rejects()
      expect(todosService.add({} as any)).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosModel, 'add').resolves({} as any)
      expect(todosService.add({} as any)).to.eventually.deep.equal({})
    })
  })

  describe('get', () => {
    it('should throw if todosModel.get throws', () => {
      sinon.stub(todosModel, 'get').rejects()
      expect(todosService.get(1)).to.eventually.be.rejected
    })

    it('should throw if todosModel.get returns empty', () => {
      sinon.stub(todosModel, 'get').resolves()
      expect(todosService.get(1)).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      expect(todosService.get(1)).to.eventually.deep.equal({})
    })
  })
})