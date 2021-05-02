import PouchDB from 'pouchdb'

/**
 * Configurations.
 */
const LOCAL_DB = 'homolog'
const COUCHDB_URL = 'ec2-18-222-48-29.us-east-2.compute.amazonaws.com'
const REMOTE_DB = `http://admin:couchdb@${COUCHDB_URL}/${LOCAL_DB}`

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