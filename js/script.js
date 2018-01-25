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
                
           },
            dataType: 'json',
            success : function(data){
                console.log("temp: "+data.main.temp);
                console.log("desc: "+data.weather[0].description);
                
                //dynamic table
                $('#mainTable').empty();
                var table=$('<table/>');
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
                    
                    
                    var tr=getLine('Sunrise:', data.sys.sunrise);
                    table.append(tr);
                    
                    var tr=getLine('Sunset:', data.sys.sunset);
                    table.append(tr);
                    
                    var tr=getLine('Wind:', data.wind.speed+' m/s');
                    table.append(tr); 
                    
                    var tr=getLine('Min temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Max temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Min temperature:', data.visibility);
                    table.append(tr);
                };
                
            },
            type: 'GET'
           }); //AJAX
           
       } //if city.length riadok 5
       
   }); // CLICK
    
    function getLine(data1,data2){
        var tr=$('<tr/>');
        var td1=$('<td/>');
        $(td1).append(data1);
        var td2=$('<td/>');
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2); 
        
        return tr;
    };
    
}); // READY