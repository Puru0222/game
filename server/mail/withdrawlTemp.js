const withdrawalTemplate = ({ uid, upiId, amount, note }) => {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Withdrawal Request</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .details {
          font-size: 16px;
          margin-bottom: 20px;
          text-align: left;
        }
        .detail-item {
          margin: 10px 0;
        }
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">Withdrawal Request</div>
        <div class="details">
          <p>Dear Admin,</p>
          <p>A user has submitted a request to withdraw funds with the following details:</p>
          <div class="detail-item"><span class="highlight">UID:</span> ${uid}</div>
          <div class="detail-item"><span class="highlight">UPI ID:</span> ${
            upiId || "Not provided"
          }</div>
          <div class="detail-item"><span class="highlight">Amount:</span> ₹${amount}</div>
          <div class="detail-item"><span class="highlight">Complain:</span> ${
            note || "Not provided"
          }</div>
        </div>
        <p>Please process this request accordingly. If any details are incorrect, please contact the user for clarification.</p>
      </div>
    </body>
    </html>`;
};

module.exports = withdrawalTemplate;
