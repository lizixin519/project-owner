
/*
 * @name: init
 * @msg: 初始化项目
 * @param: { cmd, options }
 */
const {
  pathJoin,
  isFileExist,
  createDir
} = require('./utils');
const fs = require('fs');
const validFilename = require('valid-filename');
const download = require('download-git-repo');
const templateConfig = require('../template.config');
const ora = require('ora');
const inquirer = require('inquirer');
const { exit } = require('../libs/exit');
const jsonFormat = require('json-format');
const baseDirectory = process.cwd();
let spinner = null;
let packageName = ''
let projectDirectory = ''


let initFunction = [{
  type: 'input',
  name: 'appId',
  message: '请填入appId',
}]
/**
 * @param {packageName}
 * @Description: 创建项目文件并检测是否合法
 * @Author: Lzx
 * @Date: 2020-05-08 14:05:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-08 16:26:58
 */
async function mkdirProject() {
  // 检测文件名是否合法
  if(!validFilename(packageName)) {
    exit(1, `不合法的文件名${packageName}`)
  }
  // 检测是否存在相同文件夹
  if(isFileExist(projectDirectory)) {
    exit(1, '文件已存在')
  }
  await createDir(projectDirectory)
}

/**
 * @param {packageName}
 * @Description: 下载github上面存在的模版
 * @Author: Lzx
 * @Date: 2020-05-08 15:38:36
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
async function downloadTemplate() {
  spinner = ora('download template...').start();
  return new Promise((reslove, reject) => {
    download(templateConfig.url, projectDirectory, function(err, res) {
      if(err) {
        console.log(err)
        loading.warn(err)
        exit(1, '', projectDirectory)
      }
      reslove(res)
    })
  })
}

/**
 * @param {type}
 * @Description: 配置写入文件
 * @Author: Lzx
 * @Date: 2020-05-10 13:01:08
 * @LastEditors: lzx
 * @LastEditTime: Do not Edit
 */
function writeProjectFile(answer) {
  let appId = answer.appId ? answer.appId : ''
  let projectConf = require(pathJoin(projectDirectory, '/src/project.config.json'))
  projectConf.projectname = packageName;
  projectConf.appid = appId;
  return new Promise((reslove, reject) => {
    fs.writeFile(pathJoin(projectDirectory, '/src/project.config.json'), jsonFormat(projectConf), (err) => {
      if(err) {
        console.log(err)
        exit(1, '', projectDirectory)
      }
      reslove()
    })
  })
};

/**
 * @param {cmd, options}
 * @Description: 初始化项目创建
 * @Author: Lzx
 * @Date: 2020-05-08 11:12:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-08 13:59:59
 */
async function initProject(projectName) {
  packageName = projectName;
  projectDirectory = pathJoin(baseDirectory, `/${packageName}`)
  await mkdirProject();
  let answer = await inquirer.prompt(initFunction);
  await downloadTemplate();
  await writeProjectFile(answer);
  spinner.succeed('项目初始化成功')
  exit(0)
}





module.exports = {
  initProject
}
