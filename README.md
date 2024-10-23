# Google AppScript Questionnaire 
This AppScript has two main functions, Create a questionnaire using data from the `questions.js` file. The script reads the questions data in the json format and creates the Google Form. 

The second function is to aggregate the response data captured in the response sheet into another sheet with average scores calculated based on **Likert** scale.

> Note that the extension google uses is `*.gs` rather than `*.js`, so make sure, when you upload these file to Google Apps, the extensions should be changed to `*.gs`.

## Files
### Code.js 
This file contains the main() method. It has two functions. The `createGoogleForm()` function is used to create the form, and the `aggregateReponses()` function is used to create the result sheet.

```js
function main() {
  // createGoogleForm();
  aggregateResponses(APPSEC_SHEET_ID);
}
```
Usually, once the form is created, I would comment out the `createGoogleForm()` function and run the response function. 

>The first function is clears out the form and associated responses from Response sheet, so it is **destructive**

### questions.js
This file is, basically, a data file, contains the data about domains, and questions for each domain area. The questions are in a json array, with each question containing the text, type of the form control and whether it is required or not. 
```js
// Questions
var appSecToolsEvalQuestions = [
  {
    "text": "Please Enter your name.",
    "type": "text",
    "required": true,
    "domain": domains[0],
  },
  ....
];
```

### createForm.js
This file contains the function  `createGoogleForm()` which reads the json data from the above file and creates the form. Make sure the form exists. which need to be created manually and the Form Id is specified in this file as `APPSEC_FORM_ID`.

Also, make sure to create a Google Sheet to capture the response, and specify the SpreadSheet id as `APPSEC_SHEET_ID`.

### aggregateResponse.js
This file contains the function`aggregateReponses()`, which reads the response from the `Form Response *` sheet and create a `Results` to dump the Likert Scale averages for each question. 

> The file has function to determine the sheet name associated with Form responses. 

