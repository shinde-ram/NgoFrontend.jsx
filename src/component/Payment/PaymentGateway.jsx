import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NgoService from '../../Service/NgoService';
import UserService from '../../Service/UserService';

function PaymentGateway() {
    const [donationAmount, setDonationAmount] = useState('');
    const {id} = useParams();
    const [ngo,setNgo] = useState('');
    const [donar,setDonar] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{

        const fetch=async()=>{
            try {
                const res =await NgoService.getNgoById(id)
                setNgo(res.data);
                const response = await UserService.accountAccess();
                setDonar(response);  
            } catch (error) {
                console.log(error);
                navigate("/login");
                alert("Please Login First !!");                
            }
        }
        fetch();
    },[id])

    const initiatePayment = async () => {
        try {
          var amt = donationAmount * 100;          
          // Step 1: Create an order on the backend
          const response = await fetch('http://localhost:8080/Transactions/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amt }),
            credentials: "include",
          });
          const data = await response.json();
          const { id: orderId, currency: orderCurrency } = data;
          const imageResponse = await NgoService.getImage(id);
          const imageURL = URL.createObjectURL(imageResponse.data);   
          const options = {        
            key: 'rzp_test_NpUkYCqHCHUJYH', // Your Razorpay key ID
            amount: amt * 100, // Amount to be paid in paise
            currency: orderCurrency,
            name: '1SAATH',
            description: 'Test Payment',
            image: imageURL,
            order_id: orderId,
            handler: function (response) {              
              // Payment handler - send payment details to the backend for verification
              fetch('http://localhost:8080/Transactions/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  user_id:donar.user_id,
                  recipient_id:ngo.ngo_id,
                  amount:donationAmount,
                }),                
              })
                .then((data) => {
                  alert('Payment verification successful!');
                  navigate("/list/"+ngo.ngo_id);
                })
                .catch((error) => {
                    console.log(error);                    
                    alert('Payment verification failed!');
                    navigate("/list/"+ngo.ngo_id);
                });
            },
            prefill: {
              name: ngo.name,
              email: ngo.email,
              contact: ngo.phone,
            },
            theme: {
              color: '#F37254',
            },
          };
    
          // Step 4: Initialize Razorpay and open the payment modal
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } catch (error) {
          console.error('Error creating order:', error);
          alert('Payment failed to initiate.');
          navigate("/list/"+ngo.ngo_id);
        }
      };
    
    return (
        <div className="min-h-screen my-5 md:my-10  flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg shadow-2xl p-10 max-w-xl w-full border border-gray-200">
            <div className='text-xl mb-5'><span className='text-lg'> You are Making Payment for : </span><span className='font-bold text-green-600'>{ngo.name}</span></div>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Donate Now</h2>

                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">Donation Amount (₹)</label>
                    <input
                        type='number'
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                        placeholder="Enter amount in INR"
                        required
                    />
                </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
                        onClick={initiatePayment}
                    >
                        Pay ₹{donationAmount || '...'}
                    </button>
            </div>
        </div>
    );
}

export default PaymentGateway;
