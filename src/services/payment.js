export const initiateUPIPayment = (amount, uid, app) => {
  try {
    const upiID = "gamechallenger@upi";
    const note = `UID: ${uid}`;

    // Encode essential parameters
    const pa = encodeURIComponent(upiID);
    const tn = encodeURIComponent(note);
    const am = encodeURIComponent(amount);

    // Choose app-specific UPI scheme
    let baseURL;
    switch (app) {
      case "GooglePay":
        baseURL = `tez://upi/pay`;
        break;
      case "PhonePe":
        baseURL = `phonepe://upi/pay`;
        break;
      case "Paytm":
        baseURL = `paytmmp://upi/pay`;
        break;
      default:
        baseURL = `upi://pay`; // Fallback for other UPI apps
    }

    // Construct simplified UPI URL
    const upiURL = `${baseURL}?pa=${pa}&tn=${tn}&am=${am}`;

    // Redirect to UPI app
    window.location.href = upiURL;
  } catch (error) {
    console.error("Failed to initiate UPI payment", error);
  }
};
