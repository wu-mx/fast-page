const { program } = require('commander');
const core = require('./core');
const fs = require('fs');
const chalk = require("chalk");

//args 可对照Readme.md看
program
.option('-c,--config <path>', 'Path to config file')
.option('-t --templete <path>', 'Path to template file')

//解析一下
program.parse(process.argv);

let options = program.opts();
if(!options.config && !options.templete){
    console.log('Please specify config file and template file');
    process.exit(1);
}else if(!options.config){
    console.log('Please specify config file');
    process.exit(1);
}else if(!options.templete){
    console.log('Please specify template file');
    process.exit(1);
}else if(!fs.existsSync(options.config)){
    console.log(chalk.red('Config file not found'));
    process.exit(1);
}else if(!fs.existsSync(options.templete)){
    console.log(chalk.red('Template file not found'));
    process.exit(1);
}else{
    try{
        //读取配置文件
        let configFile = require(options.config);
        //渲染完毕直接输出
        console.log(chalk.greenBright('Render finished.'));
        fs.writeFileSync('result.html',core.render(options.templete,configFile));
    }catch (e) {
        console.log(chalk.red('Config file is not valid'));
        process.exit(1);
    }

}
