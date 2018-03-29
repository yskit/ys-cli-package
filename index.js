const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

module.exports = async function(options) {
  const { type, file, output, data } = options;
  const filePath = path.resolve(__dirname, './templates', type, file + '.ejs');
  if (!fs.existsSync(filePath)) {
    throw new Error(`找到不到类型为 ${type} 的模板文件 ${file}`);
  }
  const _options = {
    root: path.resolve(__dirname, 'templates')
  }
  const strings = await new Promise((resolve, reject) => {
    ejs.renderFile(filePath, data || {}, _options, function(err, str){
      if (err) return reject(err);
      resolve(str);
    });
  });
  fs.outputFileSync(output, strings, 'utf8');
}