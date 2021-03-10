var eleHierarchyLevel=0;
function centerBox() {

    var boxWidth = 1000;
    /* Preliminary information */
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();
    /* auto scroll bug */

    /* Calculate positions */

    var disWidth = (winWidth - boxWidth) / 2
    var disHeight = scrollPos + 100;

    /* Move stuff about */
    $('.popup-box').css({ 'width': boxWidth + 'px', 'left': disWidth + 'px', 'top': disHeight + 'px','height' : ((winHeight/2)+100) +'px', "max-height" :  ((winHeight/2)+100) +'px',"background": "rgb(235, 230, 224)" ,"padding": "20px","border-bottom-left-radius": "5px", "border-bottom-right-radius": "5px"});
    
    var popupHeight = $('.popup-box').height();
    
    $('.jQFBody').css({ 'height' : winHeight/2+'px',"max-height" :  (popupHeight-100) + 'px',"overflow":"auto" , "padding": "20px","border-bottom-left-radius": "5px", "border-bottom-right-radius": "5px"});
   // $('.popup-box').css({ 'width': boxWidth + 'px', 'left': disWidth + 'px', 'top': disHeight + 'px',"overflow":"auto",'height' : winHeight/2+'px' });
    //$('#blackout').css({'width' : winWidth+'px', 'height' : winHeight+'px'});

    return false;
}



function LoadjQSFPopup(target) {
    


    //$('body').append('<div class="popup-box" id="popup-box-1"><div class="close">Close</div><div class="top"><h2>Hi, it is demo window!</h2></div><div class="bottom">Sample content!</div></div>');
    //$('body').append('<div id="blackout"></div>');
    var sContentToAppend = "<div class='popup-box' id='popup-box-1' >\
                            <div class='top'>\
                                <b>@FindBy</b>\
                            </div>\
                            <div style='text-align: center'>\
                                <a href=# id='copyjQS' style='align:left, padding: 10px'>Copy cssSelector</a> | \
                                <a href=# id='copyxpath' style='align:left, padding: 10px'>Copy XPath</a>\
                            </div>\
                            <div>CSS: <code  id='jSQFinalString'></code></div>\
                            <div>xPath: <code  id='xpathFinalString'></code></div>\
                            <div class='jQFBody' id='jQFContent' >\
                                <p>\
                            </div>\
                        </div>";
    $('body').append(sContentToAppend);


    $(window).resize(centerBox);
    $(window).scroll(centerBox);
    centerBox();




    /* Get the id (the number appended to the end of the classes) */
    var name = $('[class*=popup-link]').attr('class');
    var id = 1;//name[name.length - 1];
    var scrollPos = $(window).scrollTop();

    /* Show the correct popup box, show the blackout and disable scrolling */

    $('#popup-box-' + id).show();
    
    $('html,body').css('overflow', 'auto');

    /* Fixes a bug in Firefox */
    $('html').scrollTop(scrollPos);

    $('[class*=popup-box]').click(function (e) {
        /* Stop the link working normally on click if it's linked to a popup */
        e.stopPropagation();
    });
    $('html').click(function () {
        var scrollPos = $(window).scrollTop();
        /* Hide and remove the popup and blackout when clicking outside the popup */
        $('[id^=popup-box-]').hide();
        $('[id^=popup-box-]').remove();
        //$('#blackout').hide(); 
        $("html,body").css("overflow", "auto");
        $('html').scrollTop(scrollPos);
    });
    $('.close').click(function () {
        var scrollPos = $(window).scrollTop();
        /* Similarly, hide and remove the popup and blackout when the user clicks close */
        $('[id^=popup-box-]').hide();
        $('[id^=popup-box-]').remove();
        //$('#blackout').hide(); 
        //$("html,body").css("overflow", "auto");
        $('html').scrollTop(scrollPos);
    });

    $("#copyjQS").click(function (){
        var copyText = document.getElementById("jSQFinalString").innerHTML;
            
        navigator.clipboard.writeText(copyText);
    });
    $("#copyxpath").click(function (){
        var copyText = document.getElementById("xpathFinalString").innerHTML;
            
        navigator.clipboard.writeText(copyText);
    });
    

    //Add jQS contents

    var jQFContent;
    eleHierarchyLevel=0;
    jQFContent = "<table width='95%' class='jQSFTable' align='center' border='1'>\
                    <tr align='center'>\
                        <td nowrap><b>Relationship</b></td>\
                        <td nowrap><b>Tag</b></td>\
                        <td nowrap><b>id</b></td>\
                        <td nowrap><b>class</b></td>\
                        <td nowrap><b>name</b></td>\
                        <td nowrap><b>title</b></td>\
                        <td nowrap><b>alt</b></td>\
                        <td nowrap><b>aria-label</b></td>\
                        <td nowrap><b>role</b></td>\
                        <td nowrap ><b>placeholder</b></td>\
                        <td><b>text</b></td>\
                    </tr>\
                    <tr>[SELF]</tr>\
                    <tr>[PARENT]</tr>\
                </table>"

    jQFContent = jQFContent.replace("[SELF]", "<td nowrap>Self</td>".concat(
        formCheckbox(target, "tagName"), 
        formCheckbox(target, "id"), 
        formCheckbox(target, 'class'),
        formCheckbox(target, 'name'),
        formCheckbox(target, 'title'), 
        formCheckbox(target, 'alt'), 
        formCheckbox(target, 'aria-label'),
        formCheckbox(target, 'role'), 
        formCheckbox(target, 'placeholder'), 
        formCheckbox(target, 'text')));

        eleHierarchyLevel++;
    var i;
    for (i = 0; i < $(target).parents().slice(0, 19).length; i++) {

        
        eleParent = $(target).parents().eq(i);
        if (getProp(eleParent, "tagName") === "BODY") {
            break;
        }
        jQFContent = jQFContent.replace("[PARENT]", "<td nowrap>Grandparent-" + (i) + "</td>".concat(formCheckbox(eleParent, "tagName"), formCheckbox(eleParent, "id"),
            formCheckbox(eleParent, 'class'), formCheckbox(target, 'name'),
            formCheckbox(eleParent, 'title'), formCheckbox(eleParent, 'alt'), formCheckbox(eleParent, 'aria-lable'),
            formCheckbox(eleParent, 'role'), formCheckbox(eleParent, 'placeholder'), formCheckbox(eleParent, 'text'), "<tr>[PARENT]</tr>"));
        //console.log(jQFContent);
        eleHierarchyLevel++;
    }
    jQFContent = jQFContent.replace("<tr>[PARENT]</tr>", "");
    jQFContent = jQFContent.replace("Grandparent-0", "Parent");
    //console.log(jQFContent);
    $('#jQFContent').append(jQFContent);

//Formulate the jQS and Display as String
    $(".jQSFChkBox").change(function () {
        var cssVAlue=[];
        var xpathValue=[];
        var jQSFinal="";
        var xpathFinal="";
        $.each($(".jQSFChkBox:checked"), function () {
            
            
            var eleHier=parseInt(this.getAttribute("level"));
            var cssVal=$(this).val();
            var xPathVal=this.getAttribute("xpath");
           
            //jQSFinal=jQSFinal+$(this).val();
            if (typeof cssVAlue[eleHier] === "undefined"){
                cssVAlue[eleHier]="";
            }
            if (typeof xpathValue[eleHier] === "undefined"){
                xpathValue[eleHier]="";
            }
            
            cssVAlue[eleHier]=cssVAlue[eleHier]+cssVal;
           
            xpathValue[eleHier]=xpathValue[eleHier]+xPathVal;
            
            if (xpathValue[eleHier].indexOf("/")<0){
                xpathValue[eleHier]="//*"+xpathValue[eleHier];
            }
            
            
            
        });
        // $("#jSQFinalString").text(jQSFinal);
        // console.log(cssVAlue.length);
       
       
        for ( i=cssVAlue.length;i>=0;i--){
            if (!isBlankAndEmpty(cssVAlue[i])){
                console.log(cssVAlue[i]);
                jQSFinal=jQSFinal+ cssVAlue[i] +" ";
            }

            if (!isBlankAndEmpty(xpathValue[i])){
                console.log(xpathValue[i]);
                xpathFinal=xpathFinal+ xpathValue[i] +" ";
            }
           
        }
        $("#jSQFinalString").text( jQSFinal );
        $("#xpathFinalString").text(xpathFinal);
        //console.clear();
        console.log("$$('"+jQSFinal+"')");
        console.log("$x('"+xpathFinal+"')");
       
        
    });

}

