function getAllStudents() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/students',
        dataType: "json",
        success: function(data) {
            console.log(data);
            var htmlString = "<ul>";
            $.each(data, function(index, item) {
                var temp = "\"" + item._id + "\"";
                htmlString += "<li> Code: " + item.code + ", Name: " + item.name + ", Score: " + item.score + "  | <a href='#' onClick = 'showStudentsInfo(" + temp + ");'>Edit</a> | <a href='#' onClick = 'deleteStudents(" + temp + ");'>Delete</a> | </li>";
            })
            htmlString += "</ul>";
            $("#student-list").html(htmlString);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ');
        }
    });
}

function addStudents() {
    var sdata = {};
    sdata.code = addstu.scode.value;
    sdata.name = addstu.sname.value;
    sdata.score = addstu.sscore.value;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/students/add',
        data: JSON.stringify(sdata),
        contentType: 'application/json',
        success: function(data) {
            var htmlString = "";
            var temp = "\"" + data._id + "\"";
            htmlString += "<li> Code: " + data.code + ", Name: " + data.name + ", Score: " + data.score + "  | <a href='#' onClick = 'showStudentsInfo(" + temp + ");'>Edit</a> | <a href='#' onClick = 'deleteStudents(" + temp + ");'>Delete</a> | </li>";
            $("#student-list ul").append(htmlString);
            //document.getElementById("list-all").click();
        },
        error: function() {
            console.log('Error: ');
        }
    });
}


function deleteStudents(sid) {
    var r = confirm("Do you want to delete this student?");
    if (r == true) {
        var urll = 'http://localhost:3000/api/students/delete/' + sid;
        $.ajax({
            type: 'DELETE',
            url: urll,
            success: function(data) {
                document.getElementById("list-all").click();
            },
            error: function() {
                console.log('Error: ');
            }
        });
    } else {

    }
}


function showStudentsInfo(sid) {
    var urll = 'http://localhost:3000/api/students/show/' + sid;
    $.ajax({
        type: 'GET',
        url: urll,
        dataType: "json",
        success: function(data) {
            console.log(data);
            $("#scode2").val(data.code);
            $("#sname2").val(data.name);
            $("#sscore2").val(data.score);
            $("#sid").val(data._id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ');
        }
    });
}

function editStudents() {
    var sdata = {};
    sdata.code = editstu.scode2.value;
    sdata.name = editstu.sname2.value;
    sdata.score = editstu.sscore2.value;
    var urll = 'http://localhost:3000/api/students/edit/' + editstu.sid.value;
    $.ajax({
        type: 'PUT',
        url: urll,
        data: JSON.stringify(sdata),
        contentType: 'application/json',
        success: function(data) {
            document.getElementById("list-all").click();
        },
        error: function() {
            console.log('Error: ');
        }
    });
}