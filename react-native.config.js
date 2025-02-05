module.exports = {
  dependency: {
    platforms: {
      android: {
        packageInstance: 'CodePush.getInstance(getApplicationContext())',
        sourceDir: './android/app',
      },
    },
  },
};
