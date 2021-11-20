

Survey
.StylesManager
.applyTheme("darkblue");

Survey
.Serializer
.addProperty("question", "popupdescription:text");
Survey
.Serializer
.addProperty("page", "popupdescription:text");
function showDescription(element) {
document
    .getElementById("questionDescriptionText")
    .innerHTML = element.popupdescription;
$("#questionDescriptionPopup").modal();
}

var json = {
"completedHtml": "<h3>Thank you for checking the eligibilty.</h3>",
"completedHtmlOnCondition": [
    {
        "expression": "{convicted} = false and {defered_adjudication} = true and {sex_offense} = false and {family_violence} = false and {waited_time} = true",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    }, {
        "expression": "{convicted} = true or {defered_adjudication} = false or {sex_offense} = true or {family_violence} = true and {waited_time} = true",
        "html": "<h3>You are not Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    }
],
pages: [
    {
     name: "page1",
     elements: [
      {
       type: "boolean",
       name: "convicted",
       title: "Were you convicted of the offense?",
       isRequired: true
      },
      {
       type: "boolean",
       name: "defered_adjudication",
       title: "Have you been placed on or completed the deferred adjudication?",
       isRequired: true
      },
      {
       type: "boolean",
       name: "sex_offense",
       title: "Have you ever been convicted of a sex offense?",
       isRequired: true
      },
      {
       type: "boolean",
       name: "family_violence",
       title: "Have you been ever convicted of any family violence?",
       isRequired: true
      },
      {
       type: "boolean",
       name: "waited_time",
       title: "Have you waited for a certain period of time after the court’s order of dismissal and discharge to seek an order of nondisclosure?",
       isRequired: true
      }
     ]
    }
   ],
"showQuestionNumbers": "off",
"title": "Connecticut Absolute Pardon Eligibility Checker"
};

window.survey = new Survey.Model(json);

survey
.onComplete
.add(function (result) {
    document
        .querySelector('#surveyResult')
        .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
});

survey
.onAfterRenderQuestion
.add(function (survey, options) {
    //Return if there is no description to show in popup
    if (!options.question.popupdescription) 
        return;
    
    //Add a button;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-info btn-xs";
    btn.innerHTML = "More Info";
    var question = options.question;
    btn.onclick = function () {
        showDescription(question);
    }
    var header = options
        .htmlElement
        .querySelector("h5");
    if (!header) 
        header = options.htmlElement;
    var span = document.createElement("span");
    span.innerHTML = "  ";
    header.appendChild(span);
    header.appendChild(btn);
});

survey
.onAfterRenderPage
.add(function (survey, options) {
    //Return if there is no description to show in popup
    if (!options.page.popupdescription) 
        return;
    
    //Add a button;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-info btn-xs";
    btn.innerHTML = "More Info";
    btn.onclick = function () {
        showDescription(survey.currentPage);
    }
    var header = options
        .htmlElement
        .querySelector("h4");
    var span = document.createElement("span");
    span.innerHTML = "  ";
    header.appendChild(span);
    header.appendChild(btn);
});
$("#surveyElement").Survey({model: survey});