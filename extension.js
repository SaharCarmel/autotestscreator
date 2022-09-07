// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
var path = require("path");
var fs = require("fs");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "autotest" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "autotest.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from AutoTest!");
      const editor = vscode.window.activeTextEditor;
      const selectedText = editor?.document.getText(editor.selection);
      console.log(selectedText);
      var currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;
      vscode.window.showInformationMessage(currentlyOpenTabfilePath);
      var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      var baseWorkSpacedir =
        currentlyOpenTabfilePath.split("/").slice(0, -1).join("/") + "/tests";
      if (!fs.existsSync(baseWorkSpacedir)) {
        fs.mkdirSync(baseWorkSpacedir);
      }
      const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
      var testFileName =
        "test_" +
        currentlyOpenTabfilePath.split("/").at(-1).split(".")[0] +
        ".py";
      if (fs.existsSync(baseWorkSpacedir + "/" + testFileName)) {
        fs.appendFile(
          baseWorkSpacedir + "/" + testFileName,
          "	def test_" + selectedText + "(self):\n		pass\n\n",
          (err) => {
            if (err) {
              console.log(err);
            } else {
              // Get the file contents after the append operation
              console.log(
                "\nFile Contents of file after append:",
                fs.readFileSync("example_file.txt", "utf8")
              );
            }
          }
        );
      } else {
        fs.appendFile(
          baseWorkSpacedir + "/" + testFileName,
          "import unittest \n\nclass Test" +
            capitalize(currentlyOpenTabfileName.split(".")[0]) +
            "(unittest.TestCase):\n\n",
          (err) => {
            if (err) {
              console.log(err);
            } else {
              // Get the file contents after the append operation
              console.log(
                "\nFile Contents of file after append:",
                fs.readFileSync("example_file.txt", "utf8")
              );
            }
          }
        );
      }
      vscode.window.showInformationMessage(currentlyOpenTabfileName);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
