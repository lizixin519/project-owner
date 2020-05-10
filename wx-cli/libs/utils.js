const fs = require('fs');
const path = require('path');

/**
 * @param {path}
 * @Description: 判断文件/文件夹是否存在
 * @Author: Lzx
 * @Date: 2020-05-07 23:18:31
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function isFileExist(src) {
  return fs.existsSync(src);
}
/**
 * @param {src}
 * @Description: 创建文件夹
 * @Author: Lzx
 * @Date: 2020-05-07 23:21:20
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function createDir(src) {
  return new Promise((resolve, reject) => {
      fs.mkdir(src, { recursive: true }, (err) => {
          if (err) {
            reject(err)
          }
          return resolve();
      });
  });
}

/**
 * @param {src}
 * @Description: 读取文件夹下列表
 * @Author: Lzx
 * @Date: 2020-05-07 23:31:23
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function readDir(src) {
  return new Promise((resolve, reject) => {
      fs.readdir(src, (err, file) => {
          if (err) {
            reject(err)
          }
          return resolve(file);
      });
  });
}

/**
 * @param {originPath, curPath}
 * @Description: 复制文件
 * @Author: Lzx
 * @Date: 2020-05-08 10:56:13
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function copyFile(originPath, curPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(originPath, curPath, fs.constants.COPYFILE_EXCL, (err) => {
      if (err) {
        reject(err)
      }
      return resolve(file);
    })
  })
}

/**
 * @param {originPath, curPath, arr}
 * @Description: 批量复制文件
 * @Author: Lzx
 * @Date: 2020-05-08 10:59:03
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function copyFileList(originPath, curPath, arr) {
  return new Promise(async (resolve, reject) => {
    let extName = '';
    for (let i = 0; i <= arr.length - 1; i++) {
      extName = path.extname(arr[i]);
      await this.copyFile(`${originPath}/${arr[i]}`, curPath + extName);
    }
    return resolve('copyFilesArr success!!!');
  })
}

/**
 * @param {...path}
 * @Description: 路径合并resolve
 * @Author: Lzx
 * @Date: 2020-05-08 11:13:48
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function pathResolve(...src) {
  return path.resolve(...src)
}

/**
 * @param {...path}
 * @Description: 路径合并join
 * @Author: Lzx
 * @Date: 2020-05-08 11:15:13
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function pathJoin(...src) {
  return path.join(...src)
}

module.exports = {
  isFileExist,
  createDir,
  readDir,
  copyFile,
  copyFileList,
  pathResolve,
  pathJoin
}