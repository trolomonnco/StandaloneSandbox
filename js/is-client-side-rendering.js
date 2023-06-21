
attempts =0;
saMinInsertedByUser = false;
saMinInsertedIntoHeader = false;
placeHolderInserted = false;
scriptsInserted = false;

async function detectChanges() {
//Create an element of the rendered source so it can be analysed 
element = document.getElementById("source");
sourceCodeString = element.value;
console.log(sourceCodeString);


//Checks in the same order the standalone document lays out
if(saMinInsertedByUser ==false){
  console.log("Checking SA Min Insertion");
  verifyUserSAminInsertion(sourceCodeString);
}
else if(placeHolderInserted ==false){
  console.log("Checking placeholder Insertion");
  verifyPlaceholderInsertion(sourceCodeString);
}
else if(scriptsInserted ==false){
  console.log("Checking script Insertion");
  verifyScriptInsertion(sourceCodeString);
  
}

transferInputWindowToSource(sourceCodeString);
}


function checkContainsSAmin(sourceCodeString){
  containsSAmin = sourceCodeString.includes("<script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> </script>")
  console.log(containsSAmin);
  
  return containsSAmin;
}

function checkSAminInHead(sourceCodeString){
  headString = sourceCodeString.substring(
    sourceCodeString.indexOf("<head>") + 1, 
    sourceCodeString.lastIndexOf("</head>")
  );
  containsSaMinHead = headString.includes("<script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> </script>")
  console.log("Standalone code in header:"+containsSaMinHead); 
  return containsSaMinHead;
}

function checkContainsPlaceholder(sourceCodeString){
  containsPlaceholder = sourceCodeString.includes("<div id=\"ezoic-pub-ad-placeholder-103\"> </div>")
  console.log("Contains placeholder:" + containsPlaceholder);
  return containsPlaceholder;

}

function checkContainsPlaceholderInHead(sourceCodeString){
  bodyString = sourceCodeString.substring(
    sourceCodeString.indexOf("<body>") + 1, 
    sourceCodeString.lastIndexOf("</body>")
  );

  containsPlaceholder = bodyString.includes("<div id=\"ezoic-pub-ad-placeholder-103\"> </div>")
  console.log(containsPlaceholder);
  return containsPlaceholder;

}

function checkContainsScriptInsertion(sourceCodeString){
 return sourceCodeString.includes("window.ezstandalone = window.ezstandalone");
}

function techSlothReply(mistake, message){
  document.getElementById('slothChat').innerHTML = message;
  if(mistake){
    document.getElementById('alarmBox').style.backgroundColor = "red";
    if(attempts<7){
      document.getElementById("sloth").src="techSloth"+attempts+".png";
    }
  }
  else{
    document.getElementById('alarmBox').style.backgroundColor = "green";
    document.getElementById("sloth").src="techSloth0.png";
}
  }

     
function verifyUserSAminInsertion(sourceCodeString){
  if(checkContainsSAmin(sourceCodeString)){
    if (checkSAminInHead(sourceCodeString)){
      techSlothReply(false,"Good job! I see <b> &#60;script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> &#60;/script></b> <br>  in the &#60;head> of the page <br> Now try adding a placeholder in the <b>&#60;body></b> by adding: <br>  <b> &#60;div id=\"ezoic-pub-ad-placeholder-103\"> &#60;/div></b> into the body");
      attempts =0;
      saMinInsertedByUser = true;
      
    }
    else{
      techSlothReply(true,"I cant see <b>&#60;script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> &#60;/script> <br>  in the <b>&#60;head></b>  <br> of the page head")
      saMinInsertedByUser = false;
      attempts ++;
    }
    
    }
  else{
      techSlothReply(true,"I cant see <b> &#60;script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> &#60;/script></b> <br> in the page source")
      saMinInsertedByUser = false
      //console.log("Test"+saMinInserted);
      attempts ++;
  }
  manageHeaderScriptInSource(); 
    }
  

function verifyPlaceholderInsertion(sourceCodeString){
  if(checkContainsPlaceholder(sourceCodeString)){
   if(checkContainsPlaceholderInHead(sourceCodeString)){
    techSlothReply(false,"Nice! I can see <b> &#60;div id=\"ezoic-pub-ad-placeholder-103\"> &#60;/div></b> in the body! Now lets define our placeholder by adding some scripts <br> <b> &#60;script> window.ezstandalone = window.ezstandalone || {};</b> <br> <b>ezstandalone.cmd = ezstandalone.cmd || [];</b> <br> <b>ezstandalone.cmd.push(function() {</b> <br> <b> ezstandalone.define(103);<br>}); </b> <br> <b>&#60;/script></b>")
    attempts =0;
    document.getElementById('slothChat').style.fontSize = "10px"
    placeHolderInserted = true;
    
   }
   else{
    techSlothReply(true,"I cant see <b> &#60;div id=\"ezoic-pub-ad-placeholder-103\"> &#60;/div></b> <br> in the body of the page.")
    attempts ++;
   }

  }
  else{
    techSlothReply(true,"I cant see <b> &#60;div id=\"ezoic-pub-ad-placeholder-103\"> &#60;/div></b> <br> in the page source")
    attempts ++;
  }

}

function verifyScriptInsertion(sourceCodeString){
  if(checkContainsScriptInsertion(sourceCodeString.replace("\t", " "))){
    containsScriptInsertion = sourceCodeString.includes("<script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> </script>")
    console.log(containsScriptInsertion);
    scriptsInserted =true;
    return containsScriptInsertion;
  }
   else{
     techSlothReply(true,"I cant see <br> <b> &#60;script> window.ezstandalone = window.ezstandalone || {};</b> <br> <b>ezstandalone.cmd = ezstandalone.cmd || [];</b> <br> <b>ezstandalone.cmd.push(function() {</b> <br> <b> ezstandalone.define(103);<br>}); </b> <br> <b>&#60;/script></b>");
     attempts ++;
   }

}

//SA min is added to actual head of the document as source shown to user is just of a single div\
function manageHeaderScriptInSource(){
  if(saMinInsertedByUser && saMinInsertedIntoHeader == false ){
  document.getElementsByTagName("head")[0].innerHTML += "<script async src=\"\/\/www.ezojs.com/ezoic/sa.min.js\"> </script>";
  saMinInsertedIntoHeader = true;
  }
  
  else if (saMinInsertedByUser ==false && saMinInsertedIntoHeader ){
    document.getElementsByTagName("head")[0].innerHTML= "<meta charset=\"utf-8\">";
    document.getElementsByTagName("head")[0].innerHTML+= "<title>Standalone Checker</title>";
    document.getElementsByTagName("head")[0].innerHTML+= "<link rel=\"stylesheet\" href=\"css/Styles.css\">";
    document.getElementsByTagName("head")[0].innerHTML+= "<script src=\"js/is-client-side-rendering.js\"></script>";

    saMinInsertedIntoHeader = false;
  }

}

function transferInputWindowToSource(sourceCodeString){
  
  
  headlessSourceCodeString = sourceCodeString.substring(
    sourceCodeString.indexOf("<body>") + 1, 
    sourceCodeString.lastIndexOf("</body>")
  );

  document.getElementById("editingBox").innerHTML =headlessSourceCodeString;

}

  
  






  


 



      

  
  
  
