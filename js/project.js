function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
    requesApi();
    $('#recipe').on('change',()=>{
        var recipes = $('#recipe').val();
        getRecipe(recipes);
        // choose(recipes);
    })
})
function requesApi(){
    $.ajax({
        dataType:'json',
        url:getUrl(),
        success:(data)=>chooseRecipe(data.recipes),
        error:()=>console.log('cannot get data'),
    })
}
var allData =[];

function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option +=`
            <option value ="${element.id}">${element.name}</option>
        `;

    });
    $('#recipe').append(option);
}
//get id
function getRecipe(recipeId){
   allData.forEach(item =>{
      if(item.id ==recipeId){
          //functon show name and iconUrl
         showrecipe(item.name,item.iconUrl);
         //function ingreadient
         showIngredient(item.ingredients);
         // function cut step
         cuteStep(item.instructions);

      }
   })
}
//get name and iconUrl
function showrecipe(name ,image){
    var result ="";
    result = `
    <div class="col-2"></div>
     <div class="col-4">
            <h1>${name}</h1>
        </div>
     <div class="col-4">
            <img src="${image}" width="150">
        </div>
    <div class="col-2"></div>
    `;
    $('#recipe-result').html(result);
}

// function cut step
function cuteStep(step){
    var cute = "";
    var steps = step.split('<step>');
    for( let i=1 ; i<steps.length;i++){
        var contruction = `
            <h4>Instructions</h4>
        `;
        cute +=`
            Step ${i} :
           <li class="list-group-item" style="border:none;">${steps[i]}</li>
        `;
    }
    $('#con').html(contruction);
    $('#cut-step').html(cute);
} 
function showIngredient(img){
    var results = "";
    var ingredient = `
        <h4>Ingredients</h4>
    `;
    img.forEach(el=>{
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