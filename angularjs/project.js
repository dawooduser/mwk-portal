app.controller('project', function($compile, $scope, mainser, $localStorage) {
    $scope.createProject=()=>{
        $('#modal-image').modal('toggle');
    }
    let arr = []
    let projectThumbNail = {}
    let err = []
    
    function previewImages() {
        
          var $preview = $('#preview').empty();
          if (this.files) $.each(this.files, readAndPreview);
        
          function readAndPreview(i, file) {
              var id = i
            
            if (!/\.(jpe?g|png|gif)$/i.test(file.name)){
              return alert(file.name +" is not an image");
            } // else...
            
            var reader = new FileReader();
        
            $(reader).on("load", function() {
              // $preview.append($('<img />', {src:this.result, height:100, id: i } ));
              // var imgTAg = $('<img ng-click="click()"/>', {src:this.result, height:100, id: i})
              var img = document.createElement('img');
              img.src = this.result;
              img.height = "100";
              img.id = i
              img.class = 'taha'
              img.onclick = (function (url) {
                return function () {
                    doSomething(url);
                };
            })(i);
            $preview.append(img)
              //Let's say you have element with id 'foo' in which you want to create a button
              // angular.element(document.getElementById('preview')).append(temp);
        });
            reader.onloadend = function () {
                var b64 = reader.result.replace(/^data:.+;base64,/, '');
                console.log(b64);
                arr.push(b64)
            }
            reader.readAsDataURL(file);
            function doSomething(url){
              console.log(url);
              debugger
              $('img').css('border-radius', '0%');
              var id = `#${url}`
              debugger
              $(id).css('border-radius', '50%');
              arr.forEach((v, k) => {
                console.log(v)
                if (k === url) {
                  const data = arr[k]
                  projectThumbNail.headerImage= data
                } else {
                  err.push(v)
                  projectThumbNail.image = err
                }
              })
          }
          }
         
        }
        
        $('#multi-images-selector').on("change", previewImages);
        // function click(id) {
        //   console.log(id)
        //   debugger
        // }
})