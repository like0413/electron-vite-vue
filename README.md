## 快速开始

```sh
# clone the project
git clone https://github.com/electron-vite/electron-vite-vue.git

# enter the project directory
cd electron-vite-vue

# install dependency
pnpm install

# develop
pnpm dev

# build
pnpm build
```

## 分支

`alpha`: 开发分支，用于开发环境

`beta`: 测试分支，用于测试环境

`main`: 主分支，用于生产环境

## 工作流程

1、在`alpha`本地开发，开发完后提交并`push`。

## 测试流程

2、切换到`beta`分支，运行`git merge alpha`。

3、运行`pnpm release:beta`：

- 自动打 tag
- 自动更新 package.json 版本号
- 自动推送到远程仓库

## 发布流程

4、测试通过后，切换到`main`分支，运行`git merge beta`，然后运行`pnpm release:prod`：

- 自动打 tag
- 自动更新 package.json 版本号
- 自动推送到远程仓库

## 注意事项

1、测试人员只需要下载安装对应版本一次即可，会自动更新。

## 其他

你也可以先推送到远程仓库，然后在 GitHub 上创建一个新的 Pull Request，然后在 GitHub 上进行合并，最后在本地进行拉取。
