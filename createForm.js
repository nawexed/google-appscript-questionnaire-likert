var APPSEC_FORM_ID = "1kcDOJa_8kIgzgcnBVyLnKNCeQyGOqCTTAKdOsRqzvAA";
var APPSEC_SHEET_ID = "1YTTK-2125vOn7FgBjFh8T1KaLKbqkh1YKOfYEOS421k";

var formDescription = `Thank you for participating in this AppSec tool evaluation. Your feedback is critical in helping us select the best tool for our development teams. Please carefully read and follow these instructions when answering the questions.\n

For questions that are graded on a scale of 1 to 5, please use the following guide:

1 = Strongly Disagree or Very Unsatisfied
2 = Disagree or Unsatisfied
3 = Neutral or Satisfactory
4 = Agree or Satisfied
5 = Strongly Agree or Very Satisfied

Please base your rating on your actual experience with the tool, considering factors like usability, integration, and performance.`;

// Questions
var columns = [NOT_APPLICABLE, '1', '2', '3', '4', '5'];

function createGoogleForm() {
  // Create a new Google Form
  //var form = FormApp.create('Developer Feedback on AppSec Tools');
   var form = FormApp.openById(APPSEC_FORM_ID);
  InitializeForm(form);

  form.setDescription(formDescription);

  // Section Header
  // Add a Section Header for the General Information section
  var section = form.addSectionHeaderItem()
    .setTitle('General Information')
    .setHelpText('Please provide some general information about the tools you are evaluating.');

  // Questions
  var questionList = appSecToolsEvalQuestions;
  var serialNumber = 0;
  questionList.forEach(question => {
    // question statement
    serialNumber++;
    var questionTitle = serialNumber + ". " + question.text;
    // Logger.log(questionTitle);

    // question should have text
    if (question.text.trim().length == 0)
      return;

    if (question.type === 'radio') {
      var item = form.addGridItem();
      item.setRequired(question.required ?? false);
      item.setTitle(questionTitle)
        .setRows(['⠀'])
        .setColumns(columns);
    }
    else if (question.type === 'paragraph') {
      var item = form.addParagraphTextItem();
      item.setTitle(questionTitle);
      item.setRequired(question.required ?? false);
    }
    else if (question.type === 'multiplechoice') {
      var item = form.addMultipleChoiceItem();
      item.setTitle(questionTitle);
      item.setRequired(question.required ?? false);
      var choiceList = [];
      question.choices.forEach(choice => {
        choiceList.push(item.createChoice(choice));
      });
      item.setChoices(choiceList);
    }
    else {
      var item = form.addTextItem();
      item.setTitle(questionTitle);
      item.setRequired(question.required ?? false);
    }
  });

  // Assocaite Google Sheet for response
  AssocaiteFormToSheet(form);

  // Log the form URL so you can access it
  Logger.log('Form URL: ' + form.getEditUrl());
}

//
// Initialize Form
//
function InitializeForm(form)
{
  // Clear Form
  Logger.log("Clearing Form to start anew.....");
  var items = form.getItems();

  for (var i = 0; i < items.length; i++) {
    form.deleteItem(items[i]);
  }
  Logger.log("Form Item Cleared!");
}

//
// Associate Form to Response Sheet
//
function AssocaiteFormToSheet(form)
{
  // Assocaite Google Sheet for response
  Logger.log("Associating form to sheet.....");
  var sheet = SpreadsheetApp.openById(APPSEC_SHEET_ID);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  Logger.log("Form responses are now linked to the Google Sheet.");

}
 