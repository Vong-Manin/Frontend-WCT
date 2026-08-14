'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repositoryRoot = path.resolve(__dirname, '../..');

function readExport(file, exportName) {
  const source = fs
    .readFileSync(path.join(repositoryRoot, 'src/app/data', file), 'utf8')
    .replace(/export\s+const\s+/g, 'const ');
  const context = { Date };
  vm.runInNewContext(`${source}\nglobalThis.__seedValue = ${exportName};`, context, {
    filename: file,
  });
  return JSON.parse(JSON.stringify(context.__seedValue));
}

const data = {
  rooms: readExport('rooms.js', 'rooms'),
  activities: readExport('activities.js', 'activities'),
  menuItems: readExport('dining.js', 'dining'),
  reviews: readExport('reviews.js', 'initialReviews'),
  galleryItems: readExport('gallery.js', 'gallery'),
};

const output = path.resolve(__dirname, '../src/seed/data.json');
fs.writeFileSync(output, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Generated ${path.relative(repositoryRoot, output)} from the preserved local modules.`);
