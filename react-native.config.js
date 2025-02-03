module.exports = {
  dependency: {
    platforms: {
      android: {
        packageInstance:
          'new CodePush(getResources().getString(R.string.CodePushReleaseChannelPublicId), getApplicationContext(), BuildConfig.DEBUG)',
        sourceDir: './android/app',
      },
    },
  },
};
