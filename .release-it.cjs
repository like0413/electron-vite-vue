module.exports = {
  hooks: {},
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCommits: true,
    commit: true, // 自动为package.json的版本号变化创建一个提交
    commitMessage: 'chore(release): ${version}',
    tag: true,
    tagAnnotation: 'Release ${version}',
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
}
