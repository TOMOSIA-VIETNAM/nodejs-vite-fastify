import { PrismaClient as WriterClient } from '@prisma/client'
import { PrismaClient as ReaderClient } from '@prisma/reader-client'

class PrismaService {
  private static instance: PrismaService
  private _writerClient: WriterClient
  private _readerClient: ReaderClient

  private constructor() {
    this._writerClient = new WriterClient({
      datasources: {
        db: {
          url: process.env.DATABASE_WRITER_URL
        }
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    })

    this._readerClient = new ReaderClient({
      datasources: {
        db: {
          url: process.env.DATABASE_READER_URL
        }
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    })
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService()
    }
    return PrismaService.instance
  }

  get writerClient(): WriterClient {
    return this._writerClient
  }

  get readerClient(): ReaderClient {
    return this._readerClient
  }

  async disconnect(): Promise<void> {
    await Promise.all([
      this._readerClient.$disconnect(),
      this._writerClient.$disconnect()
    ])
  }
}

export const prismaService = PrismaService.getInstance()
export const writerClient = prismaService.writerClient
export const readerClient = prismaService.readerClient
