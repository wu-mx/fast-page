const { program } = require('commander');
const core = require('./core');
const fs = require('fs');
const chalk = require("chalk");

//装逼用的计时器
class Timer{
    constructor() {
        this.now = Date.now();
    }
    get(){
        return Date.now() - this.now
    }
}

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
        let timer = new Timer();
        //读取配置文件
        let configFile = require(options.config);
        //渲染完毕直接输出
        fs.writeFileSync('result.html',core.render(options.templete,configFile));
        //开始装逼
        console.log(chalk.greenBright(`Render finished in ${timer.get()/1000}s`));
    }catch (e) {
        console.log(chalk.red('Config file is not valid'));
        process.exit(1);
    }

}
