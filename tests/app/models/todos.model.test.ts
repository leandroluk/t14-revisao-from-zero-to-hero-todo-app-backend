import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { TodosModel } from '../../../src/app/models/todos.model'
import { TodoDAO } from '../../../src/db_sequelize'

use(chaiAsPromised)

describe('app/models/todos.model', () => {
  beforeEach(sinon.restore)
  const todosModel = new TodosModel()

  describe('list', () => {
    it('should throw if TodoDAO.findAll throws', () => {
      sinon.stub(TodoDAO, 'findAll').rejects()
      expect(todosModel.list()).to.eventually.to.rejected
    })

    it('should return list of objects', () => {
      sinon.stub(TodoDAO, 'findAll').resolves([])
      expect(todosModel.list()).to.eventually.deep.equal([])
    })
  })

  describe('add', () => {
    it('should throw if TodoDAO.create throws', () => {
      sinon.stub(TodoDAO, 'create').rejects()
      expect(todosModel.add({} as any)).to.eventually.be.rejected
    })

    it('should return inserted id', () => {
      const createStub = sinon.stub(TodoDAO, 'create').resolves({ id: 1 } as any)
      expect(todosModel.add({} as any)).to.eventually.equal(1)
      expect(createStub.getCall(0).args[0]?.createdAt).to.ok
    })
  })

  describe('get', () => {
    it('should throw if TodoDAO.findOne throws', () => {
      sinon.stub(TodoDAO, 'findOne').rejects()
      expect(todosModel.get('1')).to.eventually.be.rejected
    })

    it('should return result', () => {
      sinon.stub(TodoDAO, 'findOne').resolves({} as any)
      expect(todosModel.get('1')).to.eventually.deep.equal({})
    })
  })

  describe('edit', () => {
    it('should throw if TodoDAO.update throws', () => {
      sinon.stub(TodoDAO, 'update').rejects()
      expect(todosModel.edit('1', {})).to.eventually.be.rejected
    })

    it('should return undefined if edit', () => {
      sinon.stub(TodoDAO, 'update').resolves()
      expect(todosModel.edit('1', {})).to.eventually.be.undefined
    })
  })

  describe('remove', () => {
    it('should throw if TodoDAO.destroy throws', () => {
      sinon.stub(TodoDAO, 'destroy').rejects()
      expect(todosModel.remove('1')).to.eventually.be.rejected
    })

    it('should return undefined if remove', () => {
      sinon.stub(TodoDAO, 'destroy').resolves()
      expect(todosModel.remove('1')).to.eventually.be.undefined
    })
  })
})