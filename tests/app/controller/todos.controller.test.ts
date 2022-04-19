import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { todosController } from '../../../src/app/controllers'
import { todosService } from '../../../src/app/services'
import { todosValidator } from '../../../src/app/validators'
import { AddTodo, Todo } from '../../../src/types'

use(chaiAsPromised)

describe('app/models/todos.controller', () => {
  beforeEach(sinon.restore)

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
      sinon.stub(todosService, 'add').resolves(1)
      sinon.stub(todosService, 'get').rejects()
      expect(todosController.add({})).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo)
      sinon.stub(todosService, 'add').resolves(1)
      sinon.stub(todosService, 'get').resolves({} as Todo)
      expect(todosController.add({})).to.eventually.deep.equal({})
    })
  })
})