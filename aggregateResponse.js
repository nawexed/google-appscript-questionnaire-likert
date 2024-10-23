// Aggregate responses and return the results
function aggregateResponses(spreadSheetId) {
    var spreadSheet = SpreadsheetApp.openById(spreadSheetId);
     if(!spreadSheet) {
      return;
    }
  
    //Get form response tab(sheet) and results tab(sheet)
    var formResponseSheetName= getFormResponseSheetName(spreadSheet);
    if(!formResponseSheetName) {
      return;
    }
    var formResponses = spreadSheet.getSheetByName(formResponseSheetName);
    var aggregationSheet = spreadSheet.getSheetByName("Results");
    if( !aggregationSheet ) {
      aggregationSheet = spreadSheet.insertSheet("Results");
    } else {
      // Clear previous aggregated data
      aggregationSheet.clear();
    }
  
    // Get the questionTexts from the first row of the form response sheet
    var questionTexts = formResponses.getRange(1, 2, 1, formResponses.getLastColumn()-1).getValues()[0];
    
  
    // Get the array where the tools names are selected by the uses. It will be used to filter the results
    // by tool for each question.
    var toolsColIndex = 2
    var toolsFilter = formResponses.getRange(2, toolsColIndex + 2, formResponses.getLastRow()-1, 1).getValues().flat(); 
  
    // Prepare the result to send back to the HTML
    var results = [];
    
    // Write the questions to the aggregation sheet
    for (var i = 0; i < questionTexts.length; i++) {
      var question = appSecToolsEvalQuestions[i];
      initializeQuestionForResults(question);
  
      //aggregationSheet.getRange(i+1, 1).setValue(question.text);
  
      // aggregate responses
      var range = formResponses.getRange(2, i+2, formResponses.getLastRow()-1, 1); // Get responses for each question
      var responses = range.getValues().flat();
      var responseCount = responses.filter(function(response) { return response !== ""; }).length; // Count non-empty responses
      question.responseCount = responseCount;
    
      
      // likart Scale aggregation
      if(question.type === 'radio') {
        for (var r = 0; r < responses.length; r++) {
          var response = responses[r];
          var tool = toolsFilter[r];
          if(response in question[tool]) {
            question[tool][response] ++;
            if(response in likertScale) {
              question[tool].totalScore += likertScale[response];
              question[tool].totalResponses++;
            }
          }
        }
      }
  
      // aggregate text
      else if(question.type === 'paragraph') {
        for (var r = 0; r < responses.length; r++) {
          var response = responses[r];
          var tool = toolsFilter[r];
          if(response.length>0){
            question[tool] = question[tool] + " | " + response;
          }
        }
      }
    
    }
    
    // create results sheet
    createResultSheet(aggregationSheet)
    
    return results;
  }
  
  // create ResultsSheet
  function createResultSheet( aggregationSheet) {
    // add header
    aggregationSheet.setFrozenRows(1); 
    aggregationSheet.getRange(1, 1).setValue("Area");
    aggregationSheet.getRange(1, 2).setValue("Question");
    aggregationSheet.getRange(1, 3).setValue("GHAS");
    aggregationSheet.getRange(1, 4).setValue("Snyk");
    aggregationSheet.getRange(1, 5).setValue("Mend");
    
    // add questions and results
    var row =0;
     for (var q = 0; q < appSecToolsEvalQuestions.length; q++) {
      var question = appSecToolsEvalQuestions[q];
  
      if(question.type === 'radio') {
        // write domain and question text   
        aggregationSheet.getRange(row+2, 1).setValue(question.domain);
        aggregationSheet.getRange(row+2, 2).setValue(question.text);
  
        // average scores
        aggregationSheet.getRange(row+2, 3).setValue( calculateLikartScore(question.GHAS));
        aggregationSheet.getRange(row+2, 4).setValue( calculateLikartScore(question.Snyk));
        aggregationSheet.getRange(row+2, 5).setValue( calculateLikartScore(question.Mend));
        row++;
  
      } else  if(question.type === 'paragraph') {
        // write domain and question text   
        aggregationSheet.getRange(row+2, 1).setValue(question.domain);
        aggregationSheet.getRange(row+2, 2).setValue(question.text);
  
        // average scores
        aggregationSheet.getRange(row+2, 3).setValue( calculateLikartScore(question.GHAS));
        aggregationSheet.getRange(row+2, 4).setValue( calculateLikartScore(question.Snyk));
        aggregationSheet.getRange(row+2, 5).setValue( calculateLikartScore(question.Mend));
        row++;
      }
    }
  }
  
  
  // Get the sheet linked with a form
  function getFormResponseSheetName(spreadsheet) {
   
   // Get all sheets in the spreadsheet
    var sheets = spreadsheet.getSheets();
    
    // Loop through the sheets to find the one with 'Form Responses'
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      // Checking if the sheet name contains 'Form Responses'
      if (sheet.getSheetName().indexOf('Form Responses') !== -1) {
        Logger.log('The form responses are stored in the tab: ' + sheet.getSheetName());
        return sheet.getSheetName();
      }
    }
    
    Logger.log('No form response sheet found.');
    return null;
  }
  
  function initializeQuestionForResults(question){
      //Logger.log("question:" + question.text);
      if(question.type === 'radio') {
        if(!question.Mend) question.Mend = { NOT_APPLICABLE :0, '1':0, '2':0, '3':0, '4':0, '5':0 , totalScore: 0, totalResponses: 0 };
        if(!question.Snyk) question.Snyk = { NOT_APPLICABLE :0, '1':0, '2':0, '3':0, '4':0, '5':0 , totalScore: 0, totalResponses: 0 };
        if(!question.GHAS) question.GHAS = { NOT_APPLICABLE :0, '1':0, '2':0, '3':0, '4':0, '5':0 , totalScore: 0, totalResponses: 0 };
      }
      else if(question.type === 'paragraph') {
        if(!question.Mend) question.Mend = "";
        if(!question.Snyk) question.Snyk = "";
        if(!question.GHAS) question.GHAS = "";
      }
  }
   