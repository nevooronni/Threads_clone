import { faker } from '@faker-js/faker'
import { Thread, User } from '../types/threads'

export function createRandomFollowers():User {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    verified: Math.random() >= .5,
    bio: faker.person.bio(),
    username: faker.internet.userName(),
    link: faker.internet.url(),
  }
}

//function to return type User
export function createRandomUser():User {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    verified: Math.random() >= .5,
    bio: faker.person.bio(),
    username: faker.internet.userName(),
    link: faker.internet.url(),
    followers: new Array(Math.floor(Math.random() * 10))
      .fill(null)
      .map(_ => createRandomFollowers())
  } 
}

export function createRandomThread():Thread {
  const author = createRandomUser()
  const mentionUser = createRandomUser()

  return {
    id: faker.string.uuid(),
    author,
    content: faker.lorem.paragraph(),
    image: Math.random() > .5 ? faker.image.url() : undefined,
    replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(_ => ({
      id: faker.string.uuid(),
      author: createRandomUser(),
      content: faker.lorem.paragraph(),
      likes: Math.floor(Math.random() * 1000),
      createdAt: faker.date.recent().toISOString(),
    })),
    repliesCount: Math.floor(Math.random() * 100),
    likesCount: Math.floor(Math.random() * 1000),
    mention: Math.random() > .5,
    mentionUser,
    createdAt: faker.date.recent().toISOString(),
  }
}

export function generateThreads():Thread[] {
  return new Array(50).fill(null).map(_ => createRandomThread())
}