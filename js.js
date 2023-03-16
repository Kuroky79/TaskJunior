// Замените на свой API-ключ
var token = "2f4f572738706ddfaf861ecee5b897c21f55a1eb";

function join(arr /*, separator */) {
    var separator = arguments.length > 1 ? arguments[1] : ", ";
    return arr.filter(function(n){return n}).join(separator);
}

function typeDescription(type) {
    var TYPES = {
        'INDIVIDUAL': 'Индивидуальный предприниматель',
        'LEGAL': 'Организация'
    }
    return TYPES[type];
}

function showSuggestion(suggestion) {
    console.log(suggestion);
    var data = suggestion.data;
    if (!data)
        return;

    $("#type").text(
        typeDescription(data.type) + " (" + data.type + ")"
    );



    $("#inn_kpp").val(join([data.inn, data.kpp], " / "));

    if (data.address ) {
        var address = "";
        if (data.address.data.qc == "0") {
            address = join([data.address.data.postal_code, data.address.value]);
        } else {
            address = data.address.data.source;
        }
        $("#address").val(address);
        $("#inn").val(data.inn);
        $("#name_short").val(data.name.short_with_opf );
        $("#name_full").val(data.name.full_with_opf );
    }
}
$(document).ready(function (){
    $(".party").suggestions({
        token: token,
        type: "PARTY",
        count: 5,
        onSelect: showSuggestion
    });
    $(".inn").suggestions({
        token: "2f4f572738706ddfaf861ecee5b897c21f55a1eb",
        type: "BANK",
        onSelect: showSuggestion
    });
});
