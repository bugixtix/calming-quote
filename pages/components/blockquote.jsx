import React from "react";

function Blockquote() {
    const quote = " Many of life's failures are people who did not realize how close they were to success when they gave up. "
    const author = "Thomas Edison"
  return (
    <div className="Blockquote">
        <div className="BlockquoteBody">

        <p className="Blockquote--quote">
            <i className="quote-start">&#8220;</i>
            <span className="quote"> 
                {quote}
            </span>
            <i className="quote-end">&#8221;</i>
        </p>
        <div className="Blockquote--author">
            <i>&ndash;</i>
            <span>
                {author}
            </span>
        </div>
        
        </div>
    </div>
  )
}

export default Blockquote