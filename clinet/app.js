function getBathroomValue() {
    var uiBathroom = document.getElementsByName("uiBathroom");
    for(var i in uiBathroom) {
      if(uiBathroom[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  
 
  function getfurnishingValue() {
    var uifurnishing = document.getElementsByName("uifurnishing");
    for(var i in uifurnishing) {
      if(uifurnishing[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  

  function getparkingValue() {
    var uiparking = document.getElementsByName("uiparking");
    for(var i in uiparking) {
      if(uiparking[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  

  function getStatusValue() {
    var uiStatus = document.getElementsByName("uiStatus");
    for(var i in uiStatus) {
      if(uiStatus[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function gettransactionValue() {
    var uitransaction = document.getElementsByName("uitransaction");
    for(var i in uitransaction) {
      if(uitransaction[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function gettypeValue() {
    var uitype = document.getElementsByName("uitype");
    for(var i in uitype) {
      if(uitype[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var area = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathroom = getBathroomValue();
    var furnishing = getfurnishingValue();
    var parking = getparkingValue();
    var status = getStatusValue();
    var transaction = gettransactionValue();
    var type = gettypeValue();

    var locality = document.getElementById("uiLocality");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
     var url = "http://127.0.0.1:8000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        area: parseFloat(area.value),
        bhk: bhk,
        bathroom: bathroom,
        furnishing: furnishing,
        parking: parking,
        status: status,
        transaction: transaction,
        type: type,
        locality: locality.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + (data.estimated_price/10000000).toString() + " cr </h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:8000/get_locality_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_locality_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_locality_names request");
        if(data) {
            var locality = data.locality;
            
            $('#uiLocality').empty();
            for(var i in locality) {
                var opt = new Option(locality[i]);
                $('#uiLocality').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;