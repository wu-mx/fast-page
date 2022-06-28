const MarkdownIt = require('markdown-it');
const fs = require('fs')
const chalk = require('chalk');
const markdown = new MarkdownIt();

//Replacer,replace words in json
function replace(str,obj){
    //遍历一遍，把所有的key都替换成value
    for(const [key,value] of Object.entries(obj)){
        str = str.replace(`{${key}}`,value);
    }
    return str;
}

//Markdown render function,在读取配置文件时调用，相当于配置文件引入时已经预渲染成了html
function md(path){
    try {
        //读md
        let mdFile = fs.readFileSync(path,'utf8');
        try{
            //渲染md
            let html = markdown.render(mdFile);
            return html
        }catch (e){
            console.log(chalk.red('Error in markdown render,please check your markdown file'+e));
        }
    }catch (e) {
        console.log(chalk.red(`${path} not found`));
    }
}

//Html renderer function
function render(path,options){
    //最终渲染器
    let file = fs.readFileSync(path,'utf8');
    let html = replace(file,options);
    return html;
}

//Export
module.exports = {render,md}


