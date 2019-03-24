angular.
  module('main').
  component('mainPage', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'app/main/main-page.html',
    controller: function MainPageController($scope, $http, $q) {

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
  
      // Create a storage reference from our storage service
      var storageRef = storage.ref();
  
      // Controller Variables.
      $scope.quilts = [];
      
      // Data collection with all the images.
      var quiltsDatabase = [];
  
      // initializes the view, loading up all the necessary data.
    //   (function initialize() {
          
          var promises = [];
          
          // promises.push(storageRef.child("images/2017/quilts/quilts.json").getDownloadURL());
          // promises.push(storageRef.child("images/2017oi/quilts/quilts.json").getDownloadURL());
          // promises.push(storageRef.child("images/2018pv/quilts/quilts.json").getDownloadURL());
          
         // TODO: Use storage to keep quilts

        //   promises.push($http.get("images/2017/quilts.json"));
        //   promises.push($http.get("images/2017oi/quilts.json"));
        //   promises.push($http.get("images/2018pv/quilts.json"));
          promises.push($http.get("images/2019pv/quilts.json"));
          
        //   $q.all(promises).then(function (downloadUrls) {
              
              // TODO: Replace files with storage. 
              // CORS problem.
              
              // downloadUrls.forEach(quiltJsonUrl => {
                  //     $http.get(quiltJsonUrl).then(function (quiltJson) {
                      
                      // });
                      // });
                      
          $q.all(promises).then(function (quiltJsons) {
              quiltJsons.forEach(quiltJson => {
              
                  var quilts = quiltJson.data;
  
                  quiltsDatabase.push.apply(quiltsDatabase, quilts);
  
                  quilts.forEach(quilt => {
                      // Get firebase image URL.
                      storageRef.child(quilt.src).getDownloadURL().then(function (firebaseUrl) {
                          quilt.src = firebaseUrl;
                      }, function (error) {
                          console.error(error);
                      })
                  });
              });
          // });
  
              $scope.quilts.length = 0;
  
              // Group data in arrays of two.
              for(var i = 0; i < quiltsDatabase.length; i++) {
  
                  var quilt = quiltsDatabase[i];
                  
                  quilt['isLoading'] = true;

                  quilt['index'] = i + 1;
  
                  if (i%2 === 0) {
                      $scope.quilts.push([quilt]);
                  } else {
                      $scope.quilts[Math.floor(i/2)].push(quilt);
                  }
              }
          });
    //   })();
  
      $scope.thumbnailClick = function(clickedIndex) {
  
          var pswpElement = document.querySelectorAll('.pswp')[0],
                  gallery,
                  options;
                              
          // define options (if needed)
          options = {
              // optionName: 'option value'
              // for example:
              index: clickedIndex - 1, // start at first slide
              openZoomed: true,
              history: false
          };
  
  
          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, quiltsDatabase, options);
          gallery.init();
          
      };

      $scope.hideLoading = function(quilt) {
        quilt["isLoading"] = false;
        // console.log("Image loaded!");
      };
    }
});