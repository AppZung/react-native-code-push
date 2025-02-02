import React, { Platform } from "react-native";

export interface Button {
  text: string;
  onPress?: () => void;
}

interface AlertInterface {
  alert(title: string, message: string, buttons: Button[]): void;
}

let Alert: AlertInterface = React.Alert;

if (Platform.OS === "android") {
  const { NativeModules: { CodePushDialog } } = React;

  Alert = {
    alert(title: string, message: string, buttons: Button[]): void {
      if (buttons.length > 2) {
        throw new Error("Can only show 2 buttons for Android dialog.");
      }

      const button1Text = buttons[0] ? buttons[0].text : null,
            button2Text = buttons[1] ? buttons[1].text : null;

      CodePushDialog.showDialog(
        title, message, button1Text, button2Text,
        (buttonId: number) => { buttons[buttonId]!.onPress && buttons[buttonId]!.onPress(); },
        (error: Error) => { throw error; });
    }
  };
}

export { Alert };
