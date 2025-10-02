import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

class UserModel {
  async create(name: string, email: string, hashPassword: string) {
    const [result] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    return result;
  }

  async findByEmail(email: string) {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result;
  }

  async findById(id: number) {
    const [result] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        refreshToken: users.refreshToken,
      })
      .from(users)
      .where(eq(users.id, id));
    return result;
  }

  async saveRefreshToken(token: string | null, userId: number) {
    await db
      .update(users)
      .set({ refreshToken: token })
      .where(eq(users.id, userId));
    return;
  }
}

export default new UserModel();
