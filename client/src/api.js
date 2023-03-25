export const fetchResponse = async(chat) => {
    try {
        const response = await fetch('http://localhost:3080/',{
            method: 'POST',                                           // router expect post
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: chat.map((message)=> message.message).join(" \n ")   //here chatGPT should know precious message that we sent so it can give more accurate answers

            })
        })

        const data= await response.json()
        return data
       } catch (error) {
        console.log(error);
       }
}