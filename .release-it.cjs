module.exports = {
  hooks: {},
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCommits: true,
    commit: true, // 自动为package.json的版本号变化创建一个提交
    commitMessage: 'chore(release): v${version}',
    tag: true,
    tagAnnotation: 'Release v${version}',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'angular',
      },
      infile: 'CHANGELOG.md',
    },
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
}
