//get nomPom
$(document).ready(()=>{
    $('#recipe').on('change',()=>{
        var fruit = $('#recipe').val();
        console.log(fruit);
        choose(fruit);
    });
})
//get data
function getDefaultRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultRecipe(data),
        error: () => getError(),
    });
}

function defaultRecipe(myData) {
    var result = "";
    myData.recipes.forEach( recipe => {
        defaultIngredient(recipe.ingredients);
        result += `
            <tr>
                <td><img src="${recipe.iconUrl}" width="100"></td>
                <td>${recipe.name}</td>
                <td>${recipe.nbGuests}</td>
            </tr>
        `;
    });
    printData("recipe",result);
}
//get data from url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
var choose = (data)=>{
    switch (parseInt(data)){
        case 1:
            NomPom();
            break;
        case 2:
            chocolateCake();
            break;
        case 3 :
            avocadoShake();
            break;
    }
}

//get NomPom
var NomPom=(nom)=>{
    var nomPom =  "";
    nom.recipes.forEach(element => {
        nomPom = `
            ${element.name}
        `;
    });
    printData(nomPom);
}


//get chocolateCake

var chocolateCake= ()=>{
    var chocolate = "chocolateCake";
    printData(chocolate);
}

//get avocadoShake

var avocadoShake = () =>{
    var toekKalok = "avocadoShake";
    printData(toekKalok);
}

//Print out to HTML

var printData = (out) =>{
    $('#result').html(out);
}