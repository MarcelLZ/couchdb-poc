import PouchDB from 'pouchdb'

/**
 * Configurations.
 */
const LOCAL_DB = 'homolog'
const COUCHDB_URL = 'couchdb.fw7services.net'
const REMOTE_DB = `https://admin:couchdb@${COUCHDB_URL}/${LOCAL_DB}`

/**
 * Instanciating dbs.
 */
const db = new PouchDB(LOCAL_DB)
const remoteDatabase = new PouchDB(REMOTE_DB)

/**
 * Sync configurations.
 */
PouchDB.sync(db, remoteDatabase, {
  live: true,
  heartbeat: false,
  timeout: false,
  retry: true
})

export { db }