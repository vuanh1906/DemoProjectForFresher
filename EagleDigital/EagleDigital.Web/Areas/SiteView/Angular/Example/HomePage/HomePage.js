//var sectionStep = 0;
//var serviceType = "";

$(document).ready(function() {
    $('.modal-trigger').leanModal({
        dismissible: false
    });
});

function setWidthHeight() {
    // post type 2 posts
    var leftCol = $(".post-type-2:first-child").outerHeight();
    var rightCol = $(".post-type-2:last-child").outerHeight();
    var maxHeight = 0;

    if ($(this).width() > 600) {
        $('.recentObituaries .contentObituary').each(function () {
            if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        });
        $('.recentObituaries .contentObituary').outerHeight(maxHeight);
    }

    if ($(this).width() > 768) {

        //post type 1 and type 2
        var childPost1 = $(".post-type-2:first-child").outerHeight();
        var childPost2 = $(".post-type-2:last-child").outerHeight();
        var mainText = $(".post-type-1 .body").outerHeight();
        var mainImg = $(".post-type-1 .img");
        var imgHeight = childPost1 + childPost2 - mainText + 28;
        mainImg.outerHeight(imgHeight);
    }
    if ($(this).width() <= 768 && $(this).width() > 480) {
        if (leftCol > rightCol) {
            rightCol = leftCol;
            $(".post-type-2:last-child").outerHeight(rightCol);
        }
        else {
            leftCol = rightCol;
            $(".post-type-2:first-child").outerHeight(leftCol);
        }
    }
    if ($(this).width() < 480) {
        $(".post-type-2").css("height", "auto");
    }
};


$(window).on("load resize", function() {
    $(".post-type-1 .img").css("height", "auto");
    $(".post-type-2").css("height", "auto");
    $('.recentObituaries .contentObituary').css("height", "auto");
    setWidthHeight();
});


//function CheckIsHasSection() {
//    var isHasSection = false;
//    $.ajax({
//        type: "POST",
//        async: false,
//        dataType: "json",
//        url: '/DocuSign/CheckIsHasSection',
//        success: function (results) {
//            if (results.Status == "Success" && results.IsHasSection == "YES") {
//                isHasSection = true;
//                sectionStep = results.SectionStep;
//                serviceType = results.ServiceType;
//            } else {
//                sectionStep = 0;
//                Continues();
//            }
//        }
//    });

//    if (isHasSection) {
//        $(".divClearSection").openModal({
//            dismissible: false
//        });
//    }
//}

//function ClearSection() {
//    $.ajax({
//        type: "POST",
//        async: false,
//        dataType: "json",
//        url: '/DocuSign/ClearSection',
//        success: function (results) {
//            if (results.Status == "Success") {
//                sectionStep = 0;
//                Continues();
//            }
//        }
//    });
//}

//function Continues() {
//    if (serviceType == "Burial") {
//        switch (sectionStep) {
//            case 0:
//                window.location.href = "../AtNeedOrder#/StartOverview";
//                break;
//            case 1:
//                window.location.href = "../AtNeedOrder#/StartTerms";
//                break;
//            case 2:
//                window.location.href = "../AtNeedOrder#/BurialPackage";
//                break;
//            case 3:
//                window.location.href = "../AtNeedOrder#/CasketPreference";
//                break;
//            case 4:
//                window.location.href = "../AtNeedOrder#/VaultSelection"; // Casket
//                break;
//            case 5:
//                window.location.href = "../AtNeedOrder#/BurialServiceProvided";
//                break;
//            case 6:
//                window.location.href = "../AtNeedOrder#/BurialCemeterySetup"; //Picup and Burial Option
//                break;
//            case 7:
//                window.location.href = "../AtNeedOrder#/BurialServiceDetail";
//                break;
//            case 8:
//                window.location.href = "../AtNeedOrder#/BiographicalData";
//                break;
//            case 9:
//                window.location.href = "../AtNeedOrder#/DecedantData";
//                break;
//            case 10:
//                window.location.href = "../AtNeedOrder#/SurvivorData";
//                break;
//            case 11:
//                window.location.href = "../AtNeedOrder#/MemorialServiceData";
//                break;
//            case 12:
//                window.location.href = "../AtNeedOrder#/ThankYou";
//                break;
//            case 13:
//                window.location.href = "../AtNeedOrder#/Checkout";
//                break;
//            case 14:
//                window.location.href = "../AtNeedOrder#/FinalSteps";
//                break;
//            default:
//        }
//    } else {
//        switch (sectionStep) {
//            case 0:
//                window.location.href = "../AtNeedOrder#/StartOverview";
//                break;
//            case 1:
//                window.location.href = "../AtNeedOrder#/StartTerms";
//                break;
//            case 2:
//                window.location.href = "../AtNeedOrder#/ServiceProvide";
//                break;
//            case 3:
//                window.location.href = "../AtNeedOrder#/MemorialPackageItems";
//                break;
//            case 4:
//                window.location.href = "../AtNeedOrder#/URN"; // urn 
//                break;
//            case 5:
//                window.location.href = "../AtNeedOrder#/PickupRemains";
//                break;
//            //case 6:
//            //    window.location.href = "../AtNeedOrder#/PickupRemains"; //Picup and Burial Option
//            //    break;
//            //case 7:
//            //    window.location.href = "../AtNeedOrder#/BiographicalData";
//            //    break;
//            case 8:
//                window.location.href = "../AtNeedOrder#/BiographicalData";
//                break;
//            case 9:
//                window.location.href = "../AtNeedOrder#/DecedantData";
//                break;
//            case 10:
//                window.location.href = "../AtNeedOrder#/SurvivorData";
//                break;
//            case 11:
//                window.location.href = "../AtNeedOrder#/MemorialServiceData";
//                break;
//            case 12:
//                window.location.href = "../AtNeedOrder#/ThankYou";
//                break;
//            case 13:
//                window.location.href = "../AtNeedOrder#/Checkout";
//                break;
//            case 14:
//                window.location.href = "../AtNeedOrder#/FinalSteps";
//                break;
//            default:
//        }
//    }
//}
