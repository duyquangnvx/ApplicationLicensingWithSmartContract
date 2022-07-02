import React, {useEffect, useState} from 'react'

const HomePage = ({}) => {

    const [license, setLicense] = useState({})

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {

    }

    return (
        <div>
            <h1>HomePage works</h1>
        </div>
    )
}

export default HomePage;
