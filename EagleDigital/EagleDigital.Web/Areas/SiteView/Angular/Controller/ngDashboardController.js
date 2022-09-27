'use strict';


app.controller("ngDashboardController",
    [
    'ngDashboardService',
    'ngCommonService',
    '$scope',
    '$rootScope',
    '$timeout',
    function (
        ngDashboardService,
        ngCommonService,
        $scope,
        $rootScope,
        $timeout
    ) {

        $scope.Notify = {
            List: [],
            GetListNotify: function() {
                ngDashboardService.GetListNotify().then(function (result) {
                    if (result.data.Status === $rootScope.TextContants.Status.OK) {
                        $scope.Notify.List = result.data.Model;
                    }
                }, function (error) {
                });
            }
        }

        $scope.Dashboard = {
            Model: {
                Id: null,
                Title: '',
                Content: '',
                CreateDate: null,
                IsDelete : false
            },
            ListNews: [],
            GetListNews : function() {
                ngDashboardService.GetListNews().then(function (result) {
                    if (result.data.Status === $rootScope.TextContants.Status.OK) {
                        scope.Dashboard.GetListNews = result.data.Model;
                    }
                }, function (error) {
                });
            },
            ShowAddNew: function() {
                $('#myModal').openModal();
            }
        }

        $scope.Notify.GetListNotify();

        $scope.$on('$viewContentLoaded', function () {
        });

    }]);


