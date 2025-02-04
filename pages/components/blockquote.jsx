import React, { useEffect, useState } from "react";
import QUOTES from "@/pages/quote_list.json"
function Blockquote() {
    const [currentDate, setCurrenDate] = useState("Heute, der 01.01.2099")
    const [quote, setQuote] = useState("")

    function CurrentDate() {
        const heute = new Date();
        const options = {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        };
        const formattedDate = heute.toLocaleDateString("de-DE", options);
        return formattedDate.replace(",", " der");
      }
      

    useEffect(()=>{
        const currentDate_ = CurrentDate();
        setCurrenDate(currentDate_)
        const today = new Date().getDate();
        const foundQuote = QUOTES.find((q)=>q.day === today)
        setQuote(foundQuote)
    },[])
  return (
    <div className="Blockquote">
        <div className="BlockquoteBody">
        <p className="Blockquote--date">
            {currentDate}
        </p>
        <p className="Blockquote--quote">
            <i className="quote-start">&#8220;</i>
            <span className="quote"> 
                {quote?.text||"Der Spruch wird geladen..."}
            </span>
            <i className="quote-end">&#8221;</i>
        </p>
        <div className="Blockquote--author">
            <i>&ndash;</i>
            <span>
                {quote?.author||"Der Host"}
            </span>
        </div>
        
        </div>
    </div>
  )
}

export default Blockquote