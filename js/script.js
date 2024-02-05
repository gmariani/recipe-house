//http://berniecode.com/writing/animator.html
var result_returned = 'no';
var result = 0;
var displayAmount = 9;
var viewBegin = 0;
var viewEnd;
var viewID;

////////////
// GLOBAL //
////////////
/* Single Recipe Object */
function singleRecipe() {
	this.title = '';
	this.category = '';
	this.method = '';
	this.instruction = '';
	this.time = '';
	this.serving = '';
	this.ingredients = new Array();
}

/* Single Ingredient Object */
function singleIngredient() {
	this.amount = '';
	this.prepared = '';
	this.title = '';
}

/* Manage Recipes Class */
function manageRecipes() {
	this.arrRecipe = new Array();
	this.arrDisplay = new Array();
	this.getByAttribute = getByAttribute;
	this.sortList = sortList;
}

function getByAttribute(attribute) {
	//
}

function sortList(dir) {
	if(dir < 0) {
		// sort a-z
	} else {
		// sort z-a
	}
}
/* End Manage Recipes Class */

/* On Load */
function onLoad(mode) {
	display('About', 0);
	switch(mode) {
		case 'index':
			initIndex();
			break;
		case 'add':
			initAdd();
			break;
		case 'view':
			initView();
			break;
		default :
			//
			break;
	}
}

///////////
// Index //
///////////
function initIndex() {
	display('View', 0);
	display('Add', 0);
	mainImage_alpha = new Animator({transition: Animator.makeEaseIn(3), duration: 1500});
	mainImage_alpha.addSubject(new NumericalStyleSubject($('mainImage'), 'opacity', 0, 100));
	mainImage_alpha.toggle();
}

/////////
// Add //
/////////
function initAdd() {
	$('addPart1').style.display = "block";
}

function addBackStep() {
	if($('addPart2').style.display == "block") {
		$('addPart2').style.display = "none";
		$('addPart1').style.display = "block";
	}
	if($('addPart3').style.display == "block") {
		$('addPart3').style.display = "none";
		$('addPart2').style.display = "block";
	}
	checkStep();
}

function addNextStep() {
	if($('addPart2').style.display == "block") {
		$('addPart2').style.display = "none";
		$('addPart3').style.display = "block";
	}
	if($('addPart1').style.display == "block") {
		$('addPart1').style.display = "none";
		$('addPart2').style.display = "block";
	}
	checkStep();
}

function checkStep() {
	$('addStepTitle').innerHTML = '';
	if($('addPart1').style.display == "block") {
		$('addBack').className =  'linkDisabled';
		$('addNext').className =  'link';
		$('addSubmit').className =  'linkDisabled';
		$('addStepNum').innerHTML = "1";
		$('addStepTitle').innerHTML = 'Enter Recipe Info';
	}
	if($('addPart2').style.display == "block") {
		$('addBack').className =  'link';
		$('addNext').className =  'link';
		$('addSubmit').className =  'linkDisabled';
		$('addStepNum').innerHTML = "2";
		$('addStepTitle').innerHTML = 'Enter Instructions';
	}
	if($('addPart3').style.display == "block") {
		$('addBack').className =  'link';
		$('addNext').className =  'linkDisabled';
		$('addSubmit').className =  'link';
		$('addStepNum').innerHTML = "3";
		$('addStepTitle').innerHTML = 'Add Ingredients - Example: 1 cup, Diced, Celery';
	}
}

function saveRecipe() {
	// Show Loading
	//$('load_overlay').style.height = $('addForm').style.height;
	$('load_overlay').style.display = "block";
	$('addMessage').innerHTML = '';

	var url = 'ajaxRequest.php';
	var pars = "recipeName=" + $F('recipeName');
	pars += "&recipeCat=" + $F('recipeCat');
	pars += "&recipeMethod=" + $F('recipeMethod');
	pars += "&recipeInst=" + $F('recipeInst');
	pars += '&recipeTime=' + $F('recipeTime_num') + $F('recipeTime_fract') + " " + $F('recipeTime_op');
	pars += "&recipeServe=" + $F('recipeServe');
	pars += "&ing1_amount=" + $F('ing1_amount');
	pars += "&ing1_prep=" + $F('ing1_prep');
	pars += "&ing1_item=" + $F('ing1_item');
	pars += "&ing2_amount=" + $F('ing2_amount');
	pars += "&ing2_prep=" + $F('ing2_prep');
	pars += "&ing2_item=" + $F('ing2_item');
	pars += "&ing3_amount=" + $F('ing3_amount');
	pars += "&ing3_prep=" + $F('ing3_prep');
	pars += "&ing3_item=" + $F('ing3_item');
	pars += "&ing4_amount=" + $F('ing4_amount');
	pars += "&ing4_prep=" + $F('ing4_prep');
	pars += "&ing4_item=" + $F('ing4_item');
	pars += '&sid=' + Math.random();
	pars += '&action=save';
	new Ajax.Request( url, { method: 'post', parameters: pars, onComplete: returnSave }); 
}

