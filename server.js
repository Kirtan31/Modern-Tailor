```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://kirtan31.github.io"
}));

app.use(express.json());


// ================================
// TEXTBEE CONFIGURATION
// ================================

const TEXTBEE_API_KEY =
    process.env.TEXTBEE_API_KEY;

const TEXTBEE_DEVICE_ID =
    process.env.TEXTBEE_DEVICE_ID;

const OWNER_PHONE_NUMBER =
    process.env.OWNER_PHONE_NUMBER;


// ================================
// APPOINTMENT API
// ================================

app.post("/api/appointments", async (req, res) => {

    try {

        const {
            customerName,
            customerPhone,
            date,
            time,
            service,
            details
        } = req.body;


        // Check required information
        if (
            !customerName ||
            !customerPhone ||
            !date ||
            !time ||
            !service
        ) {

            return res.status(400).json({
                message: "Please fill in all required fields."
            });

        }


        // Check customer phone number
        if (!/^[0-9]{10}$/.test(customerPhone)) {

            return res.status(400).json({
                message: "Please enter a valid 10-digit phone number."
            });

        }


        // SMS message
        const message =  `NEW MODERN TAILOR APPOINTMENT


Customer: ${customerName}
Phone: +91${customerPhone}
Date: ${date}
Time: ${time}
Service: ${service}

Details:
${details || "No additional details provided."}
        `.trim();


        // ================================
        // SEND SMS THROUGH TEXTBEE
        // ================================

        const response = await fetch(
            "https://api.textbee.dev/api/v1/gateway/send-sms",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TEXTBEE_API_KEY
                },

                body: JSON.stringify({

                    recipients: [
                        OWNER_PHONE_NUMBER
                    ],

                    message: message,

                    deviceId: TEXTBEE_DEVICE_ID

                })
            }
        );


        const data = await response.json();


        // Check Textbee response
        if (!response.ok) {

            console.error(
                "TEXTBEE ERROR:",
                data
            );

            return res.status(500).json({
                message: "Unable to send appointment SMS."
            });

        }


        // Successful appointment
        res.json({

            success: true,

            message:
                "Appointment request sent successfully."

        });


    } catch (error) {

        console.error(
            "SMS ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Unable to send appointment request."

        });

    }

});


// ================================
// START SERVER
// ================================

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Modern Tailor server running on port ${PORT}`
    );

});
```
