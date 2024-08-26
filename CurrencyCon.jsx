import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import { IoMdSwap } from "react-icons/io";

const CurrencyCon = () => {
  const [currencies, setcurrencies] = useState([])
  const [amount, setamount] = useState(1);
  const [fromcurrencies, setfromcurrencies] = useState("INR")
  const [tocurrencies, settocurrencies] = useState("USD")
  const [convertedAmount, setconvertedAmount] = useState(null)
  const [converting, setconverting] = useState(false)
 
  // to fetch type of currency
  // Used API : https://api.frankfurter.app/currencies
  const fetchcurrencies = async () => {
    try{
      const res = await fetch("https://api.frankfurter.app/currencies")
      const data = await res.json();
      setcurrencies(Object.keys(data));
    }
    catch (error){
      console.error("error fectching",error)
    }
    }
    // to convert 
    // Used Api ->  https://api.frankfurter.app/latest?amount=1&from-USD$to=INR
    const convertcurrency =async () => { 
      if(!amount)return;
      setconverting(true);
      try{
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from-${fromcurrencies}to=${tocurrencies}`);
        const data = await res.json();
        setconvertedAmount(data.rates[tocurrencies]+ " " + tocurrencies)
      }
      catch (error){
        console.error("error fectching",error)
      }
      finally{
        setconverting(false);
      }
     }
    
    //calling function
    useEffect(() => {
      fetchcurrencies();
    }, [])

    const swap = () => { 
      setfromcurrencies(tocurrencies)
      settocurrencies(fromcurrencies)
     }
    
  return (
   <>
   <div>
   
   <div className="max-w-xl md:container flex flex-col md:mx-auto mx-5 mt-20 p-5 bg-white rounded-lg min-h-[50vh] md:w-1/2 shadow-md">
        <h2 className='font-bold text-lg '>Currency Convertor</h2>
        <Dropdown 
        currencies={currencies} 
        title='From:'
        currency={fromcurrencies}
        setcurrency={setfromcurrencies}
        />

        <div className='flex'>
        <button className=' items-center justify-center  text-2xl -mb-5 sm:mb-1'onClick={swap}><IoMdSwap /></button>
        </div>

        <Dropdown  currencies={currencies} title='To:' setcurrency={settocurrencies} currency={tocurrencies}/>
        
        <div className="amount">
          <label htmlFor="amount">Amount:</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 mt-1"value={amount} onChange={(e) =>  setamount(e.target.value)  }/>
        </div>
        <button onClick={convertcurrency} className={`px-5 my-2 py-2 flex items-center  justify-center  bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${converting?"animate-pulse" : ""} `}>Convert </button>

         <div className='mt-4 text-lg font-medium text-right text-green-400'>Converted Amount :{convertedAmount}</div>
        
      </div>
      </div>
   </>
  )
}

export default CurrencyCon
