'use strict';

var app = angular.module("OrderApp", ['ngRoute', 'ngOnload', 'ngCookies']);
var homeApp = angular.module("HomeApp", ['ngCookies']);

app.config(["$routeProvider", '$locationProvider', function ($routeProvider, $locationProvider) {
    var sitePrefix = '';
    $routeProvider.when(sitePrefix+'/StartOverview', {
        templateUrl: '/AtNeedOrder/StartOverview',
        controller: 'StartOverviewController'
    }).when(sitePrefix + '/StartTerms', {
        templateUrl: '/AtNeedOrder/StartTerms',
        controller: 'StartTermsController'
    }).when(sitePrefix + '/ServiceProvide', {
        templateUrl: '/AtNeedOrder/ServiceProvide',
        controller: 'ServiceProvideController'
    }).when(sitePrefix + '/MemorialPackageItems', {
        templateUrl: '/AtNeedOrder/MemorialPackageItems',
        controller: 'MemorialPackageItemsController'
    }).when(sitePrefix + '/URN', {
        templateUrl: '/AtNeedOrder/URN',
        controller: 'URNController'
    }).when(sitePrefix + '/PickupRemains', {
        templateUrl: '/AtNeedOrder/PickupRemains',
        controller: 'PickupRemainsController'
    }).when(sitePrefix + '/BiographicalData', {
        templateUrl: '/AtNeedOrder/BiographicalData',
        controller: 'BiographicalDataController'
    }).when(sitePrefix + '/DecedantData', {
        templateUrl: '/AtNeedOrder/DecedantData',
        controller: 'DecedantDataController'
    }).when(sitePrefix + '/SurvivorData', {
        templateUrl: '/AtNeedOrder/SurvivorData',
        controller: 'SurvivorDataController'
    }).when(sitePrefix + '/MemorialServiceData', {
        templateUrl: '/AtNeedOrder/MemorialServiceData',
        controller: 'MemorialServiceDataController'
    }).when(sitePrefix + '/ThankYou', {
        templateUrl: '/AtNeedOrder/ThankYou',
        controller: 'ThankYouController'
    }).when(sitePrefix + '/Checkout', {
        templateUrl: '/AtNeedOrder/Checkout',
        controller: 'CheckoutController'
    }).when(sitePrefix + '/FinalSteps', {
        templateUrl: '/AtNeedOrder/FinalSteps',
        controller: 'FinalStepsController'
    }).when(sitePrefix + '/WhatDocusign', {
        templateUrl: '/AtNeedOrder/WhatDocusign',
        controller: 'WhatDocusignController'
    }).when(sitePrefix + '/DocusignSignedForm1', {
        templateUrl: '/AtNeedOrder/DocusignSignedForm1',
        controller: 'DocusignSignedForm1Controller'
    }).when(sitePrefix + '/EmailWellcome', {
        templateUrl: '/AtNeedOrder/EmailWellcome',
        controller: 'EmailWellcomeController'
    }).when(sitePrefix + '/PickUp', {
        templateUrl: '/AtNeedOrder/PickUp',
        controller: 'PickUpController'
    })
    //
    .when(sitePrefix + '/BurialPackage', {
        templateUrl: '/AtNeedOrder/BurialPackage',
        controller: 'BurialPackageController'
    })
    .when(sitePrefix + '/BurialOption', {
        templateUrl: '/AtNeedOrder/BurialOption',
        controller: 'BurialOptionController'
    }).when(sitePrefix + '/CasketPreference', {
        templateUrl: '/AtNeedOrder/CasketPreference',
        controller: 'CasketPreferenceController'
    }).when(sitePrefix + '/VaultSelection', {
        templateUrl: '/AtNeedOrder/VaultSelection',
        controller: 'VaultSelectionController'
    }).when(sitePrefix + '/BurialCemeterySetup', {
        templateUrl: '/AtNeedOrder/BurialCemeterySetup',
        controller: 'BurialCemeterySetupController'
    }).when(sitePrefix + '/BurialServiceProvided', {
        templateUrl: '/AtNeedOrder/BurialServiceProvided',
        controller: 'BurialServiceProvidedController'
    }).when(sitePrefix + '/BurialServiceDetail', {
        templateUrl: '/AtNeedOrder/BurialServiceDetail',
        controller: 'BurialServiceDetailController'
    }).when(sitePrefix + '/BurialServiceProvide', {
        templateUrl: '/AtNeedOrder/BurialServiceProvide',
        controller: 'BurialServiceProvideController'
    }).otherwise({
          redirectTo: '/StartOverview'
    });
 

    $locationProvider.html5Mode(false);

}]);

