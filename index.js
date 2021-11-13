import * as fs from 'fs'

/*
  1️⃣ Определить сколько уникальных словосочетаний есть во всех указанных файлах(встречается лишь один раз только в одном из файлов).
 
  2️⃣ Определить какое количество словосочетаний встречаются во всех 20 файлах.
 
  3️⃣ Выяснить, сколько словосочетаний встречается, ** как минимум в 10 файлах.
*/

console.time('Test all logic');

const collection = {}

const uniqueValues = () => {
  let count = 0

  for (const key in collection) {

    if (collection[key].size === 1) {
      const parse = [...collection[key]]
      if (parse[0][1] === 1) {
        count += 1
      }
    }
  }

  console.log(`Уникальных словосочетаний: ${count}`)
}

const existInAllFiles = () => {
  let count = 0

  for (const key in collection) {
    if (collection[key].size === 20) {
      count += 1
    }
  }

  console.log(`Словосочетаний, которые есть во всех 20 файлах: ${count}`)
}

const existInAtLeastTen = () => {
  let count = 0

  for (const key in collection) {
    if (collection[key].size >= 10) {
      count += 1
    }
  }

  console.log(`Словосочетаний, которые есть, как минимум, в десяти файлах: ${count}`)
}

const addToCollection = (file, name) => {
  for (const str of file) {
    if (collection[str]) {
      if (collection[str].has(name)) {
        const value = collection[str].get(name)
        collection[str].set(name, value + 1)
      } else {
        collection[str].set(name, 1)
      }
    } else {
      collection[str] = new Map().set(name, 1)
    }
  }
}

const dir = fs.readdirSync('./files')

for (const fileName of dir) {
  const file = fs.readFileSync(`./files/${fileName}`, { encoding: 'utf-8' })

  addToCollection(file.split('\n'), fileName)
}

console.time(`Test for output data`);
uniqueValues()
existInAllFiles()
existInAtLeastTen()
console.timeEnd('Test for output data');
console.timeEnd('Test all logic');
