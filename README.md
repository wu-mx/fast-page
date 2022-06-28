# Fast-Page
开发中，已支持简单cli。
用法:
```shell
node index -c config.json -t index.html
```

## 参数:<br>
-c --config:配置文件<br>
-t --template:模板文件

## 配置详细：
在模板中，可用花括号将配置中的值替换为模板中的值。可以使用md()函数引入markdown文件。<br>
简单例子：
```
Template:
<html>
<body>
    <h1>{title}</h1>
    <div id="content">{content}</div>
</body>
</html>

Config:
{
    "title": "URLignore",
    "content": md('./README.md')
}

README.md:
# URLignore

Result:
<html lang="en">
<body>
<h1>URLignore</h1>
<div id="content"><h1>URLignore</h1></div>
</html>
```

文件夹里已经有一个示例模板文件，可以直接使用。直接输入命令：
```shell
node index -c ./config.js -t index.html
```
即可