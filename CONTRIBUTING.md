# [Contributing](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) to UKIS

We would love for you to contribute to UKIS and help make it even better than it is
today! As a contributor, here are the guidelines we would like you to follow:

 - [Code of Conduct](#coc)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Commit Message Guidelines](#commit)
 - [Signing the CLA](#cla)

## <a name="coc"></a> Code of Conduct
Help us keep UKIS open and inclusive. Please read and follow our [Code of Conduct][coc].

## <a name="issue"></a> Found a Bug?
If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide a minimal reproduction. Having a minimal reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.
Also use our issue templates for [Bug reports and Feature request](https://github.com/dlr-eoc/ukis-frontend-libraries/issues/new/choose)


### <a name="submit-pr"></a> [Submitting a Pull Request](https://opensource.guide/how-to-contribute/#opening-a-pull-request) (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

- Search GitHub for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
- Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
  Discussing the design up front helps to ensure that we're ready to accept your work.
- **Please sign our [Contributor License Agreement (CLA)](#cla) before sending PRs.**
  We cannot accept code without this. Make sure you sign with the primary email address of the Git identity that has been granted access to the UKIS repository.

#### Getting started
1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the UKIS repo [and check that your name and e-mail](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/remembering-your-github-username-or-email) is set in the Git configuration.

2. Clone your forked repository and set the upstream 
  ```shell
     git clone https://github.com/<username>/ukis-frontend-libraries.git

     git remote add upstream https://github.com/dlr-eoc/ukis-frontend-libraries.git
     ```


2. Sync Make a new local topic branch for your chnages:
     ```shell
     git checkout master

     git pull upstream master && git push origin master //

     git checkout -b my-fix-branch master
     ```

  - Follow our [Coding Rules](#rules).
  - Commit your changes using a descriptive [commit message](#a-name%22commit%22a-commit-message-guidelines).
      ```shell
      git commit -a
      ```
      Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

  - Create your patch/feature, **including appropriate test cases**.
  - Document your changes in the [changelog](CHANGELOG.md).
  - Run the full UKIS test suite, as described in the [developer documentation](DEVELOPMENT.md#further-you-can-test-and-build-locally),
  and ensure that all tests pass.


6. Push your branch to your fork on GitHub:
   
    ```shell
    git push origin my-fix-branch
    ```
**Do not, rebase your local branch on newer versions of our master while your work is still in progress or we request changes!!!**

7. [Send a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to `ukis:master`.
  * If we suggest changes then:
    * Make the required updates.
    * Re-run the UKIS test suites to ensure tests are still passing.



[Keeping up with Upstream](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project#_keeping_up_with_upstream)


[Advanced Pull Requests](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project#_advanced_pull_requests)


8. Bring the changes into the `ukis:master`.
  - Once everything is **finished and reviewed** we will rebase the topic branch on the newest master... 


That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented** in the [changelog][changelog].
* Please use the ```.editorconfig``` to make sure your code adheres to our styling-rules. (Many editor have plugins for .editorconfig files. For example for VSCode there is 'EditorConfig for VS Code'.)

## <a name="commit"></a> Commit Message Guidelines

Please consider the following guidelines when formulating your commit message: 

 - a message should be concise and descriptive. 
 - a message should describe what *kind* of change has been made, like this: 
 
    * **fix**: A bug fix [bug](https://github.com/dlr-eoc/ukis-frontend-libraries/labels/bug)
    * **feat**: A new feature [enhancement](https://github.com/dlr-eoc/ukis-frontend-libraries/labels/enhancement)
    * **refactor**: A code change that neither fixes a bug nor adds a feature [refactoring](https://github.com/dlr-eoc/ukis-frontend-libraries/labels/refactoring)
    * **docs**: Documentation only changes [documentation](https://github.com/dlr-eoc/ukis-frontend-libraries/labels/documentation)
    * **BREAKING CHANGE**: A code change that introduces a breaking API change [BREAKING CHANGE](https://github.com/dlr-eoc/ukis-frontend-libraries/labels/BREAKING%20CHANGE)


    * **test**: Adding missing tests or correcting existing tests
    * **perf**: A code change that improves performance
    * **build**: Changes that affect the build system or external dependencies
    * **ci**: Changes to our CI configuration files and scripts
    
 - a message should mention what modules/projects have been changed
 - a message should briefly mention the motivation for the change


 Further see these documents for commit messages:
- [Closing Issues Via Commit Messages](https://help.github.com/articles/closing-issues-via-commit-messages/)
- [Github: Closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords)


## <a name="changelogGuidelines"></a> Changelog guidelines

 - Document your changes at the very top of the file.
 - Categorize your changes as one of
   - Features
   - Bug Fixes
   - Other changes
 - For each change, add one item containing
   - The module/project changed (not required for 'other changes')
   - A short description of the change

Example: 

```
### Features
* **@dlr-eoc/map-tools:** SV: added projection switch. See mariss client for example.
### Bug Fixes
* **@dlr-eoc/map-ol:** SV: adjusted setProjection method. It creates a new View instance with keeping previously set settings with exception resolution-related parameters. They are calculated automatically by the OL. After applying new projection all existing layers are triggered to redraw their tiles
* **@dlr-eoc/map-ol:** SV: created getZoom method in the map-ol.service in order to get zoom value from actual olView instance. 

```


## <a name="cla"></a> Signing the CLA

Please sign our Contributor License Agreement (CLA) before sending pull requests. For any code
changes to be accepted, the CLA must be signed. It's a quick process, we promise! We'll need you to
  [print, sign and one of scan+email, fax or mail the form][cla].

<hr>

  If you have more than one Git identity, you must make sure that you sign the CLA using the primary email address associated with the ID that has been granted access to the UKIS repository. Git identities can be associated with more than one email address, and only one is primary. Here are some links to help you sort out multiple Git identities and email addresses:

  * https://help.github.com/articles/setting-your-commit-email-address-in-git/
  * https://stackoverflow.com/questions/37245303/what-does-usera-committed-with-userb-13-days-ago-on-github-mean
  * https://help.github.com/articles/about-commit-email-addresses/
  * https://help.github.com/articles/blocking-command-line-pushes-that-expose-your-personal-email-address/

  Note that if you have more than one Git identity, it is important to verify that you are logged in with the same ID with which you signed the CLA, before you commit changes. If not, your PR will fail the CLA check.

<hr>


[github]: https://github.com/dlr-eoc/
[cla]: https://github.com/dlr-eoc/frontend-libraries/DLR_Individual_Contributor_License_Agreement_UKIS.pdf
[coc]: https://github.com/dlr-eoc/frontend-libraries/CODE_OF_CONDUCT.md
[changelog]: https://github.com/dlr-eoc/frontend-libraries/CHANGELOG.md
[development]: https://github.com/dlr-eoc/frontend-libraries/DEVELOPMENT.md
