import { AbilityClass } from '@casl/ability'
import { User, Post } from '../node_modules/.prisma/client'
import { PrismaAbility, Subjects } from '../src'

export type AppAbility = PrismaAbility<[string, 'all' | Subjects<{
  User: User,
  Post: Post
}>]>
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppAbility = PrismaAbility as AbilityClass<AppAbility>
