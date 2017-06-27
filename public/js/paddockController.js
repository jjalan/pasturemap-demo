app.controller('paddockController',['$scope',function($scope){
  
  var id=0;
  $scope.coordinates=[];
  $scope.paddockArea=0;
  
  // This function allows user to add a new coordinate
  $scope.add=function(){
    // add to the list
    if(!isNaN($scope.x) && !isNaN($scope.y)){
      $scope.coordinates.push({x:$scope.x,y:$scope.y,id:id++});
      delete $scope.x;
      delete $scope.y;
      
      reDrawMap();
      calculatePaddockArea();
    }
  }
  
  // This function allows user to delete an existing coordinate
  $scope.delete=function(coordinate){

    var deleteIndex = -1;
    for(var i=0;i<$scope.coordinates.length;i++){
      if($scope.coordinates[i].id==coordinate.id){
        deleteIndex=i;
        break;
      }
    }
    
    if(deleteIndex!==-1){
      $scope.coordinates.splice(deleteIndex, 1);
      reDrawMap();
      calculatePaddockArea();
    }
  }
  
  // This function allows user to save the paddock area as an image
  $scope.save=function(){
    window.open(getCanvasDOMElement().toDataURL('image/png'));
  }
  
  // Internal utility functions to visualize the area as well as calcualate the area
  function reDrawMap(){
    var canvas = getCanvasDOMElement();
    resizeCanvasToDisplaySize(canvas);
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#8AFF6D';
    
    if($scope.coordinates.length>0){
      var initialCoordinate = $scope.coordinates[0];
      
      context.beginPath();
      context.moveTo(initialCoordinate.x, canvas.height-initialCoordinate.y); // subtract height from ycoordinate as y axis is upside down
      
      if($scope.coordinates.length>1){
        for(var i=1;i<$scope.coordinates.length;i++){
          context.lineTo($scope.coordinates[i].x, canvas.height-$scope.coordinates[i].y); // subtract height from ycoordinate as y axis is upside down
        }
      }
      
      context.closePath();
      context.fill();
    }
  }
  function calculatePaddockArea(){
    // reference: http://www.mathopenref.com/coordpolygonarea.html
    $scope.paddockArea=0;
    
    var area=0;
    for(var i=0;i<$scope.coordinates.length;i++){
      
      var firstCoordinateIndex = i;
      var secondCoordinateIndex = i+1;
      
      if(secondCoordinateIndex == $scope.coordinates.length){
        secondCoordinateIndex = 0;
      }
      
      area += ($scope.coordinates[firstCoordinateIndex].x*$scope.coordinates[secondCoordinateIndex].y)-($scope.coordinates[firstCoordinateIndex].y*$scope.coordinates[secondCoordinateIndex].x);
    }
    
    area = area/2;
    if(area <0){
      area = -area; // area can never be negative
    }
    
    $scope.paddockArea = area;
  }
  function resizeCanvasToDisplaySize(canvas) {
     // look up the size the canvas is being displayed
     const width = canvas.clientWidth;
     const height = canvas.clientHeight;

     // If it's resolution does not match change it
     if (canvas.width !== width || canvas.height !== height) {
       canvas.width = width;
       canvas.height = height;
       return true;
     }

     return false;
  }
  function getCanvasDOMElement(){
    return document.getElementById('map');
  }
  
  // Initialize the application with sample example
  initializeWithDemo();
  function initializeWithDemo(){
    $scope.coordinates.push({x:200,y:280,id:id++});
    $scope.coordinates.push({x:310,y:120,id:id++});
    $scope.coordinates.push({x:240,y:50,id:id++});
    $scope.coordinates.push({x:135,y:90,id:id++});
  
    reDrawMap();
    calculatePaddockArea();
  }
}]);