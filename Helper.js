function extractNumber(str) {
    Logger.log(str)
    var match = str.match(/^(\d+)\./);
    
    if (match) {
      var number = match[1]; // The captured number
      Logger.log(number)
      return number;
    } else {
      return "";
    }
  }
  
  function calculateLikartScore(toolResults) {
    if (toolResults.totalResponses) {
      return toolResults.totalScore / toolResults.totalResponses;
    }
    return 0;
  }