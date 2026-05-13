import React, { useEffect, useState } from "react";

 import { useNavigate } from "react-router-dom";

 import {
   getWallet,
   getUserProfile

 } from "../api/api";



 export default function Debit() {

   const [receiverEmail, setReceiverEmail] =
     useState("");

   const [amount, setAmount] =
     useState("");

   const [balance, setBalance] =
     useState(0);

   const [currentUserEmail, setCurrentUserEmail] =
     useState("");

   const navigate = useNavigate();

   // =========================
   // LOAD USER + WALLET
   // =========================

   useEffect(() => {

     loadData();

   }, []);

   const loadData = async () => {

     try {

       // WALLET

       const wallet = await getWallet();

       setBalance(wallet.balance);

       // PROFILE

       const profile =
         await getUserProfile();

       setCurrentUserEmail(
         profile.email
       );

     } catch (err) {

       console.log(err);

       alert("Failed to load data");
     }
   };

   // =========================
   // EMAIL VALIDATION
   // =========================

   const validateEmail = (email) => {

     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
       .test(email);
   };

   // =========================
   // CONTINUE
   // =========================

   const handleContinue = () => {

     // EMPTY EMAIL

     if (!receiverEmail) {

       alert("Enter receiver email");

       return;
     }

     // INVALID EMAIL

     if (
       !validateEmail(receiverEmail)
     ) {

       alert(
         "Enter valid email address"
       );

       return;
     }

     // SELF TRANSFER

     if (
       receiverEmail.toLowerCase() ===
       currentUserEmail.toLowerCase()
     ) {

       alert(
         "You cannot transfer money to yourself"
       );

       return;
     }

     // INVALID AMOUNT

     if (
       !amount ||
       Number(amount) <= 0
     ) {

       alert("Enter valid amount");

       return;
     }

     // BALANCE CHECK

     if (
       Number(amount) > Number(balance)
     ) {

       alert("Insufficient Balance");

       return;
     }

     // =========================
     // SAVE TEMP DATA
     // =========================

     localStorage.setItem(
       "receiverEmail",
       receiverEmail
     );

     localStorage.setItem(
       "transferAmount",
       amount
     );

     // OPTIONAL

     localStorage.setItem(
       "description",
       "Money Transfer"
     );

     // =========================
     // GO VERIFY PIN PAGE
     // =========================

     navigate("/verify-pin");
   };

   return (

     <div className="page">

       <div className="debit-card">

         <h1>
           Send Money
         </h1>

         <h3>
           Current Balance:
           ₹ {balance}
         </h3>

         {/* RECEIVER EMAIL */}

         <input
           type="email"
           placeholder="Receiver Email"
           value={receiverEmail}
           onChange={(e) =>
             setReceiverEmail(
               e.target.value
             )
           }
         />

         {/* AMOUNT */}

         <input
           type="number"
           placeholder="Enter Amount"
           value={amount}
           onChange={(e) =>
             setAmount(
               e.target.value
             )
           }
         />

         {/* BUTTON */}

         <button
           onClick={handleContinue}
         >

           Continue

         </button>

       </div>

     </div>
   );
 }