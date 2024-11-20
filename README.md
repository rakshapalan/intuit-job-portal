# Freelance/Employee Portal


## Introduction

### FreeLancer Section:
 * User Profile:
 * User should be able to select skills matching to his profile,Should be able to add his Git profile, and list his projects,Basic Form Validations
 * Job Listing Page:
 * Should be able to see all posted jobs,Should be able to filter by skill set/ min. salary per hour,Quick-Apply to a job with a single click.

### Employer section:
 - Allowing new jobs to be posted that:
 - Displays a form collecting the following data points:
 - Job description document with maximum length of 16KB,Job requirements,Tags relevant to the job,Company Name and contact info of the job poster,View his jobs posted.
 - Displays the number of applications on that job,Ability to see the user profile of the job applicant.


### `Presentation Deck`

View the presentation behind the implementation of this project: [presentation](https://docs.google.com/presentation/d/1Q9nQB__J8Ijdy8CHjEa0z6h1S4U0sZEhmdkx-btY76Y/edit#slide=id.g314b90c602b_0_452)


### `Technologies Used`

- React JS
- Javascript
- Create React App scaffolding
- Bootstrap
- React Router Dom
- State Management ->  React Context API +React Redux
- React Toastify
- Axios
- Github
- https://mockaroo.com To create mock API
- React Testing Library


### `Performance Improvements`
Pagination:
 - Reduces rendering time by limiting the data shown per page.Improves initial page load speed by fetching smaller chunks of data.

Debouncing:
 - Prevents excessive function calls (e.g., API calls, computations).Delays function execution until user stops input or interaction.
 - Memoization (useCallback,useMemo): 
 - Prevents unnecessary re-creations of functions and expensive operations,prevents the execution of function multiple times.Reduces rendering time by memoizing callback functions and 
 - memoizing the result of functions, improving component performance.

React.lazy:
- React.lazy allows you to dynamically import a component only when it’s required. This is useful for code splitting. When you call lazy(), React will load the component only when the -- route is visited, instead of loading everything upfront.
- React Memo,React fragments

Reusable components(Button,Form,Spinner,Header,Subheader,Usertable,NotFound,Something went wrong,No search results)

- Reusable Hooks(useForm,usePagination)
- Reusable Functions(formValidation,apiHelper,loginValidation,localstorage actions)

- ErrorBoundary(To capture error and displays Something went wrong)

- NotFound(404 When user tries to hit the wrong route)

### Run Application
- Clone the repository
- Run npm install to install required dependencies
- Finally, run npm start to run the application and open the browser to view the site on localhost.
- Use Node JS version 20.17.0 to run the application on local





