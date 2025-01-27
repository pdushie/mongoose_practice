import { Elysia, t } from 'elysia';
import { getUsers, getOneUser, createUser, deleteUser, updateUser } from '../controller/userController';

export default (app: any) => {
  app
    // Get all users
    .get('/users', () => {
      return getUsers();
    })
    
    // Get one user by ID
    .get('/users/:id', async ({ params: { id }, error }: any) => {
      const user = await getOneUser(id) ?? error(404, "User not found");
      return user;
    })

    // Create a new user
    .post('/users', async ({ body }: any) => {
      try {
        return await createUser(body);
      } catch (error) {
        console.error("Error occurred while creating user", error);
        return { status: 500, message: 'Error creating user' };
      }
    }, { body: t.Object({ name: t.String(), yearOfBirth: t.Number(), nationality: t.String(), hasValidStatus: t.Boolean() }) })
    
    // Delete a user by ID
    .delete('/users/:id', async ({ params: { id }, error }: any) => {
      const deleted = await deleteUser(id) ?? error(404, "User does not exist");
      return { message: 'User deleted successfully' };
    })

    // Update a user by ID
    .put('/users/:id', async ({ body, params: { id }, error }: any) => {
      try {
        const updatedUser = await updateUser(id, body) ?? error(404, "Update failed. User does not exist");
        // if (!updatedUser) {
        //   return error(404, 'User not found');
        // }
        return updatedUser;
      } catch (error) {
        console.error("Error occurred while updating user", error);
        return { status: 500, message: 'Error updating user' };
      }
    }, { body: t.Object({ name: t.String(), yearOfBirth: t.Number(), nationality: t.String(), hasValidStatus: t.Boolean() }) });
};
