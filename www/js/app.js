// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'chart.js'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})








.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.search', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html',

    }
  }
})

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller:'MyContr'

      }


    }
  })



  .state('app.browse', {
      url: '/training',
      views: {
        'menuContent': {
          templateUrl: 'templates/training.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
.state('app.food', {
    url: '/food',
    views: {
      'menuContent': {
        templateUrl: 'templates/food.html',
      }
    }
  })
.state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller:'Chat'
      }

    }
  })
.state('app.profile', {
    url: '/profile',
    data: {
       authorization: true,
       redirectTo: 'login'
     },
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',

      }
    }
  })
.state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
      }
    }
  })
.state('app.progress', {
    url: '/progress',
    views: {
      'menuContent': {
        templateUrl: 'templates/progress.html',
      }
    }
  })
.state('app.trainin', {
    url: '/trainin',
    views: {
      'menuContent': {
        templateUrl: 'templates/trainin.html',
      }
    }
  })
.state('app.single_tr', {
    url: '/single_tr',
    views: {
      'menuContent': {
        templateUrl: 'templates/single_tr.html',
      }
    }
  })
.state('app.load', {
    url: '/load',
    views: {
      'menuContent': {
        templateUrl: 'templates/load.html',
      }
    }
  })
.state('app.days', {
    url: '/days',
    views: {
      'menuContent': {
        templateUrl: 'templates/days.html',
      }
    }
  })
.state('app.single_news', {
    url: '/single_news',
    views: {
      'menuContent': {
        templateUrl: 'templates/single_news.html',
      }
    }
  })


.state('app.prog_sett', {
    url: '/prog_sett',
    views: {
      'menuContent': {
        templateUrl: 'templates/prog_sett.html',
      }
    }
  });
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.login");
  });
// if none of the above states are matched, use this as the fallback
})





.controller('MyContr', function($scope, $http, $window, $location,$state,$rootScope,$ionicLoading) {
  var store;
localStorage.clear();
var url = "http://sychugo8.bget.ru/api/v1/";


    $scope.getData = function() {
     $http.get(url+"token", { params: { "key1": "value1","key2": "value2"} })
          .success(function(data) {
            $scope.mydata = data._token;
            $http.post(url+"auth", {_token:$scope.mydata ,email : $scope.data.email,password: $scope.data.password})
            .success(function(data, status){
              window.localStorage['api'] = angular.toJson(data.api_token);

              $rootScope.getapi = data.api_token;


              if(data.api_token!=0){

                $state.go("app.profile");
}
          else{

                $state.go('app.login');
              }




              $http({
                url: url+"user/info",
                method: "GET",
                params: {api_token: $rootScope.getapi}

 }).success(function(data){
   $rootScope.email = data.user.email;

   $rootScope.name = data.user.fullname;
   $rootScope.update = data.user.updated_at;
$rootScope.infor = data.user.id;
$rootScope.cname = data.coach.fullname;

   window.localStorage['infa'] = angular.toJson(data);



 })
            })
            .error(function(data) {
                $window.alert("Не верные данные");
                $window.location.reload();

            })

          })
          .error(function(data) {
              alert("ERROR");
          })









  }
  $scope.infa = window.localStorage['infa'];

  if($rootScope.getapi ==null){
  $state.go('app.login');

}
else{
  $state.go('app.profile');
}






})







.directive('input', function($timeout) {

  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&',


    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})









.controller('Chat',function($scope,$http,$rootScope,$timeout,$ionicScrollDelegate){
  var url = "http://sychugo8.bget.ru/api/v1/chat";
  $scope.api = window.localStorage['api'];
$scope.getmessage = function() {
  $http({
    url: url,
    method: 'GET',
    params:{api_token:$rootScope.getapi}



})
$http.post(url,{api_token:$rootScope.getapi, message:$scope.data.message})
}



$scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];


})













.directive("test", function(){
    return {
        link: function(scope, element){
            element.html('<button ng-click="getmessage()"  class="send_button"><img src="img/send.png"></button>');
        }
    };
})


.directive("test", function($compile){
    return{
        link: function(scope, element){
            var template = `<div class="row msg">
                  <div class="msg_block">
                    <span>{{message.text}}</span><br>
                    <span class="msg_time">Jun 9, 10:20</span>
                  </div>
                  <div class="avatar">
                      <img src="img/pic.png" class="mnu_avatar">
                  </div>
              </div>`;
            var linkFn = $compile(template);
            var content = linkFn(scope);
            element.append(content);
        }
    }
})



.directive("test", function($compile) {

    var template = `<div class="row msg">
          <div class="msg_block">
            <span>{{chat}}</span><br>
            <span class="msg_time">Jun 9, 10:20</span>
          </div>
          <div class="avatar">
              <img src="img/pic.png" class="mnu_avatar">
          </div>
      </div>`;

    return{
        link: function(scope, element){
            element.on("click", function() {
                scope.$apply(function() {
                    var content = $compile(template)(scope);
                    element.append(content);
               })
            });
        }
    }
})














.controller('MediaCtrl', function($scope, $ionicModal) {
	$scope.allImages = [{
		'src' : '/img/tren_pic_2.png'
	}];

	$scope.showImages = function(index) {
		$scope.activeSlide = index;
		$scope.showModal('templates/image-popover.html');
	}
	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};
})

.controller("ExampleController", function($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ]

})
