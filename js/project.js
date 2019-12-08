
$(document).ready(function () {
    $('#recipe').on('change', () => {
        var dataRecipe = $('#recipe').val();
        choose(dataRecipe);
    })
})

function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
var choose = (menu) => {
    switch (parseInt(menu)) {

        case 1:
                getToekKaLok();
            break;
        case 2:
                getAvocado();
            break;

    }
}

//function get data Toek kalok
var getToekKaLok = () => {
    
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: function (datas) {
            var result = "";
            datas.recipes.forEach(element => {
                if (element.id == 1) {
                    result += `
                        <img src="${element.iconUrl}" width="100">
                `;
                }

            });
            $('#image').html(result);
            var resultes = "";
            datas.recipes.forEach(elements => {
                elements.ingredients.forEach(el => {
                    if (elements.id == 1) {
                        resultes += `
                          <tr>
                            <td><img src="${el.iconUrl}" width="50"></td>
                            <td>${el.quantity}</td>
                            <td>${el.unit[0]}</td>
                            <td>${el.name}</td>
                          </tr>
                    `;
                    }
                })
            });
            $('#result').html(resultes);
        }
    })
}
// function get avocado
var getAvocado = () => {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: function (datases) {
            var archive = "";
            datases.recipes.forEach(items => {
                if (items.id == 0) {
                    archive += `
                    
                    <div class="row">
                    <h1>${items.name}</h1>
                    <img src="${items.iconUrl}" width="100" margin-right: "100px;">
                   
                    </div>
                `;
                }

            });
            $('#image').html(archive);
            var getValue = "";
            datases.recipes.forEach(item => {
                item.ingredients.forEach(el => {
                    if (item.id == 0) {
                        getValue += `
                          <tr>
                            <td><img src="${el.iconUrl}" width="50"></td>
                            <td>${el.quantity}</td>
                            <td>${el.unit[0]}</td>
                            <td>${el.name}</td>
                          </tr>
                    `;
                    }
                })
            });
            $('#result').html(getValue);
        }
    })
}
$(document).ready(function () {
    $('#add').on('click', function () {
        var adds = $('#inputMenu').val();
        addPerson(adds);
    });
    //  Decrease number in input
    $('#decrease').on('click', function () {
        var decreases = $('#inputMenu').val();
        decreasePerson(decreases);
    })
})
// funtion of  increase number in input
function addPerson(add) {
    var sum = parseInt(add) + 1;
    if (sum <= 15) {
        $('#inputMenu').val(sum);
        addMulti(sum);
    }
}
// function of  Decrease number in input
function decreasePerson(decreas) {

    var decreasese = parseInt(decreas) - 1;
    if (decreasese >= 0) {
        $('#inputMenu').val(decreasese);
        addMulti(decreasese);

    }
}
// function of multi data
function addMulti(multi) {
    var compute = multi * 5;
    $('#results').html(compute);
}