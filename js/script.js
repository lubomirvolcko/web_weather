$(document).ready(function() {
   $('#btnOK').click(function() {
       var city=$("#city").val();
       var code=$("#code").val(); 
       if(city.length>1){
          var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
           urllink=urllink + city;
           if(code.length==2)
               urllink=urllink+','+code;
           urllink=urllink+'&appid=9c61cdd853406f8dd44a104d8ab3e047'
           console.log(urllink);
           
           $.ajax({
                url: urllink,
                data : { format: 'json' },  
            error : function(){
             //vypis chyby ak zlyha komunikacia so serverom  
           },
            dataType: 'json',
            success : function(data){
                console.log("temp: "+data.main.temp);
                console.log("desc: "+data.weather[0].description);
            },
            type: 'GET'
           
           }); //AJAX
       } //if city.length riadok 5
   }); // CLICK
    
    
}); // READY