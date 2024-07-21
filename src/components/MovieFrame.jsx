import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading-movie.json'

// API_HOST = 'localhost';
// API_HOST = '192.168.1.16';
// const API_URL = `http://${API_HOST}:8080/api/v1/frame/api`;
// API_HOST = 'localhost';
// API_HOST = '192.168.1.16';
// const API_URL = `http://${API_HOST}:8080/api/v1/frame/api`;
// const API_URL = `http://192.168.1.16:5000/api/v1/random?id=1Kk23opeC2d2XDcKJBIroI-twleiuJMiYZefQbHT062o`;
const API_URL = `https://g--s.vercel.app/api/v1/random?id=1Kk23opeC2d2XDcKJBIroI-twleiuJMiYZefQbHT062o`;

const BEARER_TOKEN = 'apiKey';

const MovieFrame = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const apiCalledRef = useRef(false); // Add a ref to track if the API has been called

    useEffect(() => {
        if (!apiCalledRef.current) { // Check if the API has already been called
            apiCalledRef.current = true; // Set the flag to true
            axios.get(API_URL, {
                withCredentials: true, // This is important for CORS
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => setData(response.data))
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError(error.message);
                });
        }
    }, [apiCalledRef]); // Add the ref to the dependency array

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === 'n') {
                window.location.reload();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (error) {
        return (
            <div className="App error">
                <div className="error-message">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="App loading">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: 200, height: 200 }}
                />
            </div>
        );
    }

    return (
        <div className="App">
            <div className="gallery">
                <div className="art-piece">
                    <div className="frame">
                        <img src={data.url} alt={data.movie} />
                    </div>
                    <div className="art-info">
                        <h2>{data.movie}</h2>
                        <p>{data.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default MovieFrame;