#!/usr/bin/env node
const program = require('commander');
const check = require('./src/util/check');
const chalk = require('chalk');
const pkg = require('./package.json');


(async () => {

    await check.checkUpdate();

    program
        .command('upload')
        .description('duola app 上传指令')
        .action((options) => {
            require('./src/commands/upload')(options)
        });

    // program.option('-t, --transform <package name or path>', 'plugin path or npm package name, supports multiple plugins, separated by commas')
    //     .option('-av, --appversion <path>', 'please write upload duola app version')
    //     .option('-p, --path <path>', 'source file path')
    //     .action((options) => {
    //         transform(options).then(() => { console.log(); }).catch(() => {
    //             process.exit(1);
    //         });
    //     })

    program
        .version(pkg.version)
        .description(chalk.green('duola 命令行工具'));

    //默认展示帮助信息
    if (process.argv && process.argv.length < 3) {
        program.help();
    }

    program.parse(process.argv);


})();