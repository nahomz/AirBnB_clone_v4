

$(document).ready(function () {
    const amenities ={};
    $("DIV.amenities input[type='checkbox']").change(function () {
        const isChecked = $(this).prop('checked');
        const name = $(this).data().name;
        const id = $(this).data().id;

        if (isChecked) {
            amenities[name] = id;
        } else {
            delete amenities[name];
        }

        const names = Object.keys(amenities);
        $('DIV.amenities>h4').text(names.sort().join(', '))
    });

    $.get('http://127.0.0.1:5001/api/v1/status', function (data, status, xhr) {
        if (xhr.status === 200)
        {
            $('DIV#api_status').addClass('available')
        }
        else
        {
            $('DIV#api_status').removeClass('available')
        }
    });
});
