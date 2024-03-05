module.exports = {
  hooks: {},
  git: {
    // changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCommits: true, // 如果设为true，则需要有新的提交才可以发布
    commit: false, // 如果设置为true，则创建一个新的 git commit
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
