import { db } from './db'

/**
 * Types.
 */
type Customer = {
  customer: {
    name: string
  }
}

export type PouchOrder = PouchDB.Core.AllDocsResponse<Customer>

/**
 * Functions.
 */
export const findAll = () => {
  try {
    return db.allDocs<Customer>({
      include_docs: true,
      startkey: 'orders',
      endkey: 'orders\ufff0'
    })
  } catch {
    console.log('Erro ao buscar os pedidos.')
  }
}