import { useState } from "react";
import { useRouter } from "next/router";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Sponsor = () => {
  const [amount, setAmount] = useState(5);
  const { push } = useRouter();

  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    "currency": "USD",
    "intent": "capture",
  };

  const defaultAmounts = [1, 5, 10, 20];

  const paypalBtnStyle = {
    color: 'gold',
    layout: 'vertical',
    shape: 'pill',
    label: 'paypal',
  };

  return (
    <div className="font-sans text-center bg-gray-800 h-screen flex items-center justify-center bg-inherit">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-white mb-4">Love my work?</h1>
        <p className="text-gray-400">Feel free to support me with a donation!</p>
        <p className="text-gray-400 mt-2">Thanks in advance. Each donation of yours means a lot, however little it might be!</p>
        <input
            type="number"
            className="w-full mt-4 py-2 px-3 text-gray-700 bg-gray-600 rounded focus:outline-none focus:shadow-outline text-white"
            placeholder="Enter Amount text-white"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <div className="flex justify-around mt-4 mb-10 text-white bg-inherit">
            {defaultAmounts.map((buttonAmount) => (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setAmount(buttonAmount)}
                    key={buttonAmount}
                >
                    {buttonAmount}$
                </button>
            ))}
        </div>
        <PayPalScriptProvider options={paypalOptions} className="bg-inherit text-white">
            <PayPalButtons
                className="bg-inherit text-white"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "" + amount,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        push("/").then()
                    });
                }}
            />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default Sponsor;
