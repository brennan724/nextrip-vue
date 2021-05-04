# nextrip-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Runs tests
```
yarn test:unit
```

## Technologies Used
* VueJS
* Axios
* [Vuetify](https://vuetifyjs.com/en/) - design framework for Vue
* [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro) - unit testing framework around vue test-utils that allows for more user-view testing
* [Mock Service Worker](https://mswjs.io/) - mocking API calls for testing

## Assumptions
* The API is always available -- error handling (displaying error messages) exists if the API becomes unavailable partway through using the app
* No Internet Explorer
* Non-constant high load on the application -- metro transit may restrict the application if it makes too many API calls too frequently
* Decent network connection -- tested on slow 3G and it works as expected, but it's painfully slow.

## Notes
* Works on mobile (if deployed to a place where a mobile browser can access it)
* Testing only currently tests happy paths
* Vue-material branch uses vue-material, but vue-material has a [bug](https://github.com/vuematerial/vue-material/issues/2285) which makes testing difficult.  Therefore, I switched to using Vuetify partway through the project.