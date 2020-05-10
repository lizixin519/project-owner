/*
 * @name: log
 * @msg: 优化终端显示
 * @param: { msg }
 */
const chalk = require('chalk');

module.exports = {
  success(msg) {
    console.log(chalk.green(`>> ${msg}`));
  },
  warn(msg) {
    console.log(chalk.yellow(`>> ${msg}`));
  },
  error(msg) {
    console.log(chalk.red(`>> ${msg}`));
  }
}