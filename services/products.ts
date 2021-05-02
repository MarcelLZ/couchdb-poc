import { db } from './db'

/**
 * Types.
 */
type Product = {
  id: string
  description: string
  code: string
  isVisible: boolean
  isAvailable: boolean
  currentInventory: number
  updatedAt: string
}

export type PouchAllProducts = PouchDB.Core.AllDocsResponse<Product>
export type PouchProduct = {
  doc?: PouchDB.Core.ExistingDocument<Product & PouchDB.Core.AllDocsMeta>;
  id: string;
  key: string;
  value: {
      rev: string;
      deleted?: boolean;
  };
}

/**
 * Functions.
 */
export const findAll = () => {
  try {
    return db.allDocs<Product>({
      include_docs: true,
      startkey: 'products',
      endkey: 'products\ufff0'
    })
  } catch {
    console.log('Erro ao buscar os produtos.')
  }
}

export const findOne = async () => {
  try {
    const t = await db.allDocs<Product>({
      include_docs: true,
      startkey: 'products',
      endkey: 'products\ufff0'
    })

    return t.rows[0]
  } catch {
    console.log('Erro ao buscar os produtos.')
  }
}