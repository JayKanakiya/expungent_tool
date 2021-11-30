

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
        "expression": "{supervision} = false and {pending_charges} = false and {outstanding_fees} = false and {nolle} = false and {criminal_record} = true and {conviction_} = true and {years} = true",
        "html": "<h3>Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    }, {
        "expression": "{supervision} = true or {pending_charges} = true or {outstanding_fees} = true or {nolle} = true",
        "html": "<h3>You are not Eligible for Absolute Pardon </h3><br /><h2>Thank you for using the eligibility checker.</h2>"
    }
],
"pages": [
{
"name": "page1",
"elements": [
{
 "type": "boolean",
 "name": "supervision",
 "title": "Are you currently on supervision? ",
 "isRequired": true
},
{
 "type": "boolean",
 "name": "pending_charges",
 "visibleIf": "{supervision} = false",
 "title": "Do you have any pending charges in Connecticut or any other State or Federal\njurisdiction?",
 "isRequired": true
},
{
 "type": "boolean",
 "name": "outstanding_fees",
 "visibleIf": "{pending_charges} = false and {supervision} = false",
 "title": "Do you have any outstanding court fees, fines, Judicial motions, etc.? ",
 "isRequired": true
},
{
 "type": "boolean",
 "name": "nolle",
 "visibleIf": "{outstanding_fees} = false and {pending_charges} = false and {outstanding_fees} = false",
 "title": "Have you received a Nolle at any time during the previous 13 months? "
},
{
 "type": "boolean",
 "name": "criminal_record",
 "visibleIf": "{supervision} = false and {pending_charges} = false and {outstanding_fees} = false and {nolle} = false",
 "title": "Do you have a criminal record in CT?"
},
{
 "type": "boolean",
 "name": "conviction_",
 "visibleIf": "{criminal_record} = true and {supervision} = false and {pending_charges} = false and {outstanding_fees} = false and {nolle} = false",
 "title": "Has it been three (3) years since the conviction date for your most recent\nMisdemeanor? (if applicable)"
},
{
 "type": "boolean",
 "name": "years",
 "visibleIf": "(((({criminal_record} == true) and ({supervision} == false)) and ({pending_charges} == false)) and ({outstanding_fees} == false)) and ({nolle} == false) and ({conviction_} == true) ",
 "title": "Has it been five (5) years since the conviction date for your most recent Felony?\n(if applicable)"
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