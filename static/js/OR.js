

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
"completedHtml": "<h3>You are not Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>",
"completedHtmlOnCondition": [
    {
        "expression": "{record_type} = 'arrest' and {charge_dismissed} = true",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    },
    {
        "expression": "{record_type} = 'arrest' and {charge_dismissed} = false and {arrest_time} = true",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    },
    {
        "expression": "{record_type} = 'conviction' and {classb} = true and {classb_years} = false",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    },
    {
        "expression": "{record_type} = 'conviction' and {classc} = true and {classc_years} = false",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    },
    {
        "expression": "{record_type} = 'conviction' and {drug} = true and {drug_time} = true",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    },
   
],
pages: [
    {
     name: "page1",
     elements: [
      {
       type: "radiogroup",
       name: "record_type",
       title: "Which one of the following would you like to get expunged?",
       choices: [
        {
         value: "arrest",
         text: "Arrest"
        },
        {
         value: "conviction",
         text: "Conviction"
        }
       ]
      },
      {
       type: "boolean",
       name: "charge_dismissed",
       visibleIf: "{record_type} = 'arrest'",
       title: "Has the charge been dismissed?"
      },
      {
       type: "boolean",
       name: "arrest_time",
       visibleIf: "{record_type} = 'arrest' and {charge_dismissed} = false",
       title: "Has it been at least 60 days from the date of the arrest?"
      },
      {
       type: "boolean",
       name: "classb",
       visibleIf: "{record_type} = 'conviction'",
       title: "Was your conviction offense a Class B felony?"
      },
      {
       type: "boolean",
       name: "classc",
       visibleIf: "{record_type} = 'conviction' and {classb} = false",
       title: "Was your conviction offense a Class C felony?"
      },
      {
       type: "boolean",
       name: "drug",
       visibleIf: "{record_type} = 'conviction' and {classb} = false and {classc} = false",
       title: "Were you convicted of a drug violation or a misdemeanor?"
      },
      {
       type: "boolean",
       name: "drug_time",
       visibleIf: "{record_type} = 'conviction' and {classb} = false and {classc} = false and {drug} = true",
       title: "Has it been at least 3 years after the judgment?"
      },
      {
       type: "boolean",
       name: "classb_years",
       visibleIf: "{record_type} = 'conviction' and {classb} = true",
       title: "Were you arrested within 7 years from the date of conviction or release from imprisonment?"
      },
      {
       type: "boolean",
       name: "classc_years",
       visibleIf: "{record_type} = 'conviction' and {classc} = true",
       title: "Were you arrested within 5 years from the date of conviction or release from imprisonment?"
      }
     ]
    }
   ],
"showQuestionNumbers": "off",
"title": "Oregon Absolute Pardon Eligibility Checker"
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