app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        if (angular.isString(text)) {
            return $sce.trustAsHtml(text);
        }
        return text;
    };
}]);

app.run(['$rootScope', '$window', '$cookieStore', function ($rootScope, $window, $cookieStore) {

    $rootScope.ModelSessionStorage = {
        SectionStep: 0,
        IsLoadedFinalSteps: false,
        FinalSteps: {
            GoodsServices: {
                FileName: "",
                LocationY: ""
            },
            LegalNext: {
                FileName: "",
                LocationY: ""
            },
            Cremation: {
                FileName: "",
                LocationY: ""
            },
            DeathCertificate: {
                FileName: "",
                LocationY: ""
            },
            IsComplate: false
        }
    }

    $rootScope.SetModelSessionStorage = function () {
        if (!$cookieStore.get('ModelSessionStorage')) {
            $cookieStore.put("ModelSessionStorage", angular.toJson($rootScope.ModelSessionStorage));
        }
    }

    $rootScope.SetModelSessionStorage();

    $rootScope.TextContants = {
        ConfigWaitTime: 700,     // not using
        ConfigTimeoutDefault: 1000,
        ConfigTimeoutCasket: 1200,
        ConfigTimeoutBurialPackage : 1000,
        MasterData: {
            EmailContact: "",
            EmailConway: "",
            EmailMorrilton: "",
            FaxConway: "",
            FaxMorrilton: "",
            Fax : ""
        },
        PickupRemain : {
            PickUp10days: "Pick up cremains at our office within 10 days",
            ShipUSPS: "Ship cremains Certified, Registered USPS",
            ShipUrn: "Ship urn & cremains Certified, Registered USPS",
            Personal: "Personal courier (central Arkansas only)"
        },
        DecedentRace : {
            AmericanIndian: "American",
            Other : "Other"
        },
        SpecializedCare: {
            Over500lbs: "Over 500 lbs"
        },
        ServiceType: {
            Burial: "Burial",
            Cremation: "Cremation"
        },
        MemorialType: {
            MemorialPackage: "MemorialPackage",
            MemorialPackageItem: "MemorialPackageItem",
            BurialMemorialPackageItem: "BurialMemorialPackageItem",
            BurialMemorialPackage: "BurialMemorialPackage",
            BurialService: "BurialService"
        },
        BurialType: {
            ChapelService: "Chapel Service",
            Church: "Church",
            Graveside: "Graveside",
            None: "None"
        },
        BurialServiceApply: {
            BaseService: "BaseService",
            Time: "Time",
            MoreOption: "MoreOption",
            Tranform : "Tranform",
            Facilitie: "Facilitie",
            CertifiedDeath: "CertifiedDeath",
            MailingDeath: "MailingDeath"
        },
        BurialPackage : {
            Rosewood: "Deluxe Funeral Package",
            Complete: "Complete Caring Funeral",
            Graveside: "Graveside Funeral Package",
            DirectBurial: "Direct Burial",
            Manual: "Manual Service Selections"
        },
        BurialPublicServiceType: {
            Music: "Music",
            Minster: "Minster",
            Pallbearers: "Pallbearers"
        },
        KeyPricing: {
            BasePrice: "BasePrice",
            CityCremationPrice: "CityCremationPrice",
            LocationPrice: "LocationPrice",
            ObituaryPreparationPrice: "ObituaryPreparationPrice",
            OnlineGuestbookPrice: "OnlineGuestbookPrice",
            QtyCertifiedPrice: "QtyCertifiedPrice",
            MemorialServicePrice: "MemorialServicePrice",
            SpecializedCarePrice: "SpecializedCarePrice",
            MemorialPackageItemPrice: "MemorialPackageItemPrice",
            URNPrice: "URNPrice",
            CasketPreferencePrice: "CasketPreferencePrice",
            VaultSelectionPrice: "VaultSelectionPrice",
            PickupRemainPrice: "PickupRemainPrice"
        },
        Status: {
            Success: "Success",
            Error: "Error"
        },
        IsHasSection: {
            Yes: "YES",
            No: "NO"
        },
        TypeRelationshipSurvivor: {
            Son: "Son",
            Daugther: "Daugther",
            Brothers: "Brothers",
            Sister: "Sister"
        },
        ListBrand: [{ Name: "Army" }, { Name: "Navy" }, { Name: "Marines" }, { Name: "Air Force" }, { Name: "Coast Guard" }],
        ListMaritalStatus: [{ Name: "Single - Never Married" }, { Name: "Married" }, { Name: "Divorced" }, { Name: "Widowed" }, { Name: "Married but separated" }],
        ListHospital: [{ Name: 'Inpatient' }, { Name: 'ER/Outpatient' }, { Name: 'DOA' }, { Name: 'Hospice Facility' }, { Name: 'Nursing Home' }, { Name: 'Residence' }, { Name: 'Other' }],
        ListHospitalOrther: [{ Name: 'Other' }, { Name: 'Nursing Home' }, { Name: 'Residence' }],
        ListVaultType: [{ Name: "Concrete", PhotoUrl: "Concrete Box.jpg" }, { Name: "Titan", PhotoUrl: "Monticello Vault2.jpg" }],
        ListLocationOfFuneral: [{ Name: "Church" }, { Name: "Chapel" }, { Name: "Graveside" }, { Name: "Other" }],
        ListMailingDeath: [{ Name: "Certified Mail" }],
        ListMemorialServiceTime: [{ Name: "10AM" }, { Name: "11AM" }, { Name: "12PM" }, { Name: "1PM" }, { Name: "2PM" }],
        ListHispanicOrigin: [
            { Name: 'No, not Spanish/Hispanic/Latino', Value: 'No, not Spanish/Hispanic/Latino' },
            { Name: 'Yes, Mexican, Mexican American, Chicano', Value: 'Yes, Mexican, Mexican American, Chicano' },
            { Name: 'Yes, Puerto Rican', Value: 'Yes, Puerto Rican' },
            { Name: 'Yes, Cuban', Value: 'Yes, Cuban' },
            { Name: 'Yes, other Spanish/Hispanic/Latino', Value: 'Other' }],
        ListDecedentRace:
        [{ Name: 'White', Value: 'White' },
            { Name: 'Black or African American', Value: 'Black or African American' },
            { Name: 'American Indian or Alaskan Native', Value: 'Other' },
            { Name: 'Asian Indian', Value: 'Asian Indian' },
            { Name: 'Chinese', Value: 'Chinese' },
            { Name: 'Filipino', Value: 'Filipino' },
            { Name: 'Japanese', Value: 'Japanese' },
            { Name: 'Korean', Value: 'Korean' },
            { Name: 'Vietnamese', Value: 'Vietnamese' },
            { Name: 'Other Asian', Value: 'Other' },
            { Name: 'Native Hawaiian', Value: 'Native Hawaiian' },
            { Name: 'Guamanian or Chamorro', Value: 'Guamanian or Chamorro' },
            { Name: 'Samoan', Value: 'Samoan' },
            { Name: 'Other Pacific Islander', Value: 'Other' },
            { Name: 'Other', Value: 'Other' }
        ],
        ListMethodOfDisposition: [
            { Name: 'Burial', Value: 'Burial' },
            { Name: 'Cremation', Value: 'Cremation' },
            { Name: 'Donation', Value: 'Donation' },
            { Name: 'Entombment', Value: 'Entombment' },
            { Name: 'RemovalFormState', Value: 'RemovalFormState' },
            { Name: 'Other', Value: 'Other' }
        ],
        ListBurialMemorialPackage: [
            { Name: 'Basic' ,Value: 'Basic' },
            { Name: 'Premium' ,Value: 'Premium' },
            { Name: 'Deluxe', Value: 'Deluxe' }
        ],
       
        Message: {
            requiredText: "This field is required. Please enter a value.",
            requiredSelect: "This field is required. Please enter a value.",
            requiredOptional: "This field is required. Please enter a value",
            requiredEmail: "This field is required. Please enter a value",
            requiredEmailFormat: "Please enter a valid email address.",
            requiredSex: "This field is required. Please enter a value.",
            requiredDate: "Please enter a valid date in MM/DD/YYYY format.",
            requiredAge: "Not insert any character Insert a letter (a-z)",
            requiredName: "Not insert any character or number in fields.",
            requiredPhone: "Please enter a valid phone number.",
            requiredPhoto: "Please select an image file.",
            requiredSizePhoto: "",
            requiredCreditCard: "Please enter a valid credit card.",
            requiredExpirationDate: "Please enter a valid expriration date.",
            requiredSecurityCode: "Please enter a valid security code.",
            requiredZipCode: "Please enter a valid zip code."
        },
        Regex: {
            Email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            PatternEmail: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$',
            Name: /^[a-zA-Z ]+$/,
            Phone: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
            DateTime: /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
            CreditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            ExpirationDate: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
            SecurityCode: /^[0-9]{3,4}$/,
            ZipCode: /^\d{5}(?:[-\s]\d{4})?$/,
            ZipCodeFullTemp: '(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)',
            ZipCodeFull: '\d{5}([\-]\d{4})?'
        },
        PleaseSelectText: "-- Please Select --",
        IsAgree: false,
        FormatNumber: function (number) {
            if (number != undefined) {
                number = Math.round(number * 100) / 100;
                number = number.toFixed(2) + '';
                var x = number.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            }
            return number;
        },
        MathRound: function (number) {
            return Math.round(number * 100) / 100;
            //return number.toFixed(2);
        },
        CalculateAge: function (todayDay, todayMonth, todayYear, birthDay, birthMonth, birthYear) {
            var  age = todayYear - birthYear;
            var ageMonth = todayMonth - birthMonth;
            var ageDay = todayDay - birthDay;

            if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
                age = parseInt(age) - 1;
            }
            return age;
        }
    };


    

    $rootScope.DataDynamics = {
        PublicServiceItem : {
            Id: 0,
            Name: "",
            IsAdd: false
        },
        SurvivingSpouse: {
            FullName: "",
            City: "",
            State: ""
        },
        LieuOfFlower: {
            Id: 0,
            BusinessName: "",
            Address: "",
            AddressLine2: "",
            City: "",
            State: "",
            ZipCode: "",
            CountryId: "",
            Country: {
                List: [{ "Country": "Loading ..." }],
                Choose: ""
            }
        },
        MemorialPackageItems: {
            Id: "",
            Name: "300-400 lbs ($225)",
            Qty: 0,
            Price: 0
        }
    };


    $rootScope.CheckoutModel = {
        Phone: "",
        Amount: 0,
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        AddressLine2: "",
        City: "",
        State: "",
        ZipCode: "",
        CardholderFullName: "",
        CreditCardNumber: "",
        ExpirationDate: "",
        SecurityCode: "",
        Cash: false,
        CreditCard: true,
        OurOffice: false,
        Insurance: false
    }


   


}]);

