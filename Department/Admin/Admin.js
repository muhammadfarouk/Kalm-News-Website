app.controller("ContactCtrl", function ($scope, $http) {

    $scope.List = [];

    $scope.CurrentPage = 1;
    $scope.PageSize = 10;
    $scope.PageNumber = 1;

    $scope.Search = function (pageNumber) {

        if (pageNumber != null)
            $scope.CurrentPage = pageNumber;
        $http.post('Handler.ashx?action=ContactSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.ObjectSearch).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Delete = function (id) {
        swal({
            title: "هل انت متأكد ؟",
            text: "لا يمكن الرجوع للمحذوف مرة اخرى",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["لا", "نعم"]
        }).then(function (willDelete) {
            if (willDelete) {
                $http.get('Handler.ashx?action=ContactDelete&ID=' + id).then(function (data) {
                    swal("تم الحذف بنجاح", {
                        icon: "success"
                    });
                    $scope.Search();
                });
            } else {
                swal("لم يتم الحذف");
            }
        });
    };

    $scope.Search();
});

app.controller("CategoriesCtrl", function ($scope, $http) {

    $scope.Object = {};
    $scope.ObjectSearch = {};
    $scope.List = [];

    $scope.AddEditFlag = 1;
    $scope.CurrentPage = 1;
    $scope.PageSize = 10;
    $scope.PageNumber = 1;

    $scope.AddEdit = function () {

        $scope.FormMain.$setSubmitted();
        if ($scope.FormMain.$valid) {
            var vService;
            if ($scope.AddEditFlag == 1)
                vService = 'Add';
            else
                vService = 'Edit';

            $http.post('Handler.ashx?action=Categories' + vService, $scope.Object).then(function (data) {
                $scope.Object = {};
                $scope.Object.Type = '0';
                $scope.AddEditFlag = 1;
                $scope.Search();
                $scope.FormMain.$setPristine();
                $scope.FormMain.$setUntouched();
            });
        }
    };

    $scope.View = function (id) {
        $scope.Object = {};
        $scope.Object.ID = id;
        $scope.AddEditFlag = 2;
        $http.post('Handler.ashx?action=CategoriesSearch' + '&PageNumber=1' + '&PageSize=1', $scope.Object).then(
            function (data) {
                $scope.Object = data.data.Rows[0];
            });
    };

    $scope.Search = function (pageNumber) {

        if (pageNumber != null)
            $scope.CurrentPage = pageNumber;
        $http.post('Handler.ashx?action=CategoriesSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.ObjectSearch).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Delete = function (id) {
        swal({
            title: "هل انت متأكد ؟",
            text: "لا يمكن الرجوع للمحذوف مرة اخرى",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["لا", "نعم"]
            
        }).then(function (willDelete) {
            if (willDelete) {
                $http.get('Handler.ashx?action=CategoriesDelete&ID=' + id).then(function (data) {
                    swal("تم الحذف بنجاح", {
                        icon: "success",
                    });
                    $scope.Search();
                });
            } else {
                swal("لم يتم الحذف");
            }
        });
    };

    $scope.Search();
});

app.controller("ItemsCtrl", function ($scope, $http, fileUpload) {

    $scope.Object = {};
    $scope.ObjectSearch = {};
    $scope.List = [];

    $scope.AddEditFlag = 1;
    $scope.CurrentPage = 1;
    $scope.PageSize = 10;
    $scope.PageNumber = 1;

    $http.post('Handler.ashx?action=CategoriesSearch&PageNumber=1&PageSize=1000').then(function (data) {
        $scope.Categories = data.data.Rows;
        $scope.Object.CategoryID = $scope.Categories[0].ID;
    });

    $scope.AddEdit = function () {

        $scope.FormMain.$setSubmitted();
        if ($scope.FormMain.$valid) {
            var vService;
            if ($scope.AddEditFlag == 1)
                vService = 'Add';
            else
                vService = 'Edit';

            if ($scope.AttFile != null) {
                var file = $scope.AttFile;
                var vNewName = guid() + ".jpg";
                $scope.Object.Photo = vNewName;
                fileUpload.uploadFileToUrl(file, "/UploadDocument.aspx?Name=" + vNewName);
            }

            $http.post('Handler.ashx?action=Items' + vService, $scope.Object).then(function (data) {
                $scope.Object = {};
                $scope.Object.CategoryID = $scope.Categories[0].ID;
                $scope.AddEditFlag = 1;
                $scope.Search();
                $scope.FormMain.$setPristine();
                $scope.FormMain.$setUntouched();
            });
        }
    };

    $scope.View = function (id) {
        $scope.AddEditFlag = 2;
        $scope.Object = {};
        $scope.Object.ID = id;
        $http.post('Handler.ashx?action=ItemsSearch' + '&PageNumber=1' + '&PageSize=1', $scope.Object).then(
            function (data) {
                $scope.Object = data.data.Rows[0];
            });
    };

    $scope.Search = function (pageNumber) {

        if (pageNumber != null)
            $scope.CurrentPage = pageNumber;
        $http.post('Handler.ashx?action=ItemsSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.ObjectSearch).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Delete = function (id) {
        swal({
            title: "هل انت متأكد ؟",
            text: "لا يمكن الرجوع للمحذوف مرة اخرى",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["لا", "نعم"]
        }).then(function (willDelete) {
            if (willDelete) {
                $http.get('Handler.ashx?action=ItemsDelete&ID=' + id).then(function (data) {
                    swal("تم الحذف بنجاح", {
                        icon: "success",
                    });
                    $scope.Search();
                });
            } else {
                swal("لم يتم الحذف");
            }
        });
    };

    $scope.Search();
});