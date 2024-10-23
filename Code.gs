var APPSEC_SHEET_ID = "1YTTK-2125vOn7FgBjFh8T1KaLKbqkh1YKOfYEOS421k";

function main() {
  // create a AppSec Evaluation Questionaire form
  // Steps to setup before running
  // 1. Create the blank form and response sheet
  // 2. Get the form Id and sheet ids and update the createForm.gs file with Ids.
  // 3. The variables to update are APPSEC_FORM_ID and APPSEC_SHEET_ID.
  // createGoogleForm();


  // aggregate results
  aggregateResponses(APPSEC_SHEET_ID);
}
