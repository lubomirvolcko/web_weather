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
           
           $.ajax({
                url: urllink,
                data : { format: 'json' },  
            error : function(){
             //vypis chyby ak zlyha komunikacia so serverom
                $('#perror').html("Error! Invalid request!"); 
                $('#mainTable').empty();
           },
            dataType: 'json',
            success : function(data){
                console.log("temp: "+data.main.temp);
                console.log("desc: "+data.weather[0].description);
                
               
                //dynamic table
                $('#mainTable').empty();
                var table=$('<table id="info" class="table table-striped"/>');
                var tr=getLine('City:', city);
                table.append(tr);
                $('#mainTable').append(table);
                
                var tr=getLine('Country:', $('#code').val());
                table.append(tr);
                
                var tr=getLine('Temperature:', parseFloat(data.main.temp-273.15).toFixed(1)+" ℃");
                table.append(tr);
                
                var tr=getLine('Humidity:', data.main.humidity+" %");
                table.append(tr);
                
                var tr=getLine('Description:', data.weather[0].description);
                table.append(tr);
                
                var tr=getLine('Pressure:', data.main.pressure+' hPa');
                table.append(tr);
                
                if($("#details").is(":checked") == true){
                    var sunrise=data.sys.sunrise;
                    var sunriseTime=new Date(1000*sunrise);
                    hR = sunriseTime.getHours(), // 0-24 format
                    mR = sunriseTime.getMinutes();
                    
                    var sunset=data.sys.sunset;
                    var sunsetTime=new Date(1000*sunset);
                    hS = sunsetTime.getHours(), // 0-24 format
                    mS = sunsetTime.getMinutes();
                    
                    var tr=getLine('Sunrise:', hR+":"+mR);
                    table.append(tr);
                    
                    var tr=getLine('Sunset:', hS+":"+mS);
                    table.append(tr);
                    
                    var tr=getLine('Wind:', data.wind.speed+' m/s');
                    table.append(tr); 
                    
                    var tr=getLine('Min temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Max temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Visibility:', parseFloat(data.visibility/1000).toFixed(2)+" km");
                    table.append(tr);
                    
                    var tr=getLine("Link on Google Maps: ","<A href=\"https://www.google.com/maps/search/?api=1&query="+data.coord.lat+","+data.coord.lon+"\" target=\"_blank\" style=\"color:yellow;\">"+city+"</A>");
                    table.append(tr);
                };
                
            },
            type: 'GET'
           }); //AJAX
           
       } //if city.length riadok 5
       
   }); // CLICK
    
    function getLine(data1,data2){
        var tr=$('<tr id="tr"/>');
        var td1=$('<td id="td1"/>');
        $(td1).append(data1);
        var td2=$('<td id="td2"/>');
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2); 
        
        return tr;
    };
    
}); // READY