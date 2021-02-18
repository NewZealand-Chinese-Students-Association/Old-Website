$(document).ready(function () {
    var jdBaseUrl = document.URL.replace(".html", "/");
    var dataSource = {
        data: [{
            JobTitle: "Treasurer",
            Department: "Exec Group",
            JobCode: "EX201504",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 1
        }, {
            JobTitle: "IT Support",
            Department: "IT",
            JobCode: "IT201503",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 2
        }, {
            JobTitle: "IT Assistant",
            Department: "IT",
            JobCode: "IT201504",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 3
        }, {
            JobTitle: "Web Developer",
            Department: "IT",
            JobCode: "IT201501",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 4
        }, {
            JobTitle: "Web Designer",
            Department: "IT",
            JobCode: "IT201502",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 5
        }, {
            JobTitle: "A/Director of Operations",
            Department: "Operations",
            JobCode: "OP201501",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 6
        }, {
            JobTitle: "Market Analyst",
            Department: "Operations",
            JobCode: "OP201502",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 7
        }, {
            JobTitle: "Asia Representative",
            Department: "Business Development",
            JobCode: "BD201504",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 8
        }, {
            JobTitle: "A/Director of Business Development",
            Department: "Business Development",
            JobCode: "BD201502",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 9
        }, {
            JobTitle: "Club Relationship Officer",
            Department: "Business Development",
            JobCode: "BD201503",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 10
        }, {
            JobTitle: "Fundraising Manager",
            Department: "Business Development",
            JobCode: "BD201504",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 11
        }, {
            JobTitle: "Partnership Manager",
            Department: "Business Development",
            JobCode: "BD201505",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 12
        }, {
            JobTitle: "A/Director of Marketing",
            Department: "Marketing",
            JobCode: "MK201501",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 13
        }, {
            JobTitle: "Manager of Contents Creation",
            Department: "Marketing",
            JobCode: "MK201502",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 14
        }, {
            JobTitle: "Graphic Design Manager",
            Department: "Marketing",
            JobCode: "MK201503",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 15
        }, {
            JobTitle: "Senior Graphic Designer",
            Department: "Marketing",
            JobCode: "MK201504",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 16
        }, {
            JobTitle: "Junior Graphic Designer",
            Department: "Marketing",
            JobCode: "MK201505",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 17
        }, {
            JobTitle: "Video Production Manager",
            Department: "Marketing",
            JobCode: "MK201506",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 18
        }, {
            JobTitle: "Senior Photographer",
            Department: "Marketing",
            JobCode: "MK201507",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 19
        }, {
            JobTitle: "Junior Photographer",
            Department: "Marketing",
            JobCode: "MK201508",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 20
        }, {
            JobTitle: "Senior Video Editor",
            Department: "Marketing",
            JobCode: "MK201509",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 21
        }, {
            JobTitle: "Junior Video Editor",
            Department: "Marketing",
            JobCode: "MK201510",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 22
        }, {
            JobTitle: "KWritten Content Manager",
            Department: "Marketing",
            JobCode: "MK201511",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 23
        }, {
            JobTitle: "Senior Writer",
            Department: "Marketing",
            JobCode: "MK201512",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 24
        }, {
            JobTitle: "Junior Writer",
            Department: "Marketing",
            JobCode: "MK201513",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 25
        }, {
            JobTitle: "Manager of Marketing Channel",
            Department: "Marketing",
            JobCode: "MK201514",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 26
        }, {
            JobTitle: "Social Media Manager",
            Department: "Marketing",
            JobCode: "MK201515",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 27
        }, {
            JobTitle: "Social Media Administrator",
            Department: "Marketing",
            JobCode: "MK201516",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 28
        }, {
            JobTitle: "Direct Marketing Manager",
            Department: "Marketing",
            JobCode: "MK201517",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 29
        }, {
            JobTitle: "Email Marketing Assistant",
            Department: "Marketing",
            JobCode: "MK201518",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 30
        }, {
            JobTitle: "SMS Marketing Assistant",
            Department: "Marketing",
            JobCode: "MK201519",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 31
        }, {
            JobTitle: "KPI Analyst",
            Department: "Marketing",
            JobCode: "MK201520",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 32
        }, {
            JobTitle: "User Experience Designer",
            Department: "Marketing",
            JobCode: "MK201521",
            ClousesOn: "2015-03-31",
            JobDescriptionBaseUrl: jdBaseUrl,
            Value: 33
        }],
        cancel: function (e) {
            e.preventDefault();
        },
        batch: true
    };

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html())
    }).data("kendoListView");

    $(".k-add-button").click(function (e) {
        listView.add();
        e.preventDefault();
    });

    this.applyVacancy = function (jobcode) {
		var candidateName = $("#name_" + jobcode)[0].value;
		var email = $("#email_" + jobcode)[0].value;
		var mobile = $("#mobile_" + jobcode)[0].value;
		var graduated = $("#graduated_" + jobcode)[0].checked === false ? "No" : "Yes";
		var linkedin = $("#linkedin_" + jobcode)[0].value;
		if(candidateName && email && mobile && graduated && linkedin) {
			if(confirm("Please check and confirm that all information below is correct: \n\nCandidate Name: " + candidateName + "\nEmail: " + email + "\nMobile: " + mobile + "\nGraduated: " + graduated + "\nLinkedIn: " + linkedin)) {
				window.alert("Sorry, this function is currently unavailable. \n\nPlease send an Email directly to recruitment@nzcsa.com. Our HR Manager will get in touch with you shortly.");
			} else {
				//e.preventDefault();
			}
		} else {
			//e.preventDefault();
		}
    };
});