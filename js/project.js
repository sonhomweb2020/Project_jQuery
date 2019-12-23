// function getUrl
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$('#card1').hide();
$('#card2').hide();
$('#members').hide();
$(document).ready(function () {
    requesApi();
    $('#recipe').on('change', () => {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
        $('#members').show();
        $('#card1').show();
        $('#card2').show();
    });
    $('#decrease').on('click', function () {
        decrease();
        var guest = $('#inputMenu').val();
        var recipe = $('#recipe').val();
         updateRecipe(recipe,guest);
      });
    
      $('#add').on('click', function () {
        increase();
        var guest = $('#inputMenu').val();
        var recipe = $('#recipe').val();
         updateRecipe(recipe,guest);
      });

})

//reques api
function requesApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log('cannot get data'),
    })
}

var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `
            <option value ="${element.id}">${element.name}</option>
        `;

    });
    $('#recipe').append(option);
}
var newIngredient = [];
var oldnbGuests = "";
//get recipe and call function
function getRecipe(recipeId) {
    allData.forEach(item => {
        if (item.id == recipeId) {
            //functon show name and iconUrl
            showrecipe(item.name, item.iconUrl);
            //function ingreadient
            showIngredient(item.ingredients);
            //function cut step
            cutStep(item.instructions);
            //new ingredients
            $('#inputMenu').val(item.nbGuests);
            guestold = $('#inputMenu').val();
        }
    })
}
//function updateRecipe new
function updateRecipe(recipeId,member){
    allData.forEach(item =>{
        if(item.id == recipeId){  
            showrecipe(item.name,item.iconUrl);
            updateIngredient(item.ingredients,member);
            cutStep(item.instructions);
            $('#inputMenu').val(member);
        }  
    });
  }
//get name and iconUrl
function showrecipe(name, image) {
    var result = "";
    result = `
    <div class="col-2"></div>
        <div class="col-4">
            <div class="card" id="getname">
                <h1>${name}</h1>
            </div>
        </div>
     <div class="col-4 ">
            <img src="${image}" width="150" class="img-fluid img-thumbnail">
        </div>
    <div class="col-2"></div>
    `;
    $('#recipe-result').html(result);
}

// function cut step
function cutStep(step) {
    var cute = "";
    var steps = step.split('<step>');
    for (let i = 1; i < steps.length; i++) {
        var contruction = `
            <h4>Instructions</h4>
        `;
        cute += `
            <li class="list-group-item text-primary" style="border:none;font-weight:600;font-size:20px;">
            Step ${i}:
            </li>
           <li class="list-group-item" style="border:none;">${steps[i]}</li>
        `;
    }
    $('#con').html(contruction);
    $('#cut-step').html(cute);
}

//function show ingredient intable
function showIngredient(img) {
    var results = "";
    var ingredient = `
        <h4>Ingredients</h4>
    `;
    img.forEach(el => {
        results += `
                <tr>
                    <td><img src="${el.iconUrl}" width="100"></td>
                    <td>${el.quantity}</td>
                    <td>${el.unit[0]}</td>
                    <td>${el.name}</td>
                </tr>
            `;
    });
    $('#ingredients').html(ingredient);
    $('#result-ingredient').html(results);
}

//function increase member
function increase() {
    var member = $('#inputMenu').val();
    var guest = parseInt(member) + 1;
    if (guest <= 15) {
        $('#inputMenu').val(guest);
    }
  
  }

//function decrease member
function decrease() {
    var member = $('#inputMenu').val();
    var guest = parseInt(member) - 1;
    if (guest >= 0) {
        $('#inputMenu').val(guest);
    }
  }

//   function update data form ingredient
  function updateIngredient (ing,guest) {
    var ingredient = "";
    ing.forEach(element => {
       var {quantity,iconUrl,name,unit} = element;
       var add = quantity * parseInt(guest)/ guestold;
       ingredient += `
       <tr>
           <td><img src = "${iconUrl}" width = "80px"></td>
           <td><span >${add }</span></td>
           <td >${unit[0]}</td>
           <td >${name}</td>
       </tr>
     `;
    })
    $('#result-ingredient').html(ingredient);
  } 








