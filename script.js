// ==========================================
// QR GENERATOR
// ==========================================


// ==========================================
// GET DATE AND TIME
// ==========================================

function getCurrentDateTime() {

    const now = new Date();

    const options = {

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: true

    };

    return now.toLocaleString(
        "en-US",
        options
    );
}



// ==========================================
// VALIDATE FORM
// ==========================================

function validateForm() {

    const name =
        document.getElementById("name")
            .value.trim();

    const office =
        document.getElementById("office")
            .value.trim();

    const position =
        document.getElementById("position")
            .value.trim();


    if (name === "") {

        alert(
            "Please enter the respondent's full name."
        );

        document.getElementById("name").focus();

        return false;
    }


    if (office === "") {

        alert(
            "Please enter the respondent's office."
        );

        document.getElementById("office").focus();

        return false;
    }


    if (position === "") {

        alert(
            "Please enter the respondent's position."
        );

        document.getElementById("position").focus();

        return false;
    }


    return true;
}



// ==========================================
// GENERATE QR
// ==========================================

function generateQR() {

    if (!validateForm()) {

        return;

    }


    const name =
        document.getElementById("name")
            .value.trim();

    const office =
        document.getElementById("office")
            .value.trim();

    const position =
        document.getElementById("position")
            .value.trim();


    const dateTime =
        getCurrentDateTime();


    // ======================================
    // DATA INSIDE QR
    // ======================================

    const qrData = {

        system:
            "Smart Classroom Attendance",

        name:
            name,

        office:
            office,

        position:
            position,

        dateTime:
            dateTime

    };


    const qrText =
        JSON.stringify(qrData);



    // ======================================
    // CLEAR PREVIOUS QR
    // ======================================

    const qrContainer =
        document.getElementById("qrcode");

    qrContainer.innerHTML = "";



    // ======================================
    // GENERATE QR
    // ======================================

    new QRCode(

        qrContainer,

        {

            text: qrText,

            width: 230,

            height: 230,

            correctLevel:
                QRCode.CorrectLevel.H

        }

    );



    // ======================================
    // DISPLAY INFORMATION
    // ======================================

    document.getElementById("qrName")
        .textContent = name;

    document.getElementById("qrOffice")
        .textContent = office;

    document.getElementById("qrPosition")
        .textContent = position;

    document.getElementById("qrDate")
        .textContent = dateTime;



    // ======================================
    // SHOW QR RESULT
    // ======================================

    document.getElementById(
        "qrPlaceholder"
    ).style.display = "none";


    document.getElementById(
        "qrResult"
    ).style.display = "block";



    // ======================================
    // QR COUNTER
    // ======================================

    let qrCount =
        Number(
            localStorage.getItem(
                "qrGenerated"
            )
        ) || 0;


    qrCount++;


    localStorage.setItem(
        "qrGenerated",
        qrCount
    );

}



// ==========================================
// DOWNLOAD QR
// ==========================================

function downloadQR() {

    const qrContainer =
        document.getElementById("qrcode");


    const canvas =
        qrContainer.querySelector("canvas");


    if (!canvas) {

        alert(
            "Please generate a QR code first."
        );

        return;

    }


    const link =
        document.createElement("a");


    link.download =
        "SmartClassroom_Attendance_QR.png";


    link.href =
        canvas.toDataURL("image/png");


    link.click();

}