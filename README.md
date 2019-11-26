# BuyIt

Progressive Web App Shopping Experience built with Angular 8, Typescript and Tailwind CSS.

Hosted on NOW, finde it [here](https://buyit.now.sh)

**Features:**
* List of products with pictures, prices and images
* Limited stock system
* Cart management
* Checkout
* Authentication (Frontend only)
* Order confirmation
* All calls that might go to an API are already built upon Observables, so minimal changes are necessary for using a backend

**What could be improved**

The Tailwind CSS styles are currently not purged, so the style.scss file is veery large. This is probably the only thing holding this back from getting a perfect score on the Lighthouse Audit with Simulated Slow 4G. (It does get a perfect score without slowdown)

<img src="https://i.imgur.com/U6lS8qt.png" width="50%" height="50%">

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
