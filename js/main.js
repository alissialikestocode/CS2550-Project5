/*
    Changes made:
        --I didn't have any JavaScript problems to change from Project 4
        --Added this change list to the top of index.js
        --Adjusted JavaScript for switching between tabs to include the filename
            change (index.js to main.js) and new Forms page
        --Organized JavaScript files in a subfile
*/

// Switch between tabs on page

console.log()


function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tabs");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    if (tabName == 'home-container') {
        document.getElementById('home-container').style.display = 'grid';
    }
}

// Event handler for theme change button click
document.getElementById("themeChange").addEventListener("click", function() {

    toggleStylesheet("theme.css");
    //insert 'link' element into head just below styles.css reference

}, { passive: true });

function toggleStylesheet(href, onoff) {
    var existingNode = 0 //get existing stylesheet node if it already exists:
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode
    }
    if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
    if (onoff) { //TURN ON:
        if (existingNode) return onoff //already exists so cancel now
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/theme.css';
        document.getElementsByTagName('head')[0].appendChild(link);

        // Switch image in header
        // div.style.backgroundImage = `url('images/Doom-At-Your-Service-001.jpeg')`;

        var imgLogo = document.getElementById("logo-img");
        imgLogo.src = `images/couple.jpg`;
        imgLogo.alt = `A picture of Seo In-Guk and Park Bo-Young`;

        var h1 = document.getElementsByTagName("h1")[0];
        h1.innerText = `Okay Drama Queen! : The DAYS Takeover Edition`;

        // Change Actor photo
        var img = document.getElementById("actor-photo");
        img.src = `images/seo_in_guk.jpeg`;
        img.alt = `A picture of Seo In-Guk`;

        var imgTxt = document.getElementById("actor-name");
        imgTxt.innerText = `Seo In-Guk`;

        // Change video playing
        var h3 = document.getElementById("video-container").children[0];
        h3.innerText = `Watch a trailer for Doom At Your Service`;

        var player = document.getElementById("video-container").children[1];
        player.src = `https://www.youtube.com/embed/SMSVgUpQVps?si=8OfkzfG0ag7yj9yR`;
            
     } else { //TURN OFF:
        if (existingNode) existingNode.parentNode.removeChild(existingNode)
        
        // Change logo and header back
        var imgLogo = document.getElementById("logo-img");
        imgLogo.src = `images/crown_orig.png`;
        imgLogo.alt = `A black crown with three peaks`;

        var h1 = document.getElementsByTagName("h1")[0];
        h1.innerText = `Okay Drama Queen!`;
        
        // Change actor photo back
        var img = document.getElementById("actor-photo");
        img.src = `images/nam_joo_hyuk3.jpg`;
        img.alt = `A picture of Nam Joo-Hyuk`;

        var imgTxt = document.getElementById("actor-name");
        imgTxt.innerText = `Nam Joo-Hyuk`;
        
        // Change video playing back
        var h3 = document.getElementById("video-container").children[0];
        h3.innerText = `Watch Oh My Ghost Episode 1`;

        var player = document.getElementById("video-container").children[1];
        player.src = `https://www.youtube.com/embed/HwbwE5LK3lA?si=5miug9Mvs2_EZXwW`;
    }
    return onoff;
}


// Entry point for js validation, happens after everything has been loaded/rendered on page
document.addEventListener("DOMContentLoaded", function(event) {
    initValidation("myform", "successMsg");
});