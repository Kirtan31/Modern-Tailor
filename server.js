const express = require("express");
const twilio = require("twilio");

const app = express();

app.use(express.json());


// ================================
// TWILIO CONFIGURATION
// ================================

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const TWILIO_PHONE_NUMBER =
    process.env.TWILIO_PHONE_NUMBER;

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


        // Check phone number
        if (!/^[0-9]{10}$/.test(customerPhone)) {

            return res.status(400).json({
                message: "Please enter a valid 10-digit phone number."
            });

        }


        // SMS message
        const message = `
NEW MODERN TAILOR APPOINTMENT

Customer: ${customerName}
Phone: ${customerPhone}
Date: ${date}
Time: ${time}
Service: ${service}

Details:
${details || "No additional details provided."}
        `;


        // Send SMS
        await client.messages.create({

            body: message,

            from: TWILIO_PHONE_NUMBER,

            to: OWNER_PHONE_NUMBER

        });


        res.json({
            success: true,
            message: "Appointment request sent successfully."
        });


    } catch (error) {

        console.error("SMS ERROR:", error);

        res.status(500).json({
            message: "Unable to send appointment request."
        });

    }

});


// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Modern Tailor server running on port ${PORT}`
    );

});
