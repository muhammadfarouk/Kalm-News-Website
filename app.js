var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

function v404() {
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('ID');
    window.location = "/index.html";
    return false;
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {

        element.bind("keydown keypress",
            function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
    };
});

app.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {

            // set up event handler on the form element
            elem.on('submit', function () {

                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');

                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
});

app.directive('loading',   ['$http' ,function ($http)  
{  
    return {  
        restrict: 'A',  
        template: '<div class="loading-spiner"><img width="60px" src="/Template/images/loading-animated.gif" /> </div>',
        link: function (scope, elm, attrs)  
        {  
            scope.isLoading = function () {  
                return $http.pendingRequests.length > 0;  
            };  
  
            scope.$watch(scope.isLoading, function (v)  
            {  
                if(v){  
                    elm.show();  
                }else{  
                    elm.hide();  
                }  
            });  
        }  
    };  
}])  

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                    var file = scope.AttFile;
                    scope.fileSizeError = false;
                    scope.fileTypeError = false;
                    if (file.size > 1000000) {
                        scope.fileSizeError = true;
                    }
                });
            });
        }
    };
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {

        element.bind("keydown keypress",
            function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
    };
});

app.factory('fileUpload', ['$http', '$rootScope', function ($http, $rootScope) {
    var fac = {}
    fac.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    return fac;
}]);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "Department/Website/HomePage.html",
            controller: "HomeCtrl",
        })
        .when("/AdminContact", {
            templateUrl: "Department/Admin/Contact.html",
            controller: "ContactCtrl",
            resolve: {
                resolvedVal: function () {
                    if (localStorage.getItem('LoggedIn') != null)
                        return true;
                    else
                        v404();
                }
            }
        })
        .when("/AdminCategories", {
            templateUrl: "Department/Admin/Categories.html",
            controller: "CategoriesCtrl",
            resolve: {
                resolvedVal: function () {
                    if (localStorage.getItem('LoggedIn') != null)
                        return true;
                    else
                        v404();
                }
            }
        })
        .when("/AdminItems", {
            templateUrl: "Department/Admin/Items.html",
            controller: "ItemsCtrl",
            resolve: {
                resolvedVal: function () {
                    if (localStorage.getItem('LoggedIn') != null)
                        return true;
                    else
                        v404();
                }
            }
        })
        .when("/Contact", {
            templateUrl: "Department/Website/ContactUs.html",
            controller: "ContactUsCtrl"
        })
        .when("/About", {
            templateUrl: "Department/Website/AboutUs.html",
            controller: "AboutUsCtrl"
        })
        .when("/Listing", {
            templateUrl: "Department/Website/Listing.html",
            controller: "ListingCtrl"
        })
        .when("/Search", {
            templateUrl: "Department/Website/Search.html",
            controller: "SearchCtrl"
        })
        .when("/Details", {
            templateUrl: "Department/Website/Details.html",
            controller: "DetailsCtrl"
        })
        .when("/Images", {
            templateUrl: "Department/Website/Images.html",
            controller: "ImagesCtrl"
        })
        .when("/Videos", {
            templateUrl: "Department/Website/Videos.html",
            controller: "VideosCtrl"
        })
        .otherwise({
            templateUrl: "index.html"
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
});

app.run(function ($rootScope) {

    if (document.URL.indexOf('/') > -1)
    {
        var URL = document.URL.split('/');
        if (URL[1] == 'Listing' || URL[1] == 'Details')
            $rootScope.ColorActiveNews = { "color": "#eb0254" };
        else if (URL[1] == 'Videos')
            $rootScope.ColorActiveVideos = { "color": "#eb0254" };
        else
            $rootScope.Current = URL[1].substring(1, URL[0].length);
    }
    else
        $rootScope.Current = 'Home';
});

