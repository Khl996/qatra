import React, { useEffect, useState } from 'react';
import { api } from '../config/api.config';

interface Point {
    id: string;
    userId: string;
    points: number;
    createdAt: string;
    updatedAt: string;
}

const HomePage: React.FC = () => {
    const [data, setData] = useState<Point[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/points');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default HomePage;
