const MarkdownIt = require('markdown-it');
const fs = require('fs')
const chalk = require('chalk');
const markdown = new MarkdownIt();

//Script for test
//Markdown render
//Replacer,replace words in json
function replace(str,obj){
    for(const [key,value] of Object.entries(obj)){
        str = str.replace(`{${key}}`,value);
    }
    return str;
}

//Markdown render function
function md(path){
    try {
        let mdFile = fs.readFileSync(path,'utf8');
        try{
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
    let file = fs.readFileSync(path,'utf8');
    let html = replace(file,options);
    return html;
}

module.exports = {render,md}


