# 足球联赛管理系统（管理员端）

## 这是我的数据库课程设计
也是我在初步学习了Node.js的知识后建造的作品，该作品分为管理员端和客户端（当时能力不足，所以将这两个端划分成为两个项目）

主题框架是Koa，辅以Nunjucks（网页模板引擎）、Sequelize（使Node具有访问数据库的能力）

## 系统功能
![](https://gitee.com/DanielBamboo/images/raw/master/20210202091452.png)

| 导航名 | 功能 | 解释 |
|:--:|:--:|:--:|
| Player |管理球员信息 | 添加、删除球员或修改球员信息 |
| Coaches | 管理教练信息 | 同上 |
| Clubs | 管理俱乐部信息 | 更改俱乐部所在联赛、聘用主教练、修改俱乐部信息 |
| Games | 查看比赛日程 | 可以修改每场比赛的事件（只支持添加，不支持修改） |
| Seasons | 查看赛季情况 | 可以在此生成新赛季的比赛 |

## 项目结构

项目采用的是MVC架构(Model-View-Controller)

> 如果你学习过廖雪峰老师的Javascript课程中的Node.js章节，你应该对以下目录结构很了解

    .
    ├── controllers                     # 在这里存放着控制器们
    │   ├── clubs.js                    # 举个例子，这是存放clubs功能所需要的控制器们
    │   ├── edit-games.js               # 存放编辑比赛所用到的控制器们
    │   └── ...
    ├── static                          # 静态资源
    │   ├── js、css                     # JQuery、Bootstrap库的js、css文件
    |   └── Images                      # 项目用到的图片
    ├── views                           # HTML文件
    ├── app.js                          # 这是这个Node.js项目的main
    ├── config.js                       # MySQL配置
    ├── controller.js                   # 使用/controllers/目录中的控制器定义路由规则
    ├── static_files.js                 # 对static静态资源支持访问
    ├── tables.js                       # 存放着表的数据结构类
    ├── templating.js                   # nunjucks配置
    └── README.md

## 数据文件
包含在了仓库里：[链接](./data/dbc_design.sql)