import { useNavigate } from "react-router-dom";

const SuccessPopup = ({who}) => {
  const navigate = useNavigate();
  const name = who === 'u' ? "You" : "Ngo";
  const close = () => {
    if(who === 'u'){
    navigate("/login");
    } // Navigate to the list page when the button is clicked
    else{
      navigate("/list");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p className="mb-4">{ who === 'u' ? "You Are Register Successfull" : "Ngo Has Been Register Successfull"}</p>
        <button
          onClick={close} // No need to pass onClose here
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
