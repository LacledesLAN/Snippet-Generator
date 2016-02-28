

$().ready(function () {
	//Populate csgo-arms
	for (map in workshop.csgo.arms.maplist) {
			$('select.csgo-arms-maps')
				.append($("<option></option>")
				.attr("value", workshop.csgo.arms.maplist[map].id)
				.text(map));
	}

	//Populate csgo-classic
	for (map in workshop.csgo.classic.maplist) {
			$('select.csgo-classic-maps')
				.append($("<option></option>")
				.attr("value", workshop.csgo.classic.maplist[map].id)
				.text(map));
	}

	//Generate a default password
	$('#tab-password #generatePassword').html('<strong>' + prettyPrintArray(generatePasswordArray()) + '</strong>');
});