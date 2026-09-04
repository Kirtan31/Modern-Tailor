```javascript
/* =====================================================
   MODERN TAILOR
   INTERACTIVE OUTFIT DESIGNER
   ===================================================== */


const shirtMaterial =
    document.getElementById("shirtMaterial");

const pantMaterial =
    document.getElementById("pantMaterial");

const shirtStyle =
    document.getElementById("shirtStyle");

const fit =
    document.getElementById("fit");

const shirt =
    document.getElementById("shirt");

const pantLeft =
    document.getElementById("pantLeft");

const pantRight =
    document.getElementById("pantRight");

const collar =
    document.getElementById("collar");

const tie =
    document.getElementById("tie");


/* =====================================================
   COLOUR DATABASE
   ===================================================== */


function getColor(material) {

    const colors = {

        navy: "#243f67",

        white: "#f2f2ed",

        black: "#17191c",

        brown: "#70452f",

        cream: "#d8c69d",

        grey: "#555b63"

    };

    return colors[material] || "#243f67";

}


/* =====================================================
   UPDATE OUTFIT
   ===================================================== */


function updatePreview() {


    /* Shirt */

    shirt.style.background =
        getColor(shirtMaterial.value);


    /* Pants */

    pantLeft.style.background =
        getColor(pantMaterial.value);

    pantRight.style.background =
        getColor(pantMaterial.value);


    /* Shirt Style */

    if (shirtStyle.value === "formal") {

        collar.style.display =
            "block";

        tie.style.display =
            "block";

        shirt.style.clipPath =
            "polygon(15% 0%,85% 0%,100% 15%,82% 100%,18% 100%,0% 15%)";

    }


    else if (shirtStyle.value === "casual") {

        collar.style.display =
            "block";

        tie.style.display =
            "none";

        shirt.style.clipPath =
            "polygon(10% 0%,90% 0%,100% 12%,90% 100%,10% 100%,0% 12%)";

    }


    else {

        collar.style.display =
            "none";

        tie.style.display =
            "none";

        shirt.style.clipPath =
            "polygon(8% 0%,92% 0%,100% 10%,90% 100%,10% 100%,0% 10%)";

    }


    /* Fit */

    if (fit.value === "slim") {

        shirt.style.width =
            "140px";

        shirt.style.left =
            "55px";

    }


    else if (fit.value === "classic") {

        shirt.style.width =
            "170px";

        shirt.style.left =
            "40px";

    }


    else {

        shirt.style.width =
            "160px";

        shirt.style.left =
            "45px";

    }

}


/* =====================================================
   EVENT LISTENERS
   ===================================================== */


if (shirtMaterial) {

    shirtMaterial.addEventListener(
        "change",
        updatePreview
    );

}


if (pantMaterial) {

    pantMaterial.addEventListener(
        "change",
        updatePreview
    );

}


if (shirtStyle) {

    shirtStyle.addEventListener(
        "change",
        updatePreview
    );

}


if (fit) {

    fit.addEventListener(
        "change",
        updatePreview
    );

}


/* Initial preview */

updatePreview();
```
