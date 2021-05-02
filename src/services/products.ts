import { db } from './db'

/**
 * Types.
 */
export type Product = {
  _id: string
  _rev?: string

  FWId: string
  description: string
  code: string
  isVisible: boolean
  isAvailable: boolean
  currentInventory: number
  updatedAt: string
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

export const findAll = async () => {
  try {
    const foundProducts = await db.allDocs<Product>({
      include_docs: true,
      startkey: 'products',
      endkey: 'products\ufff0'
    })

    return foundProducts.rows.map(({ id: FWId, doc }) => ({
      _id: doc._id,
      _rev: doc._rev,

      FWId,
      description: doc.description,
      code: doc.code,
      isVisible: doc.isVisible,
      isAvailable: doc.isAvailable,
      currentInventory: doc.currentInventory,
      updatedAt: doc.updatedAt
    }))
  } catch {
    console.error('Erro ao buscar os produtos.')
  }
}
