console.log("handle form");

var person;

function handleFirstEntry(data) {

    var name = $("input[name=name]").val();
    var link = $("input[name=link]").val();

    person = new userClass(name, 0);
    person.addSocialLink("facebook", link);
    $("#firstEntry").hide();

}