<<<<<<< HEAD
<<<<<<< HEAD
# JobHopper Frontend

## Environment Setup

The frontend uses Node and NPM for building, linting, and running tests. Here's how you set it up:

1. Install [Node 14](https://nodejs.org/en/download/)
2. Install project dependencies by running `npm install` from this directory.
3. Start the app with `npm start` from this directory.
4. Start the storybook UI with `npm run storybook` from this directory.

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

## Running Storybook

Storybook is a tool for developing UI components and pages. It allows you to write test cases for your components and render them in a UI separate from the application. This makes it easy to test your UI different configurations. To start the storybook UI, run `npm run storybook`.

## Testing

We use Jest for DOM and unit tests. Run `npm test` to get started.

## Committing Code

We use husky and lint-staged to run linting and fix code formatting whenever you commit code. This helps keep the codebase healthy. If you need to commit without running these checks, use `git commit --no-verify`.

You can run these manually from the root directory with `npm run lint` and `npm run fix`.
=======
![Job Hopper Logo](./frontend/src/ui/assets/jobHopperLogo.png)
=======
![JobHopper Logo](./frontend/src/ui/assets/jobHopperLogo.png)
>>>>>>> b072a1c79ce5d373597d181c40604c13d6877069

- Development (`develop`)
  - [App](https://jobhopper-dev.web.app/)
  - [Storybook](http://develop--5fc435a5fe83cf002139d5f7.chromatic.com/)
  - [Development Firebase Console](https://console.firebase.google.com/u/0/project/jobhopper-dev)

## General Information

JobHopper is an application for analyzing and querying career mobility and outside options data set to help workers, public sector professionals, and policymakers to improve career training, career paths, and career mobility options.

# Installation Overview

For details on setup, see [Installation](./docs/Installation.md)

# Technologies Used

| Front End          | Logic & Data Processing: | Database: |
| ------------------ | ------------------------ | --------- |
| React (JavaScript) | Django (Python 3.7)      | Postgres  |

For more details, see [Architecture](./docs/Architecture.md)
Also details on [Database Setup](./docs/DataREADME.md) and [Django Migrations](./docs/DjangoData.md) are available.

## Additional Resources

<<<<<<< HEAD
The following provides details on how the data was sourced etc.
[Data References](./docs/References.md)
>>>>>>> 2a1390e9ac35a6194d2ee4f215a8cc01bd6e59c1
=======
For details on the data, see [Data Sources](./docs/References.md).
>>>>>>> b072a1c79ce5d373597d181c40604c13d6877069
