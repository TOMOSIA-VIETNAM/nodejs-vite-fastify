import { Prisma, PrismaClient } from '@prisma/client'

// Định nghĩa base model cho reader schema
const readerBaseModel = {
  dbName: null as any,
  fields: [
    { name: 'id', type: 'Int', dbName: 'id' },
    { name: 'createdAt', type: 'DateTime', dbName: 'created_at' },
    { name: 'updatedAt', type: 'DateTime', dbName: 'updated_at' }
  ],
  schema: 'reader'
}

// Định nghĩa schema cho từng model
const readerModels = {
  User: {
    ...readerBaseModel,
    dbName: 'users',
    fields: [
      ...readerBaseModel.fields,
      { name: 'email', type: 'String', dbName: 'email' },
      { name: 'name', type: 'String', dbName: 'name', isOptional: true }
    ]
  },
  // Thêm các model khác một cách dễ dàng
  Customer: {
    ...readerBaseModel,
    dbName: 'customers',
    fields: [
      ...readerBaseModel.fields,
      { name: 'code', type: 'String', dbName: 'code' },
      { name: 'phone', type: 'String', dbName: 'phone' }
    ]
  }
  // Có thể thêm nhiều model khác...
}

type ReaderModelName = keyof typeof readerModels

// Helper function để tạo runtime model
const createRuntimeModel = (modelName: ReaderModelName) => ({
  models: {
    [modelName]: readerModels[modelName]
  }
})

// Extension factory
const createModelExtension = (modelName: ReaderModelName) => ({
  async findUnique(args: any) {
    const client = this as unknown as PrismaClient
    return client[modelName.toLowerCase()].findUnique({
      ...args,
      _runtimeDataModel: createRuntimeModel(modelName)
    })
  },
  async findMany(args?: any) {
    const client = this as unknown as PrismaClient
    return client[modelName.toLowerCase()].findMany({
      ...args,
      _runtimeDataModel: createRuntimeModel(modelName)
    })
  },
  async findFirst(args?: any) {
    const client = this as unknown as PrismaClient
    return client[modelName.toLowerCase()].findFirst({
      ...args,
      _runtimeDataModel: createRuntimeModel(modelName)
    })
  }
  // Có thể thêm các method khác như create, update, delete nếu cần
})

// Tạo extension cho reader schema
export const readerSchema = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'ReaderSchema',
    model: Object.keys(readerModels).reduce((acc, modelName) => ({
      ...acc,
      [modelName.toLowerCase()]: createModelExtension(modelName as ReaderModelName)
    }), {})
  })
})

// Export các type cần thiết
export interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: number
  code: string
  phone: string
  createdAt: Date
  updatedAt: Date
}
