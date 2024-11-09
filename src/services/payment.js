export const initiateUPIPayment = (amount, uid, userId, app) => {
  try {
    const upiID = "9798933342@pthdfc";
    const name = "Purushotam Kumar";
    const note = `UID: ${uid}`;
    const currency = "INR";

    // Encode parameters
    const pa = encodeURIComponent(upiID);
    const pn = encodeURIComponent(name);
    const tn = encodeURIComponent(note);
    const am = encodeURIComponent(amount);
    const cu = encodeURIComponent(currency);

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
        baseURL = `upi://pay`; // Fallback to default UPI scheme
    }

    // Construct UPI URL
    const upiURL = `${baseURL}?pa=${pa}&pn=${pn}&tn=${tn}&am=${am}&cu=${cu}`;

    // Log for debugging
    console.log("Generated UPI URL:", upiURL);

    // Redirect to UPI app
    window.location.href = upiURL;
  } catch (error) {
    console.error("Failed to initiate UPI payment", error);
  }
};
