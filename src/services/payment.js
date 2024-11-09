export const initiateUPIPayment = async (amount, uid, userId, app) => {
    try {
    //   const response = await fetch('/api/payments/create', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount, uid, userId }),
    //   });
    //   const { paymentId } = await response.json();
  
      // Define UPI details
      const upiID = "gamechallenger@upi";
      const name = "Purushotam Kumar";
      const note = `UID: ${uid}`;
      const currency = "INR";
      const amountStr = encodeURIComponent(amount);
  
      // Choose the app-specific scheme
      let baseURL = '';
      if (app === 'GooglePay') {
        baseURL = `tez://upi/pay`;
      } else if (app === 'PhonePe') {
        baseURL = `phonepe://upi/pay`;
      } else if (app === 'Paytm') {
        baseURL = `paytmmp://upi/pay`;
      } else {
        baseURL = `upi://pay`;  // Fallback to default UPI scheme
      }
  
      // Construct the final UPI URL
      const upiURL = `${baseURL}?pa=${upiID}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&am=${amountStr}&cu=${currency}`;
      console.log(upiURL);
  
      // Redirect to UPI app
      window.location.href = upiURL;
    } catch (error) {
      console.error("Failed to initiate UPI payment", error);
    }
  };
  