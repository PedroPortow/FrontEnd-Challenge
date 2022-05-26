async function fetchData(){
    const data = await fetch('')
    return data.json()
}

export default fetchData