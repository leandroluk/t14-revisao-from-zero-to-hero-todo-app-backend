import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { TodosController } from '../../../src/app/controllers'
import { TodosModel } from '../../../src/app/models/todos.model'
import { TodosService } from '../../../src/app/services'
import { TodosValidator } from '../../../src/app/validators'
import { AddTodo, Todo } from '../../../src/types'

use(chaiAsPromised)

describe('app/models/todos.controller', () => {
  beforeEach(sinon.restore)

  const todosModel = new TodosModel()
  const todosService = new TodosService(todosModel)
  const todosValidator = new TodosValidator()
  const todosController = new TodosController(todosValidator, todosService)

  describe('list', () => {
    it('should throw if todosService throws', () => {
      sinon.stub(todosService, 'list').rejects()
      expect(todosController.list()).to.eventually.to.rejected
    })

    it('should return result', () => {
      sinon.stub(todosService, 'list').resolves([])
      expect(todosController.list()).to.eventually.deep.equal([])
    })
  })

  describe('add', () => {
    it('should throw if todosValidator.bodyAdd throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').rejects()
      expect(todosController.add({})).to.eventually.be.rejected
    })

    it('should throw if todosService.add throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo)
      sinon.stub(todosService, 'add').rejects()
      expect(todosController.add({})).to.eventually.be.rejected
    })

    it('should throw if todosService.get throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo)
      sinon.stub(todosService, 'add').resolves('1')
      sinon.stub(todosService, 'get').rejects()
      expect(todosController.add({})).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo)
      sinon.stub(todosService, 'add').resolves('1')
      sinon.stub(todosService, 'get').resolves({} as Todo)
      expect(todosController.add({})).to.eventually.deep.equal({})
    })
  })

  describe('edit', () => {
    it('should throw if todosValidator.paramsId throws', () => {
      sinon.stub(todosValidator, 'paramsId').rejects()
      sinon.stub(todosValidator, 'bodyEdit').resolves({})
      expect(todosController.edit({}, {})).to.eventually.be.rejected
    })

    it('should throw if todosValidator.bodyEdit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosValidator, 'bodyEdit').rejects()
      expect(todosController.edit({}, {})).to.eventually.be.rejected
    })

    it('should throw if todosService.edit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosValidator, 'bodyEdit').resolves({})
      sinon.stub(todosService, 'edit').rejects()
      expect(todosController.edit({}, {})).to.eventually.be.rejected
    })

    it('should throw if todosService.edit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosValidator, 'bodyEdit').resolves({})
      sinon.stub(todosService, 'edit').resolves()
      sinon.stub(todosService, 'get').rejects()
      expect(todosController.edit({}, {})).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosValidator, 'bodyEdit').resolves({})
      sinon.stub(todosService, 'edit').resolves()
      sinon.stub(todosService, 'get').resolves({} as any)
      expect(todosController.edit({}, {})).to.eventually.deep.equal({})
    })
  })

  describe('remove', () => {
    it('should throw if todosValidator.paramsId throws', () => {
      sinon.stub(todosValidator, 'paramsId').rejects()
      expect(todosController.remove(1)).to.eventually.be.rejected
    })

    it('should throw if todosService.remove throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosService, 'remove').rejects()
      expect(todosController.remove(1)).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({} as any)
      sinon.stub(todosService, 'remove').resolves()
      expect(todosController.remove(1)).to.eventually.be.undefined
    })
  })
})