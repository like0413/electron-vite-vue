module.exports = {
  hooks: {},
  git: {
    // changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCommits: true, // 如果设为true，则需要有新的提交才可以发布
    // requireCommitsFail: true, // 如果设为true，如果没有新的提交则发布会失败
    commit: true, // 如果设置为true，则创建一个新的 git commit
    commitMessage: 'chore(release): ${version}',
    tag: true,
    // getLatestTagFromAllRefs: false,
    tagAnnotation: 'Release ${version}',
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
}
