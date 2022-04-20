import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import api from '../../../src/api'
import { TodoDAO } from '../../../src/db_sequelize'

use(chaiHttp)

describe('api/routes', () => {
  beforeEach(sinon.restore)

  describe('GET / - listTodo', () => {
    it('should return 500 if db throws', async () => {
      sinon.stub(TodoDAO, 'findAll').rejects()

      const result = await request(api)
        .get('/todos')

      expect(result.status).to.equal(500)
    })

    it('should return 200 with list of todos', async () => {
      sinon.stub(TodoDAO, 'findAll').resolves([])
      const result = await request(api)
        .get('/todos')

      expect(result.status).to.equal(200)
      expect(result.body).to.deep.equal([])
    })
  })

  describe('POST / - addTodo', () => {
    const mock = { description: 'ola mundo' }

    it('should return 500 if db throws', async () => {
      sinon.stub(TodoDAO, 'findAll').rejects()

      const result = await request(api)
        .post('/todos')
        .send(mock)

      expect(result.status).to.equal(500)
    })

    it('should return 400 if validation throws', async () => {
      sinon.stub(TodoDAO, 'findAll').rejects()

      const result = await request(api)
        .post('/todos')
        .send({})

      expect(result.status).to.equal(400)
      expect(result.body.message).to.equal('"description" is required')
    })

    it('should return 201 with created todo', async () => {
      sinon.stub(TodoDAO, 'create').resolves({ id: 1 } as any)
      sinon.stub(TodoDAO, 'findOne').resolves(mock as any)

      const result = await request(api)
        .post('/todos')
        .send(mock)

      expect(result.status).to.equal(201)
      expect(result.body).to.deep.equal(mock)
    })
  })

  describe('PUT /:id - editTodo', () => {
    const mock = { description: 'ola mundo' }

    it('should return 500 if db throws', async () => {
      sinon.stub(TodoDAO, 'findOne').rejects()

      const result = await request(api)
        .put('/todos/1')
        .send(mock)

      expect(result.status).to.equal(500)
    })

    it('should return 404 if id not found', async () => {
      sinon.stub(TodoDAO, 'findOne').resolves()

      const result = await request(api)
        .put('/todos/1')
        .send(mock)

      expect(result.status).to.equal(404)
    })

    it('should return 400 if validation throws', async () => {
      const result = await request(api)
        .put('/todos/a')
        .send(mock)

      expect(result.status).to.equal(400)
    })

    it('should return 200 if success', async () => {
      sinon.stub(TodoDAO, 'findOne').resolves({} as any)
      sinon.stub(TodoDAO, 'update').resolves()

      const result = await request(api)
        .put('/todos/1')
        .send(mock)

      expect(result.status).to.equal(200)
    })
  })

  describe('DELETE /:id - removeTodo', () => {
    it('should return 500 if db throws', async () => {
      sinon.stub(TodoDAO, 'findOne').rejects()

      const result = await request(api)
        .delete('/todos/1')

      expect(result.status).to.equal(500)
    })

    it('should return 404 if id not found', async () => {
      sinon.stub(TodoDAO, 'findOne').resolves()

      const result = await request(api)
        .delete('/todos/1')

      expect(result.status).to.equal(404)
    })

    it('should return 400 if validation throws', async () => {
      const result = await request(api)
        .delete('/todos/a')

      expect(result.status).to.equal(400)
    })

    it('should return 200 if success', async () => {
      sinon.stub(TodoDAO, 'findOne').resolves({} as any)
      sinon.stub(TodoDAO, 'destroy').resolves()

      const result = await request(api)
        .delete('/todos/1')

      expect(result.status).to.equal(204)
    })
  })
})