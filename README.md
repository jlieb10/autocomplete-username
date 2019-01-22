# [Work in Progress] Comment component featuring autocompleting username using `@` (like on Github)

## TBDone/TBDebugged
### Functionality:
- Add `onClick` functionality to usercards so the text is updated in the comment box
- Add complexity to search feature such that multiple users could be tagged
- ~~Debug search feature, it is currently searching one letter less than has been typed~~
- ~~Consolidate `onChange` and `onKeyUp` event listeners on `<CommentBox />` (probably related to above)~~

### Aesthetics:
- Add styles for below 720px (current max width)
- Figure out best position of `<UsersList />` when triggered

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.