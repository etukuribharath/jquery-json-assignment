$("form").submit(function(e){ //calling the function on click of submit button
    e.preventDefault();  
    console.log($('#input').val());      //preventing the default parameter of the form
    $.ajax({                    //making ajax call
        url: "http://localhost:8080/details?name_like="+$('#input').val(),
        dataType: 'json',

        success: function(data){                //passing the data
            var person=data;          //storing the search arrray in person var
            for(i=0;i<person.length;i++){    //iterating the person

                $("<button></button>",{
                    height:"30px",
                    text:"Delete",
                    class:"btn btn-danger col-lg-1 col-sm-1 col-md-1 col-xs-1 details1 delete",
                }).attr('id', person[i].id).insertAfter(".details");

                $("<button></button>",{
                    height:"30px",
                    text:"Update",
                    class:"btn btn-success col-lg-1 col-sm-1 col-md-1 col-xs-1 details1 update",
                }).insertAfter(".details").attr('id', person[i].id).attr('data-toggle',"modal").attr('data-target',"#myModal1");

                $("<div></div>",{  
                height:"30px",             //writing image tag for the image in movied details
                text:person[i].location,
                class:"col-lg-1 col-sm-1 col-md-1 col-xs-1 details1",
                }).insertAfter(".details");


                $("<div></div>",{               //writing div tag for the type in movied details
                    height:"30px",
                    text:person[i].phone,
                    class:"col-lg-2 col-sm-2 col-md-2 col-xs-2 details1",
                }).insertAfter(".details");

                    $("<div></div>",{           //writing div tag for the imdbid in movied details
                    height:"30px",
                    text:person[i].email,
                    class:"col-lg-3 col-sm-3 col-md-3 col-xs-3 details1",
                }).insertAfter(".details");

                $("<div></div>",{               //writing div tag for the year value in movied details
                    height:"30px",
                    text:person[i].age,
                    class:"col-lg-1 col-sm-1 col-md-1 col-xs-1 details1",
                }).insertAfter(".details");

                $("<div></div>",{               //writing div tag for the image in movied details
                    height:"30px",
                    text:person[i].gender,
                    class:"col-lg-1 col-sm-1 col-md-1 col-xs-1 details1",
                }).insertAfter(".details");

                 $("<div></div>",{               //writing div tag for the image in movied details
                    height:"30px",
                    text:person[i].name,
                    class:"col-lg-2 col-sm-2 col-md-2 col-xs-2 details1",
                }).insertAfter(".details");    
            }                                   //success function closing           
        }
    });
});

$("#add").click(function(e){
       var sendInfo = {
          name: $('#username').val(),
          gender: $('#gender').val(),
          age: +$('#age').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          location: $('#location').val()
       };

       $.ajax({
           type: "POST",
           url: "http://localhost:8080/details",
           dataType: "json",
           success: function (msg) {
               if (msg) {
                   alert("New user has been added to phone book");
                   location.reload(true);
               } else {
                   alert("Cannot add to list !");
               }
           },

           data: sendInfo
       });
});


$("div").delegate(".delete", "click", function() {
    
     var i=+$(this).attr("id");    
     console.log(i);

       $.ajax({
           type: "DELETE",
           url: "http://localhost:8080/details/"+i,
           dataType: "json",
           success: function (msg) {
               if (msg) {
                   alert("Selected user has been deleted from phone book");
                   location.reload(true);
               } else {
                   alert("Cannot delete from list !");
               }
           },
       });
    location.reload();
})

$("div").delegate(".update", "click", function(){

    $.ajax({    
           type: "GET",
           url: "http://localhost:8080/details/48",
           dataType: "json",
           success: function (msg){
            console.log(msg.name);
        var data=msg;
          $('#updateid').val(data.id),
          $('#username1').val(data.name),
          $('#gender1').val(data.gender),
          $('#age1').val(data.age),
          $('#email1').val(data.email),
          $('#phone1').val(data.phone),
          $('#location1').val(data.location)
            },
       });
});


$("#updated").click(function(e){
       var sendInfo = {
          id:$('#updateid').val(),
          name: $('#username1').val(),
          gender: $('#gender1').val(),
          age: +$('#age1').val(),
          email: $('#email1').val(),
          phone: $('#phone1').val(),
          location: $('#location1').val()
       };

       $.ajax({
           type: "PUT",
           url: "http://localhost:8080/details/"+$('#updateid').val(),
           dataType: "json",
           success: function (msg) {
               if (msg) {
                   alert("New user has been added to phone book");
                   location.reload(true);
               } else {
                   alert("Cannot add to list !");
               }
           },

           data: sendInfo
       });
});