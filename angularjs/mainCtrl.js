app.controller('mainCtrl', function($scope, mainser, $localStorage, $location) {
  
   // $('#loginmodal').modal({backdrop: 'static',})  
   // $('#loginModal').modal('show');

   if ($localStorage.uID === null ||  $localStorage.uID === undefined) {
   return $('#loginModal').modal({
       backdrop: 'static',
       keyboard: false
     });
    }

   $scope.login=()=>{
    const { user, pass } = $scope
    if (user === null || user === undefined &&
     pass === null || pass === undefined){
       alert('Email is unvalid unable to access')
       $scope.user = ''
       $scope.pass = ''
    } else {
      
      var data = {
       email: user,
       password: pass
    }
    mainser.login(data).then(response => {
      
      const data = response.data;
      if (data.userExist) {
       $('#loginModal').modal('hide');
             const unId = mainser.generate_token(16)
             $localStorage.uID = unId
              $scope.user = ''
              $scope.pass = ''
              return;
          }
            $scope.user = ''
             $scope.pass = ''
             return alert('Wrong credinations, unable to signin')
    })
    }
 }
   $scope.servicebool = true;
   $scope.projectbool = false;
   $scope.changeRoute=(dedicide)=>{
     switch(dedicide) {
       case 'service':
          $scope.servicebool = true;
          $scope.projectbool = false;
          $location.path('/')
       break;
       case 'project':
          $scope.servicebool = false;
          $scope.projectbool = true;
          $location.path('project')
       break;
     }

   }
   
  getAllservices()
   
    $scope.showModal=(which)=>{
      switch(which){
        case 'addservice':
            $('#addservice').modal();
            break;
      }
    }
    $scope.addservice=()=>{
      const { title, description } = $scope
      if (title === null || title === undefined &&
        description === null || description === undefined){
         $scope.title = ''
         $scope.description = ''
        return alert('Please Input Some Data')
      }
      var data = {
        title,
        description,
        imageName: null
      }
      mainser.addservice(data).then(response => {
       getAllservices()
        $scope.title = null
        $scope.description = null
        // $scope.imageName = null
        $('#addservice').modal('hide');
      })
   }
   function getAllservices() {
    if (!$scope.servicebool) return;
    mainser.getservices().then(response => {
      console.log(response)
      $scope.data = response.data
      // console.log($scope.data.data[0].imageName)
    })
   }
   $scope.render = function(id) {
    $scope.id = id
    $( "#file" ).click();
    var input = document.querySelector('input[type=file]');
        input.onchange = function () {
      const file = input.files[0],
        reader = new FileReader();
        if (file === undefined) return;
      reader.onloadend = function () {
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        console.log(b64);
        $scope.arrFun($scope.id, b64)
      };
      reader.readAsDataURL(file);
    };
}
$scope.arrFun=(id, imageData)=>{
  mainser.uploadImage(id, imageData).then(response => {
    console.log(response)
    
    $scope.id = null
    getAllservices()
    // $scope.$apply();
    
  })
}
});