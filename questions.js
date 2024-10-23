var NOT_APPLICABLE='N/A'

// Define the Likert scale values and labels
  var likertScale = {
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "1": 1
  };

// Domains
var domains = [
  "0.General Information",
  "1.Onboard Your Repository",
  "2.License Compliance (Enforce)",
  "3.False Positive Management (Request Dismiss)",
  "4. Workflow Integration (IDE)",
  "5. Workflow Integration (Pull Request):",
  "6. Workflow Integration (Backlog):",
  "7. Performance (Impact on Total Pipeline Execution Time):",
  "8. Performance and Scalability (Handle Large Multi-Language Mono-Repo):",
  "9. Audit the Scan of Your Repositories:",
  "10. Remediation Guidance (AI / Autofix / Time to Remediation):",
  "11. Jira Integration (Issue Tracking):",
  "12. Additional Feature Callout:",
  "13. Additional Comments:",

]
// Questions
var appSecToolsEvalQuestions = [
  {
    "text": "Please Enter your name.",
    "type": "text",
    "required": true,
    "domain": domains[0],
  },
  {
    "text": "Please Enter your email.",
    "type": "text",
    "required": true,
    "domain": domains[0],
  },
  {
    "text": "Please select the tool you are providing feedback about.",
    "type": "multiplechoice",
    "choices": ["Mend", "Snyk", "GitHub Advanced Security"],
    "required": true,
    "domain": domains[0],
  },
  {
    "text": "How difficult was it to get started with onboarding your repository?",
    "type": "radio",
    "domain": domains[1],
  },
  {
    "text": "On average, how quickly were you able to onboard repositories?",
    "type": "radio",
    "domain": domains[1],
  },
  {
    "text": "Were there any repositories that were particularly difficult to onboard? If so, please describe the challenges.",
    "type": "radio",
    "domain": domains[1],
  },
  {
    "text": "How well did the tool document the onboarding process for new repositories?",
    "type": "radio",
    "domain": domains[1],
  },
  {
    "text": "Were there any specific language or framework limitations during onboarding?",
    "type": "radio",
    "domain": domains[1],
  },
  {
    "text": "Did the tool require any manual configuration changes to onboard certain repositories?",
    "type": "radio",
    "domain": domains[1],
  },
  //----------------2. License Compliance (Enforce)--------------------------------
  {
    "text": "How easy was it to generate a report of the current status?",
    "type": "radio",
    "domain": domains[2],
  },
  {
    "text": "How easy was it to generate a report of trends?",
    "type": "radio",
    "domain": domains[2],
  },
  {
    "text": "How easy was it to generate these reports for Teams, Projects, and Repositories?",
    "type": "radio",
    "domain": domains[2],
  },
  {
    "text": "Were you able to configure license policies specific to your team’s needs?",
    "type": "radio",
    "domain": domains[2],
  },
  {
    "text": "How easy was it to automate license checks as part of your pipeline?",
    "type": "radio",
    "domain": domains[2],
  },
  {
    "text": "Were there any false positives or errors in license detection, and how easy was it to resolve them?",
    "type": "radio",
    "domain": domains[2],
  },
  //----------------3. False Positive Management (Request Dismiss):--------------------------------
  {
    "text": "How easy was it to dismiss an issue in your repository?",
    "type": "radio",
    "domain": domains[3],
  },
  {
    "text": "How easy was it to audit issues that have been dismissed?",
    "type": "radio",
    "domain": domains[3],
  },
  {
    "text": "How easy was it to re-open a dismissed issue?",
    "type": "radio",
    "domain": domains[3],
  },
  {
    "text": "Was there an option to provide reasoning or comments when dismissing issues, and how helpful was that?",
    "type": "radio",
    "domain": domains[3],
  },
  //----------------4. Workflow Integration (IDE):--------------------------------
  {
    "text": "If there exists an IDE plugin for the IDE of your choice, how hard was it to set up?",
    "type": "radio",
    "domain": domains[4],
  },
  {
    "text": "How was the experience of using the IDE plugin?",
    "type": "radio",
    "domain": domains[4],
  },
  {
    "text": "How well did the IDE plugin integrate with your current coding workflow?",
    "type": "radio",
    "domain": domains[4],
  },
  {
    "text": "Were the security issues flagged in the IDE accurate and actionable?",
    "type": "radio",
    "domain": domains[4],
  },
  //----------------5. Workflow Integration (Pull Request):--------------------------------
  {
    "text": "How was the experience of seeing a security issue in a pull request?",
    "type": "radio",
    "domain": domains[5],
  },
  {
    "text": "Was there any Autofix available for the issue?",
    "type": "radio",
    "domain": domains[5],
  },
  {
    "text": "How easy was it to fix the issue once it was identified?",
    "type": "radio",
    "domain": domains[5],
  },
  {
    "text": "Was there any integration with code review systems, and how helpful was it?",
    "type": "radio",
    "domain": domains[5],
  },
  //----------------6. Workflow Integration (Backlog)::--------------------------------
  {
    "text": "How hard was it to identify and fix an issue that was identified within your main branch?",
    "type": "radio",
    "domain": domains[6],
  },
  {
    "text": "Did the tool provide automated updates or reminders for unaddressed security issues in the backlog?",
    "type": "radio",
    "domain": domains[6],
  },
  //----------------7. Performance (Impact on Total Pipeline Execution Time):--------------------------------
  {
    "text": "Did the tooling scan specifically slow you down?",
    "type": "radio",
    "domain": domains[7],
  },
  {
    "text": "Did it add a significant amount of time to the build pipeline?",
    "type": "radio",
    "domain": domains[7],
  },
  {
    "text": "How well did the tool perform with incremental scans versus full scans?",
    "type": "radio",
    "domain": domains[7],
  },
  //----------------8. Performance and Scalability (Handle Large Multi-Language Mono-Repo):--------------------------------
  {
    "text": "If you have a large repository or Mono-Repo, how was the interaction with the tooling?",
    "type": "radio",
    "domain": domains[8],
  },
  {
    "text": "How well did the tool handle scanning multiple languages simultaneously within your monorepo?",
    "type": "radio",
    "domain": domains[8],
  },
  {
    "text": "How easy was it to configure language-specific rules or policies in large repositories?",
    "type": "radio",
    "domain": domains[8],
  },
  //----------------9. Audit the Scan of Your Repositories:--------------------------------
  {
    "text": "How would you rate the health of the scan?",
    "type": "radio",
    "domain": domains[9],
  },
  {
    "text": "Did the scanner scan all the files in the repository?",
    "type": "radio",
    "domain": domains[9],
  },
  {
    "text": "Did the scanner run into any issues and still pass the check?",
    "type": "radio",
    "domain": domains[9],
  },
  {
    "text": "How easy was it to trace security issues back to specific code changes or commits?",
    "type": "radio",
    "domain": domains[9],
  },
  {
    "text": "How reliable was the tool in detecting issues in non-standard or complex code structures?",
    "type": "radio",
    "domain": domains[9],
  },
  //----------------10. Remediation Guidance (AI / Autofix / Time to Remediation):--------------------------------
  {
    "text": "Beyond identifying the issues, did the tool provide specific guidance on how to fix the issue?",
    "type": "radio",
    "domain": domains[10],
  },
  {
    "text": "How customizable were the AI-driven suggestions or autofixes?",
    "type": "radio",
    "domain": domains[10],
  },
  {
    "text": "Were there any limitations to the automated remediation process?",
    "type": "radio",
    "domain": domains[10],
  },
  //----------------11. Jira Integration (Issue Tracking):--------------------------------
  {
    "text": "How important is JIRA integration to the team?",
    "type": "radio",
    "domain": domains[11],
  },
  //----------------12. Additional Feature Callout:--------------------------------
  {
    "text": "Identify any specific feature beyond the evaluation that you found particularly useful.",
    "type": "paragraph",
    "domain": domains[12],

  },
  {
    "text": "How would you compare this tool to other AppSec solutions you’ve used in terms of ease of use?",
    "type": "radio",
    "domain": domains[12],

  },
  {
    "text": "What was the most challenging aspect of using the tool, and how did you overcome it?",
    "type": "paragraph",
    "domain": domains[12],

  },
  {
    "text": "Did the tool align with your team’s security goals and development practices?",
    "type": "radio",
    "domain": domains[12],

  },
  {
    "text": "Would you recommend this tool to other developers or teams?",
    "type": "radio",
    "domain": domains[12],

  },
  {
    "text": "Describe why you would, or would not, recommend this tool to other developers or teams?",
    "type": "paragraph",
    "domain": domains[12],

  },

  //----------------13. Additional Comments--------------------------------
  {
    "text": "How was the overall experience?",
    "type": "paragraph",
    "domain": domains[13],
  },
  {
    "text": "Did you have any issues?",
    "type": "paragraph",
    "domain": domains[13],
  },
  {
    "text": "Did you feel it really helped with your productivity?",
    "type": "paragraph",
    "domain": domains[13],
  }
]