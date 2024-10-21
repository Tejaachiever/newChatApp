import React, { useRef, useEffect } from 'react'
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"
import ScrollToBottom from "react-scroll-to-bottom";

function ChatMessages({ extractedMsg  }) {

  const scrollRef = useRef();



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extractedMsg]);



  return (

    <Container className="chat-container"  >

      {
        extractedMsg.map((msg) => {
          return (

            <div

              ref={scrollRef}
              key={uuidv4()}
            >


              <div className={`chat-msg ${msg.from_me ? "sent" : "received"}`} >


                <div className="content">

                {msg.from_me && <span className="sender-label">You</span>}
                  <p >
                    {msg.message}


                  </p>


                </div>
              </div>
            </div>
          )
        })
      }



    </Container>

  )
}


const Container = styled.div`
  background-color:#360303 ;

  padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

 

    &::-webkit-scrollbar{
        width: 0.4rem;
        &-thumb{
            background-color:  #5c6d6ba0 ;
            width: 0.5rem;
            border-radius: 1rem;
        }
    }


    .sender-label {
  font-size: 0.6rem; /* Small text */
  font-weight: bold;  /* Make it bold */
  color: #014105;     /* Light green color to make it stand out */
  margin-bottom: 2px; /* Adds some space between the label and the message */
  display: block;     /* Ensures it takes its own line */
}

    .chat-msg{

// common to both sent and received msg



padding: 0.5rem;
color: white;
display: flex;

.content{
  max-width: 40%;
overflow-wrap: break-word;
font-size: 1rem;
padding: 0.8rem;
border-radius: 1rem;
//changes
min-width: 8rem;

}


}
  


    .sent{

      justify-content: flex-end;
      
      .content{
        
        background-color: #2d772d;
 

}
}

.received{
  justify-content: flex-start;
  
  
  .content{
    
    background-color: #72531a;
    max-width: 40%;
overflow-wrap: break-word;
font: 1rem;
padding: 0.5rem;


}
}








 


`

export default ChatMessages