app.controller("HomeCtrl", function ($scope, $rootScope, $location, $http, $route) {

    $scope.Logout = function () {
        localStorage.removeItem('LoggedIn');
        localStorage.removeItem('ID');
        window.location = "/index.html";
    };

    $rootScope.Current = 'Home';

    if (window.location.href.indexOf('Admin') > -1)
        $scope.ControlPanelCase = true;
    else
        $scope.ControlPanelCase = false;

    $scope.ChangeRoute = function (url, CatID, ID, KeyWord) {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('#navbar-menu').removeClass('in');
            $('#bars').removeClass();
            $('#bars').addClass('fa fa-bars');
            $('body').removeClass();
        } 
        $scope.ControlPanelCase = false;
        if (CatID == 16)
            $rootScope.Current = 'Research';
        else if (CatID == 17)
            $rootScope.Current = 'Report';
        else if (url != '')
            $rootScope.Current = url;
        else
            $rootScope.Current = 'Home';

        if (CatID != null)
            localStorage.setItem('CatID', CatID);
        if (ID != null)
            localStorage.setItem('ID', ID);
        if (KeyWord != null)
            localStorage.setItem('KeyWord', KeyWord);

        $rootScope.ColorActiveNews = { "color": "#24252f" };
        if ((url == 'Listing' || url == 'Details') && CatID != 16 && CatID != 17)
            $rootScope.ColorActiveNews = { "color": "#eb0254" };

        $rootScope.ColorActiveVideos = { "color": "#24252f" };
        if (url == 'Videos')
            $rootScope.ColorActiveVideos = { "color": "#eb0254" };

        $location.path('/' + url);
        $route.reload();
        $("html, body").animate({ scrollTop: 0 }, 600);
    };

    $scope.Login = function () {
        $scope.Error = false;
        $scope.LoginForm.$setSubmitted();
        if ($scope.LoginForm.$valid) {
            if ($scope.LoginObject.Username == 'Admin' && $scope.LoginObject.Password == 'a@1') {
                localStorage.setItem('LoggedIn', true);
                $('#Login').modal('hide');
                $scope.ControlPanelCase = true;
                $location.path('/AdminContact');
                $route.reload();
            }
            else
                $scope.Error = true;
        }
    };

    //News Categories Listing Menu
    var Object = {};
    Object.Type = 0;
    $http.post('Handler.ashx?action=CategoriesSearch&PageNumber=1&PageSize=100', Object).then(function (data) {
        $scope.NewsCategories = [];
        if (data.data.Rows.length != 0) {
            data.data.Rows.forEach(function (item) {
                if (item.ID != 16)
                {
                    if (item.ID != 17)
                        $scope.NewsCategories.push(item);
                }
            });

            //Videos Listing Menu
            Object = {};
            Object.CategoryID = 13;
            Object.Popular = true;
            $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=5', Object).then(function (data) {
                $scope.VideosMenu = [];
                if (data.data.Rows.length != 0) {
                    data.data.Rows.forEach(function (item) {
                        var thumbUrl = getParameterByName(item.Video, 'v');
                        item.Thumbnail = 'http://img.youtube.com/vi/' + thumbUrl + '/default.jpg';
                    });
                    $scope.VideosMenu = data.data.Rows;
                }

                //Urgent
                Object = {};
                Object.Urgent = true;
                $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=3', Object).then(function (data) {
                    $scope.Urgent = [];
                    if (data.data.Rows.length != 0)
                        $scope.Urgent = data.data.Rows;

                    $('#NewsTicker-rtl').owlCarousel({
                        rtl: true, loop: true, dots: false, autoplay: true, autoplayTimeout: 5000, //Set AutoPlay to 5 seconds
                        autoplayHoverPause: true, nav: true, navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"], items: 1
                    }
    );

                    //Slider
                    Object = {};
                    Object.HomeSlider = true;
                    $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=5', Object).then(function (data) {
                        $scope.HomeSlider = [];
                        if (data.data.Rows.length != 0)
                            $scope.HomeSlider = data.data.Rows;


                        //slider rtl
                        $('#owl-slider-rtl').owlCarousel({
                            rtl: true, loop: true, autoplay: true, autoplayTimeout: 6000, //Set AutoPlay to 6 seconds
                            autoplayHoverPause: true, nav: true, navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"], items: 1, responsive: {
                                0: {
                                    items: 1
                                }
                                , 479: {
                                    items: 1
                                }
                                , 768: {
                                    items: 1
                                }
                                , 980: {
                                    items: 1
                                }
                                , 1199: {
                                    items: 1
                                }
                            }
                        }
                        );

                        //Slider Left
                        Object = {};
                        Object.HomeLeftSide = true;
                        $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=3', Object).then(function (data) {
                            $scope.HomeLeftSide = [];
                            if (data.data.Rows.length != 0)
                                $scope.HomeLeftSide = data.data.Rows;

                            //Important Right
                            Object = {};
                            Object.HomeView = true;
                            $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=1', Object).then(function (data) {
                                $scope.ImportantRight = [];
                                if (data.data.Rows.length != 0)
                                    $scope.ImportantRight = data.data.Rows;

                                //Important Left
                                Object = {};
                                Object.HomeView = true;
                                $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=5', Object).then(function (data) {
                                    $scope.ImportantLeft = [];
                                    if (data.data.Rows.length != 0)
                                        $scope.ImportantLeft = data.data.Rows.splice(1, 4);

                                    $('.post-slider-rtl').owlCarousel({
                                        rtl: true, loop: true, //        lazyLoad: true,
                                        dots: false, nav: true, navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"], items: 1, responsive: {
                                            0: {
                                                items: 1
                                            }
                                            , 479: {
                                                items: 1
                                            }
                                            , 768: {
                                                items: 1
                                            }
                                            , 980: {
                                                items: 1
                                            }
                                            , 1199: {
                                                items: 1
                                            }
                                        }
                                    }
    );

                                    //Popular
                                    Object = {};
                                    $scope.PopularObject = {};
                                    Object.Popular = true;
                                    $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=1000', Object).then(function (data) {
                                        $scope.Popular = [];
                                        if (data.data.Rows.length != 0) {
                                            $scope.PopularObject = data.data.Rows[0];
                                            $scope.Popular = data.data.Rows.splice(0, 1);
                                        }

                                        //Latest
                                        Object = {};
                                        Object.Title = 'GetAllExceptReportsAndResearches';
                                        $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=1000', Object).then(function (data) {
                                            $scope.Latest = [];
                                            if (data.data.Rows.length != 0)
                                                $scope.Latest = data.data.Rows;

                                            //Important
                                            Object = {};
                                            Object.HomeView = true;
                                            $http.post('Handler.ashx?action=ItemsSearch&PageNumber=1&PageSize=1000', Object).then(function (data) {
                                                $scope.Important = [];
                                                if (data.data.Rows.length != 0)
                                                    $scope.Important = data.data.Rows;

                                            //Tags
                                                $http.post('Handler.ashx?action=ItemsSearchTags').then(function (data) {
                                                    $scope.Tags = [];
                                                    $scope.Tags = data.data.Rows;

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
});
