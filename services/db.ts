import PouchDB from 'pouchdb'

const COUCHDB_URL = 'ec2-18-222-48-29.us-east-2.compute.amazonaws.com'

const LOCAL_DB = 'homolog'
const REMOTE_DB = `http://admin:couchdb@${COUCHDB_URL}/${LOCAL_DB}`
// const REMOTE_DB_HEARTBEAT = 'http://localhost:5984/_up'

const db = new PouchDB(LOCAL_DB)
const remoteDatabase = new PouchDB(REMOTE_DB)

PouchDB.sync(db, remoteDatabase, {
  live: true,
  heartbeat: false,
  timeout: false,
  retry: true
})

export { db, remoteDatabase }