'use strict'

const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');

module.exports = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "请输入duola app的版本号",
            name: "appVersion"
        },
        {
            type: "input",
            message: "请输入duola app的本地路径",
            name: "appPath"
        }
    ]).then(answers => {
        console.log(`duola app 上传校验开始>>>>>>>>`);
        console.log(`app的版本号${answers.appVersion}`);
        console.log(`app的路径${answers.appPath}`);
        const url = "localhost:3000/api/uploadFile/";
        shell.exec(`
                if [ -f ${answers.appPath} ];then
                echo "文件存在,开始上传文件>>>>>>>>>"
                result=$(curl ${url} -X POST  -F "files=@${answers.appPath}" -H "apk_version: ${answers.appVersion}")
                echo $result
                    else
                echo "文件不存在😭"
            fi
            `, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }
            if (stdout && stdout.indexOf("success" != -1)) {
                console.log(chalk.green('    upload success！😊'));
                console.log();
                console.log(chalk.blue(`     duola app${answers.appVersion} 上传成功`));
                console.log();
                console.log(chalk.green('    to enjoy !!!'));
            } else {
                console.log(chalk.green('    upload fail！😭'));
                console.log();
                console.log(chalk.blue(`     ${stderr}`));
                console.log();
            }
        })
    })
}