app.directive('dateTimePicker', function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {

            var formartDate = 'MM/DD/YYYY';
            var default_options = {
                format: formartDate,
                showTodayButton: true,
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'top'
                }
            };
            var passed_in_options = scope.$eval(attrs.datetimepickerOptions);
            var options = jQuery.extend({}, default_options, passed_in_options);

            var parent = $(element).parent();
            var dtp = parent.datetimepicker(default_options);
            dtp.on("dp.change", function (e) {
                if (!e.date)
                    ngModel.$setViewValue('');
                else
                    ngModel.$setViewValue(moment(e.date).format(formartDate));
                ngModel.$render();
            })
                .on('click', function (e) {
                    var values = $(element).val();
                    if ($(e.currentTarget.firstElementChild).attr('disabled') != 'disabled' && values == '') {
                        ngModel.$setViewValue(moment().format(formartDate));
                        ngModel.$render();
                    }
                });

            function setPickerValue() {
                var date = options.defaultDate || null;

                if (ngModel && ngModel.$viewValue) {
                    date = ngModel.$viewValue;
                }

                parent
                    .data('DateTimePicker')
                    .date(date);
            }
            if (ngModel) {
                ngModel.$render = function () {
                    setPickerValue();
                };
            }
            setPickerValue();
        }
    };
});

app.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // set up event handler on the form element
            //elem.on('submit', function () {
            //scope.on('Submit', function (e) {
            scope.$on('Submit', function () {
                //var firstInvalid = elem[0].querySelector('.ng-invalid');
                var firstInvalid = elem[0].querySelector('.ng-invalid');
                if (firstInvalid && firstInvalid.tagName.toLowerCase() === 'ng-form') {
                    firstInvalid = firstInvalid.querySelector('.ng-invalid');
                }
                // if we find one, set focus
                if (firstInvalid) {
                    var firstInvaidTemp = firstInvalid;
                    //if (firstInvaidTemp.localName == "select") {
                    //    //var selectInvalid = elem[0].querySelector('select[name="selectMaritalStatus"]');
                    //    firstInvaidTemp.focus();
                    //}else
                    if (firstInvaidTemp.querySelector('.ng-invalid') && firstInvaidTemp.querySelector('.ng-invalid').localName == "select") {
                        var selectInvalid = firstInvaidTemp.querySelector(".select-dropdown");
                        selectInvalid.focus();
                    }
                    else {
                        firstInvalid.focus();
                    }
                }
            });
        }
    };
});
