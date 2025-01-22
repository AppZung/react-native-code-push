var CodePushWrapper = require("../codePushWrapper.js");

module.exports = {
    startTest: function (testApp) {
        CodePushWrapper.checkForUpdate(testApp, undefined, undefined, "CUSTOM-RELEASE-CHANNEL-PUBLIC-ID");
    },

    getScenarioName: function () {
        return "Check for Update Custom Key";
    }
};
