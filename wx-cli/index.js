/*
 * @name: wxapp-cli
 * @msg: 小程序框架
 * @param: {projectName}
 */
const version = require('./package').version;
const program = require('commander');
const { initProject } = require('./libs/init-project');
const log = require('./libs/log');

program.version(version, '-v, --version');

program
  .command('init <projectName>')
  .description('init a miniProgram')
  .action((cmd, options) => {
    if( process.argv.slice(3).length > 1 ) {
      log.warn('检测到您输入了多个项目名称，我们将默认使用第一个作为项目名')
    }
    let packageName = process.argv.slice(3)[0];
    initProject(packageName)
  })

program.parse(process.argv)