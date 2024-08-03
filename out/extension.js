"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('console-log-adder.addConsoleLog', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedLine = editor.selection.active.line;
            const selectedLineEnd = editor.document.lineAt(selectedLine).range.end;
            const logStatement = `console.log(\`\`);`;
            editor.edit((editBuilder) => {
                editBuilder.insert(selectedLineEnd, logStatement);
            }).then(() => {
                // Calculate the position inside the backticks
                const positionInsideBackticks = selectedLineEnd.with(selectedLineEnd.line, selectedLineEnd.character + logStatement.length - 3);
                // Create a new selection at the desired position
                const newSelection = new vscode.Selection(positionInsideBackticks, positionInsideBackticks);
                // Set the editor selection to move the cursor
                editor.selection = newSelection;
            });
        }
    });
    context.subscriptions.push(disposable);
}
//# sourceMappingURL=extension.js.map