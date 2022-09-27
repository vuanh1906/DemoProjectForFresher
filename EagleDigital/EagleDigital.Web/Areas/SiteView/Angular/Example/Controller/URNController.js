'use strict';


app.controller('URNController', ['uRnService', '$scope', '$rootScope', '$timeout', function (uRnService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 4;
    
    $scope.URN = {
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SelectUrn: function (name, id, price) {
            $rootScope.OrderDetail.Model.URNSelectionId = id;
            $rootScope.OrderDetail.URNSelectionPrice = price;
            $rootScope.OrderDetail.URNSelectionName = name;
        },
        SaveURN: function () {
            if ($scope.URN.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;

                var data = $rootScope.OrderDetail.Model;

                uRnService.SaveURN(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                },function(error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $scope.URN.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep4 = $scope.URN.SaveURN;

            //$('.fancybox').fancybox({
            //    showNavArrows: true
            //});
           
            var $grid = $('.urn-grid').imagesLoaded(function () {
                // init Masonry after all images have loaded
                $grid.masonry({
                    columnWidth: '.grid-sizer',
                    gutter: '.gutter-sizer',
                    itemSelector: '.urn-item',
                    percentPosition: true
                });
            });
            $(".urn-item .card").click(function () {
                $(this).parent().parent().find(".checkmark").detach();
                $(this).parent().parent().find(".blur").removeClass("active");
                $(this).find(".img").append('<div class="checkmark"><i class="fa fa-check-circle"></i></div>');
                $(this).find(".blur").addClass("active");
            });
        },$rootScope.TextContants.ConfigTimeoutDefault);
    });
}]);