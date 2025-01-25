import Elysia, { t } from 'elysia';
import { getUsers, getOneUser , createUser, deleteUser, updateUser } from '../controller/userController';
import { idText } from 'typescript';

export default(app: any) => {
  app
  .get('/users', () => {
    return getUsers();
  })
  .get('/users/:id', async ({ params: {id}, error }: any) => {
    return getOneUser(id) ?? error(404)
  } )
  .post('/users', async({ body }: any) => {
    try {

      return await createUser(body);
    } catch(error) {
      console.error("Error occured creating user", error)
    }
  })
  .delete('/users/:id', async({params: {id}, error}: any) => {
    return deleteUser(id) ?? error(404)
  })
  .put('/users/:id', async ({ body, params: {id}, error }: any) => {
    try {
      return await updateUser(id, body) ?? error(404)
    } catch (error) {
      console.error("Error updating user", error)
    }
  })

  ,{body: t.Object({name: t.String(), dateOfBirth: t.Number(), nationality: t.String(), hasValidStatus: t.Boolean()})}}