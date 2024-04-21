# opinary-poll

## Technologies used
- React JS as the frontend library.
- Vite as the bundler.
- pnpm(local) as the package manager
- Tailwind CSS for styling
- Playwright for e2e testing


## Steps to run the project

# Running the app
- Clone the github repo and run `npm install` or the relevant install command based on the bundler you're using(yarn or pnpm).
- After installation, you can directly run the `npm dev` command to run the application. It'll open up a fresh instance of a poll with a set of questions.

# Running the test suite
- Simply typing the command `npm playwright test` will run the e2e tests present inside the `/tests` folder.
- Make sure to keep the app running on localhost:5173, for the tests to work. If you're running the app on a different port, change the first lines of each e2e test to the respective port.


## App functionality

# Features
- One can vote simultaneously across different questions and on submitting the vote, it should refactor the total votes and split the count between the options.
- Reloading the app persists the data. It's saved inside the `localstorage`. Clearing the `localstorage` resets the poll.

# Adding the react widget to `html` pages
Side note: Example HTML files that follow all the below instructions are created inside the `testhtml` folder for you to follow.

- You'll first need to run the `npm build` command to build the production assets for the Poll component.
- The assets will be saved inside the dist folder.
- Create an HTML file and copy the react cdn links and the babel cdn link inside the head tag.
- After that, you can copy your built assets in the same head tag.
- Inside the body tag, create a div tag with an id of 'poll'.
- Add a data attribute called `data-poll-json` and copy the `json` data for the questions(similar to what's there inside the example HTML files).
- Now running that html file using any extension(live server for VSCode) should give you the expected poll.
- You can use the same setup across multiple `html` files to render different variants of the poll component.

## Choices made and potential improvements
- Stack:
  - React was an easy choice as it's much easier to use a declarative approach in building out a component as opposed to an imperative approach.
  - Tailwind CSS has a robust set of `css` stylesets in the form of classes that makes it much easier to style DOM elements.
  - I normally prefer e2e tests to test more real-life scenarios and use cases as opposed to flaky, and sometimes redundant unit tests which is why I went with Playwright.
- I skipped the case where you restrict someone from having the same poll on the page multiple times. Since the poll data is being passed from the client, the user has full control on what can and cannot be displayed on a page. So it did not make sense for me to add an extra, redundant check.
-    
- Improvements
  - The way data is being passed could be more cleaner. I could've used js to handle attributes but it effectively does the same thing.
  - The app could've been structure better and could've had more modularity.
  - Styling always can be improved with more UI/UX-friendly feedback. 
