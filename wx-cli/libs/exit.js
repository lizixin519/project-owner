/*
 * @name: exit
 * @msg: 进程控制
 * @param: { 0: 成功 1: 失败, 默认: 0 }
 */
const del = require('del');
const log = require('./log');
module.exports = {
  exit(code = 0, msg = '', path) {
  if(code === 1) {
    if(msg) {
      log.error(msg)
    }
    if(path) {
      del.sync(path)
    }
    process.exit(1)
  } else if(code === 0){
    if(msg) {
      log.success(msg)
    }
    process.exit(0)
  }
  }
}