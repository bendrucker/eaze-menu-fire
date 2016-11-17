'use strict'

const fs = require('fs')
const path = require('path')
const Archive = require('archiver')
const browserify = require('browserify')
const pkg = require('./package.json')
const manifest = require('./manifest.json')

const archive = Archive('zip')

archive.pipe(fs.createWriteStream(pkg.name + '.zip'))

// Add the manifest w/ the version from package.json
archive.append(JSON.stringify(Object.assign(manifest, {version: pkg.version}), null, 2), {
  name: 'manifest.json'
})

// Add the icon
archive.append(fs.createReadStream(path.resolve(__dirname, 'fire.png')), {
  name: 'fire.png'
})

// Add the bundle
archive.append(browserify(__dirname).bundle(), {
  name: 'inject.js'
})

archive.finalize()
