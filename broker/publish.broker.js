const publisher = require('@pact-foundation/pact-node')
const { resolve } = require('path')

const opts = {
    pactFilesOrDirs: [resolve(process.cwd(), '../pacts/')],
    pactBroker: 'http://localhost:9292/',
    tags: ['ebacTest'],
    consumerVersion: '1.0.0'
}

publisher.publishPacts(opts).catch(err=>console.log(err))
