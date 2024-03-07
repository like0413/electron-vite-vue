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

`dev`: 开发分支，用于开发环境

`test`: 测试分支，用于测试环境

`main`: 主分支，用于生产环境

## 工作流程

1、在`dev`开发，开发完后提交，然后`push`。

## 测试流程

2、然后到 github 上创建一个`pull request`，将`dev`分支合并到`test`分支，它将触发构建流程，构建完成后会将打包好的文件上传到阿里云 oss。

> （具体逻辑可以看`.github/workflows/ci,yml`）。

## 发布流程

3、测试通过后，将`test`分支合并到`main`分支，不触发构建（具体逻辑可以看`.github/workflows/ci,yml`）。

4、切换到 main 分支，运行`git pull`拉取最新代码，然后运行`pnpm release`：

- 自动打 tag
- 自动更新 package.json 版本号
- 自动推送到远程仓库

## 其他问题

1、你无需关心 beta 的版本号，因为是不经过 pnpm release 发布的，也就没有自动更新版本号，从 alpha 合并到 beta 就直接构建了，目的就是为了快速构建测试。
