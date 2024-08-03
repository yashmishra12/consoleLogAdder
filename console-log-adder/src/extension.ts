
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

