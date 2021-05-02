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
export const subscribeToChanges = (options: PouchDB.Core.ChangesOptions) => {
  return db.changes(options)
}

export const save = (product: PouchDB.Core.PutDocument<Product>) => {
  try {
    return db.put(product)
  } catch {
    console.error('Erro ao atualizar o produto.')
  }
}

export const findAll = () => {
  try {
    return db.allDocs<Product>({
      include_docs: true,
      startkey: 'products',
      endkey: 'products\ufff0'
    })
  } catch {
    console.error('Erro ao buscar os produtos.')
  }
}