function returnSave(originalRequest) {
	var xmlResponse = originalRequest.responseXML;
	var xmlRoot = xmlResponse.documentElement;
	result = xmlRoot.childNodes[0].firstChild.data;
	
	if(result == "failed") {
		$('addMessage').innerHTML = 'Error: Recipe could not be saved.';
	} else {
		$('addMessage').innerHTML = 'Recipe Saved!';
	}
		
	// Hide Loading
	$('load_overlay').style.display = "none";
	$F('recipeName') = 
	$F('recipeCat') = 
	$F('recipeMethod') = 
	$F('recipeInst') = 
	$F('recipeTime') = 
	$F('recipeServe') = 
	$F('ing1_amount') = 
	$F('ing1_prep') = 
	$F('ing1_item') = 
	$F('ing2_amount') = 
	$F('ing2_prep') = 
	$F('ing2_item') = 
	$F('ing3_amount') = 
	$F('ing3_prep') = 
	$F('ing3_item') = 
	$F('ing4_amount') = 
	$F('ing4_prep') = 
	$F('ing4_item') = '';
}

//////////
// View //
//////////
var userRecipes = new manageRecipes();

function initView() {
	getRecipes();
	$('recipeDetail').style.display = "none";
	$('recipeDetail').style.opacity = 0;
	$('recipeControls').style.display = "none";	
}

/* Recipe Set */
function recipeSet(dir) {
	if(dir < 0) {
		// load previous set
		if((viewBegin - displayAmount) > 0) {
			viewBegin -= displayAmount;
		} else {
			viewBegin = 0;
		}
		refreshRecipeSet();
	} else if(dir > 0) {
		// load next set
		if(viewEnd < userRecipes.arrRecipe.length) {
			viewBegin = viewEnd;
		} else {
			viewBegin = 0;
		}
		refreshRecipeSet();	
	}
}

/* Navigate Recipe */
function navigateRecipe(dir) {
	if(dir < 0) {
		viewID -= 1;
		if(viewID < 0) {
			viewID = userRecipes.arrRecipe.length - 1;
		}
	} else if(dir > 0) {
		viewID += 1;
		if(viewID == userRecipes.arrRecipe.length) {
			viewID = 0;
		}
	}
	displayRecipe(viewID);
}

/* Close Recipe */
function closeRecipe() {
	recD = new Animator({onComplete: 
		function() {
			$('recipeDetail').style.display = "none";
			$('recipeList').style.display = "block";
			if(userRecipes.arrRecipe.length > displayAmount) {				
				$('recipeControls').style.display = "block";
			}
		}
	}).addSubject(new NumericalStyleSubject($("recipeDetail"), 'opacity', 1, 0));
	recD.toggle();	
}

/* Refresh Recipe Set */
function refreshRecipeSet() {
	if( userRecipes.arrRecipe.length > displayAmount) {
		var count = 1;
		
		// Show Loading
		$('load_overlay').style.display = "block";
		
		// Hide recipe stubs til file loaded
		for(i = 1; i <= 9; i++) {
			//$('recipeStubA_' + i).style.display = "none";
			$('recipeStubA_' + i).style.opacity = 0;
		}
		
		// Populate Recipe Stubs	
		viewEnd = viewBegin + displayAmount;
		if(viewEnd > userRecipes.arrRecipe.length) {
			viewEnd = userRecipes.arrRecipe.length;
		}
		
		for(var i = viewBegin; i < viewEnd; i++) {
			populateRecipeStubs(count, i);
			count++;
		}		
		
		// Hide Loading
		$('load_overlay').style.display = "none";
	}
}

/* Display Recipe */
function displayRecipe(id) {
	viewID = id;
	$('recipeDetailHolder').style.opacity = 0;
	
	var r = userRecipes.arrRecipe[id];
	var printHTML = "";
	$('recipeDetailTitle').innerHTML = r.title + " | ";
	$('recipeDetailServings').innerHTML = "Servings: " + r.serving;

	for(var i = 0; i < r.ingredients.length; i++) {
		printHTML += "<span id='ing_item'>" + r.ingredients[i].amount + " " + r.ingredients[i].title + ", " + r.ingredients[i].prepared + "</span><br />";
	}
	$('recipeDetailIngredients').innerHTML = "<span class='recipeTitle' >Ingredients</span><br />" + printHTML;
	printHTML = "";
	
	$('recipeDetailInstructions').innerHTML = "<span class='recipeTitle' >Instructions</span><br />" + r.instruction;
	
	if($('recipeDetail').style.display == 'none') {
		// Fade in recipe detail box
		$('recipeDetailHolder').style.opacity = 1;
		$('recipeDetail').style.display = 'block';
		recD = new Animator().addSubject(new NumericalStyleSubject($("recipeDetail"), 'opacity', 0, 1));
		recD.toggle();
	} else {
		// Fade in recipe info
		recD_alpha = new Animator({transition: Animator.makeEaseIn(3), duration: 500});
		recD_alpha.addSubject(new NumericalStyleSubject($('recipeDetailHolder'), 'opacity', 0, 1));
		recD_alpha.toggle();
	}
	$('recipeList').style.display = "none";
	//$('recipeControls').style.display = "none";
	
	
}