//getters
function getProp(element, sAttr) {


var sValue;
    try {
        sValue=element.getAttribute(sAttr);
      }
      catch(err) {
        sValue=null;
      }

    
    
    if (sValue==null){
        sValue = $(element).prop(sAttr);
    }
    


    if (isBlankAndEmpty(sValue)) {
        return "";
    }
    return sValue;

}
function isBlankAndEmpty(str) {
    return (!str || /^\s*$/.test(str)) && (!str || 0 === str.length);
}
function formCheckbox(element, sAttr) {
    if (sAttr === "text") {
        sValue = $(element).text().trim().substring(0, 75);
    }
    else {
        sValue = getProp(element, sAttr);
    }

    
    var sChkbox = "";
    if (sValue != "") {
        if (sAttr === "tagName") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+" class='jQSFChkBox' value='" + sValue.toLowerCase() + "' xpath='//" + sValue.toLowerCase() + "'>";
        }
        else if (sAttr === "id") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+" class='jQSFChkBox' value='#" + sValue + "'  xpath='[@id=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "class") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='." + sValue + "' xpath='[@class=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "name") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[name=\"" + sValue + "\"]' xpath='[@name=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "role") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[role=\"" + sValue + "\"]' xpath='[@role=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "aria-label") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[aria-label=\"" + sValue + "\"]' xpath='[@aria-label=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "alt") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[alt=\"" + sValue + "\"]' xpath='[@alt=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "title") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[title=\"" + sValue + "\"]' xpath='[@title=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "placeholder") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value='[placeholder=\"" + sValue + "\"]' xpath='[@placeholder=\"" + sValue + "\"]'>";
        }
        else if (sAttr === "text") {
            sChkbox = "<input type=\"checkbox\" level="+eleHierarchyLevel+"  class='jQSFChkBox' value=':contains(\"" + sValue + "\")' xpath='[normalize-space()=\"" + sValue + "\"]'>";
        }
        
    }

    sChkbox = "<td>" + sChkbox + " " + sValue + "</td>";
    //console.log(sChkbox);

    return sChkbox;

}