'use strict';


app.controller('CasketPreferenceController', ['casketPreferenceService', '$scope', '$rootScope', '$timeout', function (casketPreferenceService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 3;


    $scope.CasketPreference = {
        ListCasketForPackage : [],
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SelectCasketPreference: function (name, id, price) {
            $rootScope.OrderDetail.Model.CasketPreferenceId = id;
            $rootScope.OrderDetail.CasketPreferencePrice = price;
            $rootScope.OrderDetail.CasketPreferenceName = name;
        },
        SaveCasketPreference: function () {
            if ($scope.CasketPreference.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;

                var data = $rootScope.OrderDetail.Model;

                casketPreferenceService.SaveCasketPreference(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                }, function (error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        },
        GetListCasketForPackage: function () {
            var burialPackages = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function (e) {
                    return e.Id == $rootScope.OrderDetail.Model.BurialPackageId;
            });

            if (burialPackages[0] != null && burialPackages[0]!=undefined) {
                var listCasketId = burialPackages[0].ListBurialPackageOption.map(function(e) { return e.CasketPreferenceId; });
                $scope.CasketPreference.ListCasketForPackage = $rootScope.OrderDetail.SelectionData.CasketPreference.List.filter(function(item) {
                    return listCasketId.indexOf(item.Id) !== -1;
                });

            } else {
                $scope.CasketPreference.ListCasketForPackage = [];
            }
        }
    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();
            $scope.CasketPreference.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep3 = $scope.CasketPreference.SaveCasketPreference;
            $scope.CasketPreference.GetListCasketForPackage();

            var $grid = $('.urn-grid').imagesLoaded(function () {
                $grid.masonry({
                    columnWidth: '.grid-sizer',
                    gutter: '.gutter-sizer',
                    itemSelector: '.urn-item',
                    percentPosition: true
                });
            });


            if ($rootScope.IsLoadedCasket == false) {
                $('.fancybox').fancybox({
                    showNavArrows: true
                });
                $rootScope.IsLoadedCasket = true;
            }
            
            $(".urn-item .card").click(function () {
                $(this).parent().parent().find(".checkmark").detach();
                $(this).parent().parent().find(".blur").removeClass("active");
                $(this).find(".img").append('<div class="checkmark"><i class="fa fa-check-circle"></i></div>');
                $(this).find(".blur").addClass("active");
            });
        }, $rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    $scope.CasketPreference.GetListCasketForPackage();
        //}, $rootScope.TextContants.ConfigTimeoutCasket);

    });
}]);