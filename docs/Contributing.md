# Git and Github

If you're new to github check out [Github Guide, Hello World](https://guides.github.com/activities/hello-world/) to make an account and get started with Github and [How to: fork a repo](https://help.github.com/articles/fork-a-repo/) to learn how to fork a repo.

# Setup

1. Fork the repository: On GitHub, navigate to the [repository](https://github.com/codeforboston/jobhopper). In the top-right corner of the page, click Fork.
2. On GitHub, navigate to your fork of the jobhopper repository. In the Clone with HTTPs section, click to copy the clone URL for the repository.
3. Clone (download) your fork to your computer. Using the clone URL from the previous step, run these commands to download to a folder called `jobhopper`:

```sh
git clone https://github.com/YOUR-USERNAME/jobhopper.git
cd jobhopper
```

4. Add the main codeforboston repository as a remote called `upstream`. You will use this to download updates to the code:

```sh
git remote add upstream https://github.com/codeforboston/jobhopper.git
```

# Updating

Pull requests are merged into codeforboston's `develop` branch. This makes `develop` our main development branch. You'll want to keep your fork and local repo in sync with this branch so you're always working off the latest code. To do so, run these commands:

```sh
git checkout develop
git pull upstream develop
git push origin develop
```

**You should never commit directly to your develop branch**. This ensures that the above commands complete without merge conflicts. See the next section for how to commit new code.

For more details, view this [article](https://help.github.com/articles/syncing-a-fork/)

# Committing and Contributing

Any work you do should be on a feature branch based on `develop`. Once your work is complete, you'll open a pull request to merge your branch back into codeforboston's `develop` branch. This follows the standard [Github flow](https://guides.github.com/introduction/flow) model. Here are the steps in the workflow:

1. Make sure `develop` is up to date, then check it out: `git checkout develop`
2. Create a feature branch off of develop: `git checkout -b my-feature-branch`
3. Do your work, committing as you go
4. Once you're finished, [open a pull request](https://github.com/codeforboston/jobhopper/compare), with base set to codeforboston's `develop` branch and head set to your fork and feature branch.
5. Respond to review comments and fix any failing checks that are posted to the conversation.
6. Once someone approves your PR, merge it!

Your feature branch must not have any conflicts with develop when you merge. If there are any, it will say so on the PR conversation. To fix this, you need to update your `develop` branch and merge it into your feature branch. This is also what you should do to incorporate new code into your feature branch:

```sh
# Sync local develop branch
git checkout develop
git pull upstream develop
# Merge develop into feature branch
git checkout my-feature-branch
git merge develop
```

Git will give an error like "Automatic merge has failed; fix conflicts and then commit the result" and list the conflicting files. See [this article](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/) for how to resolve merge conflicts. It is recommended to use VSCode to navigate merge conflicts as it has superior UX to the command line, but the goal is the same: get rid of the ">>>/===/<<<" conflict markers and then run `git commit` to finish the merge. If you decide you don't want to merge, run `git merge --abort`. Resolving conflicts is the trickiest part of the Github flow, feel free to ask for help on Slack or at a hack night!
