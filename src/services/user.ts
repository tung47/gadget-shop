import User, { UserDocument } from '../models/User'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

async function findById(userId: string): Promise<UserDocument | null> {
  const user = await User.findById(userId).exec()
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  return user
}

async function findAll(): Promise<UserDocument[]> {
  return await User.find().sort({ email: 1 }).exec()
}

async function updateUser(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId)
  if (!user) throw new Error(`User ${userId} not found`)
  return await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

async function updateProfile(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId).exec()
  if (!user) throw new Error(`User ${userId} not found`)
  if (user.isAdmin) update.isAdmin = user.isAdmin
  //if (user.products) update.products = user.products
  return await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

const ban = async (userId: string) => {
  return await User.findByIdAndUpdate({ _id: userId }, { isBanned: true })
}

const unban = async (userId: string) => {
  return await User.findByIdAndUpdate({ _id: userId }, { isBanned: false })
}

export default {
  create,
  findById,
  findAll,
  updateUser,
  deleteUser,
  updateProfile,
  ban,
  unban,
}
