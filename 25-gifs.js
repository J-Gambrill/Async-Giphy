require('dotenv').config({ path: 'api.env'});

const endpoint = 'https://api.giphy.com/v1/gifs/search'


async function helperFunction(query){
    let num = 0
    while (num < 25) {
        const gifUrl = await getImage(query, num)

        if (gifUrl) {
            console.log(`gif ${num + 1}:`, gifUrl)
        }

        num++
    }
}




async function getImage(query, num){
    const url = `${endpoint}?api_key=${process.env.API_KEY}&q=${encodeURIComponent(query)}&limit=25&offset=0&rating=r&lang=en&bundle=messaging_non_clips`
    
    try {
        
        const response = await fetch (url)
        
        if(!response.ok) {
         
            throw new Error(`HTTP error. Status: ${response.status}`); 

        }

        const data = await response.json()

        if (data.data.length > num) {

            const gifUrl = data.data[num].images.original.url
            return gifUrl

        }else {

            console.log('No GIFs found for given query')
            return null

        }
    } catch (error) {
        console.error('Error fetching GIF:', error)
        return null
    }
    

}



helperFunction('house')

// Print out value of API key stored in .env file
console.log(process.env.API_KEY)