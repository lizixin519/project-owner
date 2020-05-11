/*
 * @name: 
 * @msg: 
 * @param: 
 */
const path = require('path');
const fs = require('fs');
const log = require('./log');
const validFileName = require('valid-filename');
const { exit } = require('./exit');
const download = require('download-git-repo');
const ora = require('ora');
const spawn = require('cross-spawn')

let packageName = '';
let basicDirectory = ''
let spinner = null;

/**
 * @param {}
 * @Description: 创建文件夹
 * @Author: Lzx
 * @Date: 2020-05-10 15:08:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-11 16:33:55
 */
function createDir() {
  return new Promise(resolve => {
    fs.mkdir(basicDirectory, err => {
      if(err) {
        log.error(err);
        exit(1, '创建文件夹失败')
      }
      resolve()
    })
  })
}
/**
 * @param {type}
 * @Description: 下载js库模版
 * @Author: Lzx
 * @Date: 2020-05-10 15:15:44
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */

function downloadTemplate() {
  spinner = ora('downloading template...').start();
  return new Promise(reslove => {
    download('lizixin519/js-utils-template', basicDirectory, err => {
      if(err) {
        console.log(err.HTTPError)
        log.error(err)
        exit(1, '', basicDirectory)
      }
      spinner.succeed('模版下载完毕')
      reslove();
    })
  })
}
/**
 * @param {}
 * @Description: 安装依赖
 * @Author: Lzx
 * @Date: 2020-05-10 15:20:43
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function installTemplate() {
  spinner = ora('installing').start();
  spawn.sync('npm', ['install'], {
    cwd: basicDirectory,
    stdio: 'inherit'
   })
   spinner.succeed('安装依赖完成')
}
/**
 * @param {packageName}
 * @Description: 初始化js工具库模版文件
 * @Author: Lzx
 * @Date: 2020-05-10 14:51:33
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
async function initLibTemplate(name) {
  if(!validFileName(name)) {
    exit(1, '无效的文件名')
  }
  packageName = name;
  basicDirectory = path.join(process.cwd(), `/${packageName}`)
  if(fs.existsSync(basicDirectory)) {
    exit(1, `已存在${packageName}文件`)
  }
  try {
    await createDir();
    await downloadTemplate();
    await installTemplate();
  } catch(e) {
    exit(1, e.message, basicDirectory)
  }
  log.success('初始化完成')
}

module.exports = {
  initLibTemplate
}