"use client";
import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const GooglePayButtonComponent = () => {
  const updateIsPremium = async (userId) => {
    try {
      const userDocRef = doc(db, "Users", userId);
      await updateDoc(userDocRef, {
        isPremium: true,
      });
      console.log("User premium status updated successfully.");
    } catch (error) {
      console.error("Error updating user premium status: ", error);
    }
  };

  return (
    <GooglePayButton
      className="mt-5"
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: "1",
          currencyCode: "UAN",
          countryCode: "UA",
        },
        shippingAddressRequired: true,
        callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
      }}
      onLoadPaymentData={(paymentRequest) => {
        console.log("load payment data", paymentRequest);
        const userId = auth.currentUser?.uid;
        if (userId) {
          updateIsPremium(userId);
        } else {
          console.error("No user is currently signed in.");
        }
      }}
      onPaymentAuthorized={(paymentData) => {
        console.log("Payment Authorised Success", paymentData);
        return { transactionState: "SUCCESS" };
      }}
      onPaymentDataChanged={(paymentData) => {
        console.log("On Payment Data Changed", paymentData);
        return {};
      }}
      existingPaymentMethodRequired="false"
      buttonColor="black"
      buttonType="Buy"
    />
  );
};

export default GooglePayButtonComponent;
