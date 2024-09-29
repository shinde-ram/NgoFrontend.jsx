import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NgoService from '../../Service/NgoService';
import googlePayImage from '../../images/googlepay.avif';
import phonePayImage from '../../images/phonepay.webp';
import paytmImage from '../../images/paytm.webp';

function PaymentGateway() {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');
    const [donationAmount, setDonationAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [atmPin, setAtmPin] = useState('');
    const [enterUpiManually, setEnterUpiManually] = useState(false);
    const {id} = useParams();
    const [ngo,setNgo] = useState('');

    useEffect(()=>{

        const fetch=async()=>{
            try {
                const res =await NgoService.getNgoById(id)
                setNgo(res.data);
            } catch (error) {
                console.log(error);
                
            }
        }
        fetch();
    },[id])

    const handlePayment = (e) => {
        e.preventDefault();
        const paymentDetails = {
            amount: donationAmount,
            method: selectedMethod,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            atmPin: selectedMethod === 'debit-card' ? atmPin : null,
            upiId: selectedMethod === 'upi' && enterUpiManually ? upiId : null
        };
        alert(`Processing payment of ₹${donationAmount} via ${JSON.stringify(paymentDetails)}`);
        // Add payment processing logic here
    };

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        setEnterUpiManually(false); // Reset UPI ID entry
        setUpiId(''); // Clear UPI ID when switching methods
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

                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">Choose Payment Method</label>
                    <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => handleMethodChange('credit-card')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold border transition duration-300 ${selectedMethod === 'credit-card' ? 'bg-purple-600 text-white border-purple-700 shadow-lg' : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'}`}
                        >
                            Credit Card
                        </button>
                        <button
                            onClick={() => handleMethodChange('debit-card')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold border transition duration-300 ${selectedMethod === 'debit-card' ? 'bg-purple-600 text-white border-purple-700 shadow-lg' : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'}`}
                        >
                            Debit Card
                        </button>
                        <button
                            onClick={() => handleMethodChange('upi')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold border transition duration-300 ${selectedMethod === 'upi' ? 'bg-purple-600 text-white border-purple-700 shadow-lg' : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'}`}
                        >
                            UPI / Payment Apps
                        </button>
                    </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                    {selectedMethod === 'credit-card' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">Card Number</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="123"
                                    maxLength="3"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'debit-card' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">Card Number</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="123"
                                    maxLength="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2">ATM PIN</label>
                                <input
                                    type="password"
                                    value={atmPin}
                                    onChange={(e) => setAtmPin(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300"
                                    placeholder="Enter your ATM PIN"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'upi' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-lg font-semibold mb-2">UPI ID or App</label>
                            <div className="flex w-full justify-around py-4 space-x-4 mb-4">
                                <button className="flex flex-col items-center" type="button" onClick={() => setEnterUpiManually(false)}>
                                    <img src={`${googlePayImage}`} alt="Google Pay" className="w-16 h-16 rounded-full mb-2" />
                                    <span className="text-gray-800">Google Pay</span>
                                </button>
                                <button className="flex flex-col items-center" type="button" onClick={() => setEnterUpiManually(false)}>
                                    <img src={`${phonePayImage}`} alt="PhonePe" className="w-16 h-16 rounded-full mb-2" />
                                    <span className="text-gray-800">PhonePe</span>
                                </button>
                                <button className="flex flex-col items-center" type="button" onClick={() => setEnterUpiManually(false)}>
                                    <img src={`${paytmImage}`} alt="Paytm" className="w-16 h-16 rounded-full mb-2" />
                                    <span className="text-gray-800">Paytm</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setEnterUpiManually(true);
                                    setUpiId(''); // Clear UPI ID when switching to manual entry
                                }}
                                className="w-full px-4 py-3 rounded-lg font-semibold border bg-gray-200 text-gray-800 transition duration-300 hover:bg-gray-300"
                            >
                                Enter UPI ID
                            </button>

                            {enterUpiManually && (
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-300 mt-2"
                                    placeholder="yourupiid@bank"
                                    required
                                />
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
                    >
                        Pay ₹{donationAmount || '...'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentGateway;
