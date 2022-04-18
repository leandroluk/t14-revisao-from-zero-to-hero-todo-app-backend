import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { todosModel } from '../../../src/app/models/todos.model'
import { TodoDAO } from '../../../src/db'

use(chaiAsPromised)

describe('app/models/todos.model', () => {
  beforeEach(sinon.restore)

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
})