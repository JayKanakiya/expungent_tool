

Survey
    .StylesManager
    .applyTheme("darkblue");

//Add a property a text property into all questions types and into page
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

var jsonNY = {
    "completedHtml": "<h3>Thank you for checking the eligibilty.</h3>",
    "completedHtmlOnCondition": [
        {
            "expression": "{citizen_bool} = false or  {2C_bool} = true or {10Y_check} = 0 or {sex_offence_check} = 1 or {offence_checkbox.length} > 1 or  {open_criminal_case_check_bool} = 1",
            "html": "<h3>Not Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }, {
            "expression": "{open_criminal_case_check} = 0",
            "html": "<h3>You are Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }
    ],
    "pages": [
        {
            "elements": [
                {
                    "type": "panel",
                    "elements": [
                        {
                            "type": "html",
                            "name": "Clean_slate Intro",
                            "html": "<article class='intro'>    <h1 class='intro__heading intro__heading--NY title'>  About New York Sealing    </h1>    <div class='intro__body wysiwyg'>       <p>New York uses a process called sealing for some cases. Sealing means that the record still exists, but all related fingerprint and palmprint cards, booking photos, and DNA samples may be returned to you or destroyed (except digital fingerprints are not destroyed if you already have fingerprints on file from a different unsealed case). Department of Criminal Justice System, Police, Prosecutor, and in some cases, court records, are hidden from the public.</p> <p>The following cases are closed or sealed without you having to do anything:</p>       <ul>        \t<li>        \t\tCases where you got a Good Result        \t</li>        \t<li>        \t\tCrimes Committed by Children        \t\t<li>        \t\t\tCrimes committed by Youthful Offenders        \t\t        \t</li>        \t<li>        \t\tViolations and Traffic Infractions like disorderly conduct and trespass are partially sealed)        \t</li>       </ul>         <p>If a record that is supposed to be sealed comes up on your Criminal Records search, you can ask to seal that record. Click on \"NEXT\" to check your eligibility.</p></div> </article>"
                        }
                    ],
                    "name": "panel1"
                }
            ],
            "name": "page0"
        },


        {
            "name": "page1",
            "elements": [
                {
                    "type": "boolean",
                    "name": "citizen_bool",
                    "title": "Citizenship check",
                    "label": "Are you a Citizen of United States of America ?",
                    "isRequired": true
                },
                {
                    "type": "boolean",
                    "name": "2C_bool",
                    "visibleIf": "{citizen_bool} = true",
                    "title": "2C_bool check",
                    "label": "Do you have more than two criminal convictions (Misdemeanor or Felony) ?",
                    "popupdescription": "If you have more than one conviction that was “committed as part of the same criminal transaction,” they count as a single conviction under this law.",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "10Y_check",
                    "title": "Have less than ten years passed since your last criminal conviction ?",
                    "visibleIf": "{2C_bool} = false",
                    // "label": "Have less than ten years passed since your last criminal conviction ?",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }, {
                            "value": "-1",
                            "text": "Not Sure"
                        }
                    ],
                    "colCount": 3
                },
                {
                    "type": "radiogroup",
                    "name": "sex_offence_check",
                    "title": "Are you guilty of any sex offense ?",
                    "visibleIf": "{10Y_check} = 1 or {10Y_check} = -1",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }, {
                            "value": "-1",
                            "text": "Not Sure"
                        }
                    ],
                    "colCount": 3
                  },
                  {
                    "type": "checkbox",
                    "name": "offence_checkbox",
                    "visibleIf": "{sex_offence_check} = 0 or {sex_offence_check} = -1",
                    "title": "Please select the offences that you plan to expunge?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "Please select at least one",
                            "minCount": 1
                        }
                    ],
                    // "hasOther": true,
                    "choices": [
                        "Homicide Offenses", "Class A Felony Offenses", "Class B Violent Felony Offenses", "Class C Violent Felony Offenses","Class D Violent Felony Offenses","Class E Violent Felony Offenses","Conspiracy Offenses","None of the above" 
                    ],
                    // "otherText": "Other feature:",
                    "colCount": 2
                },
                {
                    "type": "radiogroup",
                    "name": "open_criminal_case_check",
                    "title": "Do you have any open criminal case ?",
                    "visibleIf": "{offence_checkbox} = ['None of the above'] ",
                    // "label": "Have less than ten years passed since your last criminal conviction ?",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }
                    ],
                    "colCount": 3
                  }
                  
            ]
            
        }
        , {
            "name": "page2",
            "elements": [
                {
                    "type": "multipletext",
                    "name": "contact_customer",
                    "title": "Want us to connect with us? Leave your name and email here:",
                    "items": [
                        {
                            "name": "Name"
                        }, {
                            "name": "E-mail",
                            "inputType": "email",
                            "validators": [
                                {
                                    "type": "email"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ],
    "showQuestionNumbers": "off",
    "title": "New York Sealing Determination Form"
};

var jsonWA = {
    "completedHtml": "<h3>Thank you for checking the eligibilty.</h3>",
    "completedHtmlOnCondition": [
        {
            "expression": "{trafficking_bool} = False or {non-prostitution_bool} = True or {pending_state_bool} = True or {sex_off_bool_1} = True or {5years_bool} = False or {completed_sen_bool} = False or {pending_criminal_bool} = True or {violent_off_bool} = True or {DUI_bool} = True or {sex_off_bool_2} = True or {10.99.020_bool} = True or {3years_bool} = False or {BorC_bool} = False or {pending_charge_bool} = True or {firearm_bool} = True or {second_deg_bool} = False or {time_BorC_bool} = False",
            "html": "<h3>Not Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }, {
            "expression": "{marijuana_21_bool} = True or {pending_state_bool} = False or {5years_bool} = True or {3years_bool} = True or {time_BorC_bool} = True",
            "html": "<h3>You are Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }
    ],
    "pages": [
        {
            "elements": [
                {
                    "type": "panel",
                    "elements": [
                        {
                            "type": "html",
                            "name": "Clean_slate Intro",
                            "html": "<article class='intro'> <h1>Washington State Expungment Form </h1> <p>Fill out quiz for washington expungement process.</p> </article>"
                        }
                    ],
                    "name": "panel1"
                }
            ],
            "name": "page0"
        },
        {
            "name": "page1",
            "elements": [
                {
                    type: "radiogroup", 
                    choices: [ "Misdemeanor", "Felony" ],
                    "name": "misdemeanor_felony_check",
                    "title": "Check if charge is misdemeanor or felony",
                    "label": "Is the charge a felony or misdemeanor",
                    "isRequired": true
                },
                // misdemeanor
                {
                    type: "boolean", 
                    "name": "marijuana_21_bool",
                    "visibleIf": "{misdemeanor_felony_check} = Misdemeanor", 
                    "title": "Marijuana and 21",
                    "label": "Is it a marijuana offense and you were over 21?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "prostitution_bool",
                    "visibleIf": "{marijuana_21_bool} = False", 
                    "title": "Is prostitution convicion",
                    "label": "Is the conviction a prostituion conviction?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "trafficking_bool",
                    "visibleIf": "{prostitution_bool} = True", 
                    "title": "Is trafficking victim",
                    "label": "Were you a victim of trafficking",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "non-prostitution_bool",
                    "visibleIf": "{trafficking_bool} = True", 
                    "title": "Is non-prostitution conviction",
                    "label": "Were you convicted of any other non-prostitution crimes in any state of federal since date of conviction?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "pending_state_bool",
                    "visibleIf": "{non-prostitution_bool} = False", 
                    "title": "Is pending state charge",
                    "label": "Do you have a pending charge in any state of federal for a non-prostitution crime",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "domestic_bool",
                    "visibleIf": "{prostitution_bool} = False", 
                    "title": "Is domestic violence conviction",
                    "label": "Is it a domestic violence conviction?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "sex_off_bool_1",
                    "visibleIf": "{domestic_bool} = True", 
                    "title": "Is sex offense",
                    "label": "Does it involve obscenity & pornography, sexual explotation of children, or other sex offenses (except fail to register as sex offender)",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "5years_bool",
                    "visibleIf": "{sex_off_bool} = False", 
                    "title": "Is sex offense",
                    "label": "Does it involve obscenity & pornography, sexual explotation of children, or other sex offenses (except fail to register as sex offender)",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "completed_sen_bool",
                    "visibleIf": "{domestic_bool} = False", 
                    "title": "Have completed all sentence terms",
                    "label": "Have you completed all terms of the sentence?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "pending_criminal_bool",
                    "visibleIf": "{completed_sen_bool} = True", 
                    "title": "Have any pending criminal charges",
                    "label": "Do you have any pending criminal charges?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "violent_off_bool",
                    "visibleIf": "{pending_criminal_bool} = False", 
                    "title": "Violent Offense",
                    "label": "Was this offense a violent offense?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "DUI_bool",
                    "visibleIf": "{violent_off_bool} = False", 
                    "title": "DUI",
                    "label": "Was this offense a DUI or a prior offense?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "sex_off_bool_2",
                    "visibleIf": "{DUI_bool} = False", 
                    "title": "Is sex offense",
                    "label": "Does it involve obscenity & pornography, sexual explotation of children, or other sex offenses (except fail to register as sex offender)",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "10.99.020_bool",
                    "visibleIf": "{sex_off_bool_2} = False", 
                    "title": "Defined 10.99.020",
                    "label": "Was this offense defined in 10.99.020?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "3years_bool",
                    "visibleIf": "{10.99.020_bool} = False", 
                    "title": "After 3 years",
                    "label": "Has it been 3 years after sentence completion",
                    "isRequired": true
                },
                // Felony
                {
                    type: "boolean", 
                    "name": "BorC_bool",
                    "visibleIf": "{misdemeanor_felony_check} = Felony", 
                    "title": "B or C Felony",
                    "label": "Is it a class B or C felony?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "pending_charge_bool",
                    "visibleIf": "{BorC_bool} = True", 
                    "title": "Have pending charge",
                    "label": "Do you have a pending charge against you?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "violent_person_bool",
                    "visibleIf": "{pending_charge_bool} = False", 
                    "title": "crime violent or against",
                    "label": "Was the crime a violent crime or a crime against persons?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "firearm_bool",
                    "visibleIf": "{violent_person_bool} = True", 
                    "title": "firearm, deadly, or sexual",
                    "label": "Did you have a firearm, deadly weapon, or sexual motivation",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "second_deg_bool",
                    "visibleIf": "{firearm_bool} = False", 
                    "title": "second or third degree assault",
                    "label": "Was it assault in the second degree, assault in the third degree not against an officer, or robbery in the second degree?",
                    "isRequired": true
                },
                {
                    type: "boolean", 
                    "name": "time_BorC_bool",
                    "visibleIf": "{second_deg_bool} = True or {violent_person_bool} = False", 
                    "title": "10 year after B or 5 year after C",
                    "label": "Has it been 10 years for a class B felony or 5 years for a class C felony?",
                    "isRequired": true
                },

               
                
            ]
        }
            
       
    ],
    "showQuestionNumbers": "off",
    "title": "Washington Sealing Determination Form"
};

window.survey = new Survey.Model(jsonWA);


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