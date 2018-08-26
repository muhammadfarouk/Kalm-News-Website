app.controller("ContactUsCtrl", function ($scope, $http) {

    $scope.Object = {};
    $scope.Add = function () {

        $scope.FormMain.$setSubmitted();
        if ($scope.FormMain.$valid) {
            $http.post('Handler.ashx?action=ContactAdd', $scope.Object).then(function (data) {
                $scope.Object = {};
                $scope.FormMain.$setPristine();
                $scope.FormMain.$setUntouched();
                swal("تم إرسال الرسالة بنجاح");
            });
        }
    };

});

app.controller("AboutUsCtrl", function ($scope, $http) { });

app.controller("ListingCtrl", function ($scope, $http, $location) {

    $scope.CurrentPage = 1;
    $scope.PageSize = 10;
    $scope.PageNumber = 1;

    $scope.Search = function (pageNumber) {

        window.scrollTo(0, 0);

        $scope.Object = {};
        $scope.Object.ID = localStorage.getItem('CatID');
        $http.post('Handler.ashx?action=CategoriesSearch&PageNumber=1&PageSize=1', $scope.Object).then(function (data) {
            $scope.CategoryName = data.data.Rows[0].Title;

            $scope.Object = {};
            $scope.Object.CategoryID = localStorage.getItem('CatID');
            $scope.List = [];
            $http.post('Handler.ashx?action=ItemsSearch' +
                '&PageNumber=' +
                $scope.CurrentPage +
                '&PageSize=' +
                $scope.PageSize,
                $scope.Object).then(
                function (data) {
                    $scope.List = [];
                    if (data.data.Rows.length != 0) {
                        $scope.List = data.data.Rows;
                        $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                        $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                    }
                });
        });
    };

    $scope.Search();

    $scope.Details = function (ID) {
        localStorage.setItem('ID', ID);
        $location.path('/Details');
    };
});

app.controller("SearchCtrl", function ($scope, $http, $location) {

    $scope.CurrentPage = 1;
    $scope.PageSize = 10;
    $scope.PageNumber = 1;

    $scope.Search = function (pageNumber) {

        window.scrollTo(0, 0);

        $scope.Object = {};
        $scope.Object.KeyWord = localStorage.getItem('KeyWord');
        $scope.List = [];
        $http.post('Handler.ashx?action=ItemsSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.Object).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Search();

    $scope.Details = function (ID) {
        localStorage.setItem('ID', ID);
        $location.path('/Details');
    };
});

app.controller("DetailsCtrl", function ($scope, $http) {

    $scope.Object = {};
    $scope.Object.ID = localStorage.getItem('ID');
    $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=1', $scope.Object).then(
        function (data) {
            $scope.ObjectView = {};
            if (data.data.Rows.length != 0) {
                $scope.ObjectView = data.data.Rows[0];
            }
        });
});

app.controller("ImagesCtrl", function ($scope, $http) {

    $scope.CurrentPage = 1;
    $scope.PageSize = 6;
    $scope.PageNumber = 1;

    $scope.Search = function (pageNumber) {

        window.scrollTo(0, 0);

        $scope.Object = {};
        $scope.Object.CategoryID = 14;
        $scope.List = [];
        $http.post('Handler.ashx?action=ItemsSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.Object).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Search();

    $scope.Show = function (title, photo) {
        $scope.CurrentTitle = title;
        $scope.CurrentPhoto = photo;
    };
});

app.controller("VideosCtrl", function ($scope, $http) {

    $scope.CurrentPage = 1;
    $scope.PageSize = 6;
    $scope.PageNumber = 1;

    $scope.Search = function (pageNumber) {

        window.scrollTo(0, 0);

        $scope.Object = {};
        $scope.Object.CategoryID = 13;
        $scope.List = [];
        $http.post('Handler.ashx?action=ItemsSearch' +
            '&PageNumber=' +
            $scope.CurrentPage +
            '&PageSize=' +
            $scope.PageSize,
            $scope.Object).then(
            function (data) {
                $scope.List = [];
                if (data.data.Rows.length != 0) {
                    data.data.Rows.forEach(function (item) {
                        var thumbUrl = getParameterByName(item.Video, 'v');
                        item.Thumbnail = 'http://img.youtube.com/vi/' + thumbUrl + '/default.jpg';
                    });
                    $scope.List = data.data.Rows;
                    $scope.totalItems = data.data.Rows[0].TotalRows.toString();
                    $scope.totalPages = (Math.ceil(data.data.Rows[0].TotalRows / $scope.PageSize)).toString();
                }
            });
    };

    $scope.Search();

    $scope.Show = function (title, url) {
        $scope.CurrentTitle = title;
        document.getElementById('iframe').src = url;
    };
});