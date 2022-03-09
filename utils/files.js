const path = require('path');
const uuid = require('uuid');
const { statics } = require('../constants/statics');

const moveFile = (file) => {
  if (file) {
    const extention = path.extname(file.name).substr(1);
    const fileName = `${uuid.v4()}.${extention}`;

    file.mv(path.resolve(__dirname, statics.general, fileName));

    return fileName;
  }

  return new Error('Нет фото');
};

const moveFiles = (files) => {
  if (!Array.isArray(files)) {
    const filename = moveFile(files);
    return [filename];
  }

  const filesNames = files.map((file) => {
    const extention = path.extname(file.name).substr(1);
    const fileName = `${uuid.v4()}.${extention}`;

    file.mv(path.resolve(__dirname, statics.general, fileName));

    return fileName;
  });

  return filesNames;
};

module.exports = {
  moveFile,
  moveFiles,
};
