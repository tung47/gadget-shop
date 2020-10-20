import User, { UserDocument } from '../models/User'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

async function create(user: UserDocument): Promise<UserDocument> {
  try {
    const newUser = await user.save()

    return newUser
  } catch (error) {
    throw new InternalServerError()
  }
}
