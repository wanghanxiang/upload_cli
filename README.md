# upload_cli

node 命令行工具 开发记录

## 什么是命令行工具？

命令行工具（Cmmand Line Interface）简称cli，顾名思义就是在命令行终端中使用的工具。我们常用的 git 、npm、vim 等都是 cli 工具，比如我们可以通过 git clone 等命令简单把远程代码复制到本地。

如何开发node版命令行工具

### 1 初始化npm项目


```
npm init
package name: (cli) duola-cli
version: (1.0.0) 
description: my-first-cli
entry point: (index.js) 
keywords: npm cli
author: xiangzaixiansheng
```


### 2 配置bin字段

npm init 后会生成一个package.json文件，在该文件中添加一个bin字段，bin字段的key就是你的命令（duola），value指向相对于package.json的路径（index.js），不同的key对应不同的命令。关于 bin 字段更多信息请参考文档。


```
{
  "name": "duola-cli",
  "version": "1.0.0",
  "description": "my-first-cli",
  "bin": {
    "duola": "index.js"
  }
}
```

### 3 创建index.js文件

在项目根目录创建index.js文件。下面是index.js文件内容：使用console.log() 函数来输出命令行返回信息。


```
#!/usr/bin/env node
 console.log('Hello, world!');
```

注意：第一行一定要添加脚本来指定运行环境（#!/usr/bin/env node）

### 4 本地调试

因为npm包还没有发布，所以在本地想调试的话，可以使用如下命令


```
npm link
```

目前我们就实现了最简单的npm包了。

### 5、添加help信息

我们刚使用一个命令的时候，最常用的就是-h -V这种命令啦。下面介绍如何添加

这里需要使用到下面的包：
commander

npm i commander --save

```
program
    .command('upload')
    .description('duola app 上传指令')
    .action((options) => {
        require('./src/commands/upload')(options)
    });

program.option('-t, --transform <package name or path>', 'plugin path or npm package name, supports multiple plugins, separated by commas')
        .option('-av, --appversion <path>', 'please write upload duola app version')
        .option('-p, --path <path>', 'source file path')
        .action((options) => {
            transform(options).then(() => { console.log(); }).catch(() => {
                process.exit(1);
            });
        })
```
这里就添加了对一个的commnd事件和对应的参数

可以使用-h来查看。
当然如果用户直接使用命令，我们也想弹出help信息
就需要额外的代码


```
//默认展示帮助信息
    if (process.argv && process.argv.length < 3) {
        program.help();
    }
    //最后一定要有这个代码
    program.parse(process.argv);
```



大致记录一下命令行工具开发

最后附赠一篇比较有参考意义的文章
https://www.sohu.com/a/275486462_495695