/* Get Recipes */
function getRecipes() {
	// Show Loading
	//$('load_overlay').style.height = $('recipeList').style.height;
	$('load_overlay').style.display = "block";
	
	//var url = 'sampleDBReturn.xml';
	var url = 'ajaxRequest.php';
	var pars = "action=getAll";
	new Ajax.Request( url, { method: 'post', parameters: pars, onComplete: returnRecipes }); 
}

/* Return Recipes */
function returnRecipes(originalRequest) {
	var xmlResponse = originalRequest.responseXML;
	var xmlRoot = xmlResponse.documentElement;
	var recipe_array = xmlRoot.getElementsByTagName("recipe");	
	
	// Populate Recipe Object	
	userRecipes.arrRecipe = new Array();
	for(var i = 0; i  < recipe_array.length; i++) {
		// Populate Total Array 
		var newRecipe = new singleRecipe();		
		newRecipe.title = recipe_array.item(i).getAttribute("title");
		newRecipe.category = recipe_array.item(i).getAttribute("category");
		newRecipe.method = recipe_array.item(i).getAttribute("method");
		newRecipe.instruction = recipe_array.item(i).getElementsByTagName("instructions")[0].firstChild.data;
		if(recipe_array.item(i).getElementsByTagName("time")[0].firstChild != null) {
			newRecipe.time = recipe_array.item(i).getElementsByTagName("time")[0].firstChild.data;
		} else {
			newRecipe.time = "";
		}
		newRecipe.serving = recipe_array.item(i).getElementsByTagName("servings")[0].firstChild.data;
		var ing_array = recipe_array.item(i).getElementsByTagName("ingredients")[0].getElementsByTagName('item');
		for(var j = 0; j < ing_array.length; j++) {
			var newIng = new singleIngredient();
			newIng.amount = ing_array.item(j).getAttribute('amount');			
			newIng.prepared = ing_array.item(j).getAttribute('prepared');			
			newIng.title = ing_array.item(j).firstChild.data;
			newRecipe.ingredients.push(newIng);
		}
		userRecipes.arrRecipe.push(newRecipe);
	}
	
	// Populate Recipe Stubs
	if(userRecipes.arrRecipe.length < displayAmount) {
		viewEnd = userRecipes.arrRecipe.length;
	} else {
		viewEnd = displayAmount;
	}
	
	for(var i = viewBegin; i < viewEnd; i++) {
		populateRecipeStubs(i + 1, i);
	}
	
	// Hide Loading
	$('load_overlay').style.display = "none";
	// Show Controls
	if(userRecipes.arrRecipe.length > displayAmount) {
		$('recipeControls').style.display = "block";
	}
}

function populateRecipeStubs(count, idx) {
	var cur_stub = $('recipeStubA_' + (count));
	cur_stub.style.opacity = 100;
	//cur_stub.div.img.src = '';
	$('recipeStubA_' + (count) + "_Text").innerHTML = "<span onclick='displayRecipe(" + idx + ");'><h1>" + userRecipes.arrRecipe[idx].title + "</h1></span>";
}

///////////
// About //
///////////
function display(window, bool) {
	switch(window) {
	case 'About' :
		if(bool == 1) {
			$('screen').style.zIndex = '100';
			$('screen').style.display = "block";
			$('overlay').style.display = "block";
			about_alpha = new Animator({transition: Animator.makeEaseIn(3), duration: 500});
			about_alpha.addSubject(new NumericalStyleSubject($('screen'), 'opacity', 0, 1));
			about_alpha.addSubject(new NumericalStyleSubject($('overlay'), 'opacity', 0, .5));
			about_alpha.toggle();
		} else {
			// Fixes the initial fadeout on page load / does not work on IE
			if($('screen').style.opacity != 0) {
				about_alpha = new Animator({
					onComplete: function() {
						$('screen').style.zIndex = '-30';
						$('screen').style.display = "none";
						$('overlay').style.display = "none";
					},
					transition: Animator.makeEaseIn(3), 
					duration: 500});
				about_alpha.addSubject(new NumericalStyleSubject($('screen'), 'opacity', 1, 0));
				about_alpha.addSubject(new NumericalStyleSubject($('overlay'), 'opacity', .5, 0));
				about_alpha.toggle();
			}
		}
		break;
	case 'Home' :
		if(bool == 1) {
			display('View', 0 );
			display('Add', 0);
			$('mainOpen').style.display = 'block';
		} else {
			$('mainOpen').style.display = 'none';
		}
		break;
	case 'Add' :
		if(bool == 1) {
			display('Home', 0);
			display('View', 0);
			initAdd();
			$('addForm').style.display = 'block';
		} else {
			$('addForm').style.display = 'none';
		}
		break;
	case 'View' :
		if(bool == 1) {
			display('Home', 0);
			display('Add', 0);
			initView();
			$('recipeList').style.display = 'block';			
		} else {
			$('recipeDetail').style.display = 'none';
			$('recipeDetail').style.opacity = 0;
			$('recipeList').style.display = 'none';
			$('load_overlay').style.display = "none";
		}		
		break;
	default :
		// show home
	}
}