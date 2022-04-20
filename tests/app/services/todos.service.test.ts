import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { TodosModel } from '../../../src/app/models/todos.model'
import { TodosService } from '../../../src/app/services'

use(chaiAsPromised)

describe('app/models/todos.service', () => {
  beforeEach(sinon.restore)
  const todosModel = new TodosModel()
  const todosService = new TodosService(todosModel)

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
      expect(todosService.get('1')).to.eventually.be.rejected
    })

    it('should throw if todosModel.get returns empty', () => {
      sinon.stub(todosModel, 'get').resolves()
      expect(todosService.get('1')).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      expect(todosService.get('1')).to.eventually.deep.equal({})
    })
  })

  describe('edit', () => {
    it('should throw if todosModel.get throws', () => {
      sinon.stub(todosModel, 'get').rejects()
      expect(todosService.edit('1', {})).to.eventually.be.rejected
    })

    it('should throw if todosModel.get return empty', () => {
      sinon.stub(todosModel, 'get').resolves()
      expect(todosService.edit('1', {})).to.eventually.be.rejected
    })

    it('should throw if todosModel.edit throws', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      sinon.stub(todosModel, 'edit').rejects()
      expect(todosService.edit('1', {})).to.eventually.be.rejected
    })

    it('should return nothing if success', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      sinon.stub(todosModel, 'edit').resolves()
      expect(todosService.edit('1', {})).to.eventually.be.undefined
    })
  })

  describe('remove', () => {
    it('should throw if todosModel.get throws', () => {
      sinon.stub(todosModel, 'get').rejects()
      expect(todosService.remove('1')).to.eventually.be.rejected
    })

    it('should throw if todosModel.get return empty', () => {
      sinon.stub(todosModel, 'get').resolves()
      expect(todosService.remove('1')).to.eventually.be.rejected
    })

    it('should throw if todosModel.remove throws', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      sinon.stub(todosModel, 'remove').rejects()
      expect(todosService.remove('1')).to.eventually.be.rejected
    })

    it('should return nothing if success', () => {
      sinon.stub(todosModel, 'get').resolves({} as any)
      sinon.stub(todosModel, 'remove').resolves()
      expect(todosService.remove('1')).to.eventually.be.undefined
    })
  })
})