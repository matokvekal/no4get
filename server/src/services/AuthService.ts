import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/store';
import type { DbUser } from '../db/store';

function makeToken(userId: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-in-prod';
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
}

function publicUser(u: DbUser, token: string) {
  return { id: u.id, name: u.name, email: u.email, avatar: u.avatar, token };
}

export class AuthService {
  login(email: string, password: string) {
    const user = db.users.find((u) => u.email === email);
    if (!user) throw new Error('Invalid email or password');
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid email or password');
    return publicUser(user, makeToken(user.id));
  }

  register(name: string, email: string, password: string) {
    if (db.users.find((u) => u.email === email)) throw new Error('Email already registered');
    const user: DbUser = {
      id: `u${Date.now()}`,
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${Date.now()}`,
    };
    db.users.push(user);
    return publicUser(user, makeToken(user.id));
  }
}
