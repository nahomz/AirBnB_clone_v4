

$(document).ready(function () {
    const amenities = {};
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

    $('button').click(function () {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            headers: {'Content-Type':'application/json'},
            dataType: 'json',
            success: function (data) {
                const containerDiv = document.geteElementByClass('title_box');
                const placeDivs = containerDiv.getElementByTagName('DIV');
                for (let i = 0; i < placeDivs.length; i++) {
                    place = '<article><div><h2>' + `${data[i].name}` + '</h2><div>$' + `${data[i].price_by_night}` + '</div></div><div><div>' + `${data[i].max_guest}` + '</div><div>' + `${data[i].number_rooms}` + '</div><div>' + `${data[i].number_bathrooms}` + '</div></div><div>' + `${data[i].description}` + '</div></article>'
                }
                $('section.places').append('place');
            }
        });
    });

    $.get('http://127.0.0.1:5001/api/v1/status', function (data, status, xhr) {
        if (xhr.status === 200) {
            $('DIV#api_status').addClass('available')
        }
        else {
            $('DIV#api_status').removeClass('available')
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:5001/api/v1/places_search',
        type: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({}),
        success: function (res) {
            for (const r of res) {
                const article = ['<article>',
                    '<div class="title_box">',
                    `<h2>${r.name}</h2>`,
                    `<div class="price_by_night">$${r.price_by_night}</div>`,
                    '</div>',
                    '<div class="information">',
                    `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
                    `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
                    `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
                    '</div>',
                    '<div class="description">',
                    `${r.description}`,
                    '</div>',
                    '</article>'];
                $('SECTION.places').append(article.join(''));
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
});
