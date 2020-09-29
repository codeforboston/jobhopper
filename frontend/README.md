# JobHopper Frontend

## Environment Setup

The frontend uses Node and NPM for building, linting, and running tests. Here's how you set it up:

1. Install [Node 14](https://nodejs.org/en/download/)
2. Instal project dependencies by running `npm install` from this directory.
3. Start the app with `npm start` from this directory.

You should run `npm install` whenever `package.json` changes.

## VSCode Editor Setup

The frontend is set up to show linting/syntax/types and automatically format code in VSCode. Here's how you set it up:

1. [Install VSCode](https://code.visualstudio.com/download).
2. Open `project.code-workspace` in the project root, and follow the prompt to open the workspace.
3. Install the recommended extensions.
4. Remember to open the workspace in the future, not just the jobhopper directory.

## Running the App

In your terminal/command prompt run `npm start` to start the app. It will open automatically in a browser window.

To stop the local server press ctrl + c in your terminal.

## Testing

We use Jest for DOM and unit tests. Run `npm test` to get started.

## Committing Code

We use husky and lint-staged to run linting and fix code formatting whenever you commit code. This helps keep the codebase healthy. If you need to commit without running these checks, use `git commit --no-verify`.

You can run these manually from the root directory with `npm run lint` and `npm run fix`.
