const program = require('commander');
let { initLibTemplate } = require('./libs/init');
let log = require('./libs/log');

program
  .version(require('./package.json').version, '-v --version')

program
  .command('init <library-name>')
  .description('初始化js工具库模版')
  .action((cmd, options) => {
    let argv = process.argv.slice(3)
    if(argv.length > 1) {
      log.warn('检测到您输入多个名称，我们将选取第一个作为您的包名');
    }
    let packageName = argv[0];
    initLibTemplate(packageName)
  })

program.parse(process.args)