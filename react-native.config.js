module.exports = {
  dependency: {
    platforms: {
      android: {
        packageInstance: 'new CodePush(getApplicationContext())',
        sourceDir: './android/app',
      },
    },
  },
};
