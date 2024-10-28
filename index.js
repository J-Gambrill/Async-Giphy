require('dotenv').config({ path: 'api.env'});

const endpoint = 'https://api.giphy.com/v1/gifs/search'

async function getImage(query){
    const url = `${endpoint}?api_key=${process.env.API_key}&q=${encodeURIComponent(query)}&limit=25&offset=0&rating=r&lang=en&bundle=messaging_non_clips`
    
    try {
        
        const response = await fetch (url)
        
        if(!response.ok) {
         
            throw new Error(`HTTP error. Status: ${response.status}`); 

        }

        const data = await response.json()

        if (data.data.length > 0) {

            const gifUrl = data.data[0].images.original.url
            console.log(gifUrl)
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

getImage('house')

// Print out value of API key stored in .env file
console.log(process.env.API_KEY)