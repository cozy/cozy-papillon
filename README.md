<img height="32" src="https://github.com/user-attachments/assets/8275813a-9311-4ac4-9328-8513d0f22c03" />

Cozy Papillon is a minified [Papillon] client that displays school related data (timetables, grades, homeworks, and attendance) extracted from service such as Pronote or EcoleDirecte using their konnectors.


## Hack

_:pushpin: Note:_ we recommend to use [Yarn] instead of NPM for package management. Don't hesitate to [install][yarn-install] and use it for your Cozy projects, it's now our main node packages tool for Cozy official apps.

### Install

Hacking the Cozy Papillon app requires you to [setup a dev environment][setup].

You can then clone the app repository and install dependencies:

```sh
$ git clone https://github.com/cozy/cozy-papillon-app.git
$ cd cozy-papillon-app
$ yarn install
```

:pushpin: If you use a node environment wrapper like [nvm] or [ndenv], don't forget to set your local node version before doing a `yarn install`.

Cozy's apps use a standard set of _npm scripts_ to run common tasks, like watch, lint, test, build…


### Run it inside a Cozy using Docker

You can run your application inside a Cozy thanks to the [cozy-stack docker image][cozy-stack-docker]:

```sh
# in a terminal, run your app in watch mode with a docker running Cozy
$ cd cozy-papillon-app
$ yarn start
```

```sh
# in an other terminal, run the docker image
$ cd cozy-papillon-app
$ yarn stack:docker:dev
```

After the build and the docker image launched, your app is now available at http://papillon.cozy.tools:8080.

Note: By default, HMR (Hot Module Replacement) is enabled on your front application. To have it working, we have disabled our CSP (Content Security Policy) when running `yarn stack:docker:dev`. This is not the configuration we'll have in a production environnement. To test our app in real conditions, build your application by running `yarn build` and launch the docker image with the `yarn stack:docker:prod` command.

### Living on the edge

[Cozy-ui] is our frontend stack library that provides common styles and components accross the whole Cozy's apps. You can use it for you own application to follow the official Cozy's guidelines and styles. If you need to develop / hack cozy-ui, it's sometimes more useful to develop on it through another app. You can do it by cloning cozy-ui locally and link it to yarn local index:

```sh
git clone https://github.com/cozy/cozy-ui.git
cd cozy-ui
yarn install
yarn link
```

then go back to your app project and replace the distributed cozy-ui module with the linked one:

```sh
cd cozy-drive
yarn link cozy-ui
```

[Cozy-client-js] is our API library that provides an unified API on top of the cozy-stack. If you need to develop / hack cozy-client-js in parallel of your application, you can use the same trick that we used with [cozy-ui]: yarn linking.


### Tests

Tests are run by [jest] under the hood. You can easily run the tests suite with:

```sh
$ cd cozy-papillon-app
$ yarn test
```

:pushpin: Don't forget to update / create new tests when you contribute to code to keep the app the consistent.


## Models

The Cozy datastore stores documents, which can be seen as JSON objects. A `doctype` is simply a declaration of the fields in a given JSON object, to store similar objects in an homogeneous fashion.

Cozy ships a [built-in list of `doctypes`][doctypes] for representation of most of the common documents (Bills, Contacts, Files, ...).

Whenever your app needs to use a given `doctype`, you should:

- Check if this is a standard `doctype` defined in Cozy itself. If this is the case, you should add a model declaration in your app containing at least the fields listed in the [main fields list for this `doctype`][doctypes]. Note that you can extend the Cozy-provided `doctype` with your own customs fields. This is typically what is done in [Konnectors] for the [Bill `doctype`][bill-doctype].
- If no standards `doctypes` fit your needs, you should define your own `doctype` in your app. In this case, you do not have to put any field you want in your model, but you should crosscheck other cozy apps to try to homogeneize the names of your fields, so that your `doctype` data could be reused by other apps. This is typically the case for the [Konnector `doctype`][konnector-doctype] in [Konnectors].


### Open a Pull-Request

If you want to work on Cozy Papillon and submit code modifications, feel free to open pull-requests! See the [contributing guide][contribute] for more information about how to properly open pull-requests.


## Community

### What's Cozy?

<div align="center">
  <a href="https://cozy.io">
    <img src="https://cdn.rawgit.com/cozy/cozy-site/master/src/images/cozy-logo-name-horizontal-blue.svg" alt="cozy" height="48" />
  </a>
 </div>
 </br>

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.

### Localization

Localization and translations are handled by [Transifex][tx], which is used by all Cozy's apps.

As a _translator_, you can login to [Transifex][tx-signin] (using your Github account) and claim an access to the [app repository][tx-app]. Transifex will then create pull request on the repository, and the locales are merged after validating the pull request.

As a _developer_, you have to modify json in `/src/locales`. New locales will be automatically added to Transifex. If you need to pull or push manually locales, you can use [Transifex CLI](tx-cli). If you were using a [transifex-client](tx-client), you must move to [Transifex CLI](tx-cli) to be compatible with the v3 API.

### Maintainer

The lead maintainer for Cozy Papillon is [cozy](https://github.com/cozy), send him/her a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC `#cozycloud` on [Libera.Chat][libera]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


## License

Cozy Papillon is developed by cozy and distributed under the [AGPL v3 license][agpl-3.0].


[papillon]: https://getpapillon.xyz/ "Papillon"
[cozy]: https://cozy.io "Cozy Cloud"
[setup]: https://dev.cozy.io/#set-up-the-development-environment "Cozy dev docs: Set up the Development Environment"
[yarn]: https://yarnpkg.com/
[yarn-install]: https://yarnpkg.com/en/docs/install
[cozy-ui]: https://github.com/cozy/cozy-ui
[cozy-client-js]: https://github.com/cozy/cozy-client-js/
[cozy-stack-docker]: https://github.com/cozy/cozy-stack/blob/master/docs/client-app-dev.md#with-docker
[doctypes]: https://cozy.github.io/cozy-doctypes/
[bill-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/bill.js
[konnector-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/base_model.js
[konnectors]: https://github.com/cozy/cozy-konnector-libs
[agpl-3.0]: https://www.gnu.org/licenses/agpl-3.0.html
[contribute]: CONTRIBUTING.md
[tx]: https://www.transifex.com/cozy/
[tx-signin]: https://www.transifex.com/signin/
[tx-app]: https://www.transifex.com/cozy/<SLUG_TX>/dashboard/
[tx-cli]: https://developers.transifex.com/docs/cli
[tx-client]: https://github.com/transifex/transifex-client
[libera]: https://web.libera.chat/#cozycloud
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
[nvm]: https://github.com/creationix/nvm
[ndenv]: https://github.com/riywo/ndenv
[jest]: https://facebook.github.io/jest/
