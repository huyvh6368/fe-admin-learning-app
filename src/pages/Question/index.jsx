import { useParams } from 'react-router-dom';

function Question() {
    const { id } = useParams(); // ✅ Gọi hàm useParams() - id này là id của topic 

    console.log("id topic:", id);

    return (
        <h1>
            Question với topic id: {id}
        </h1>
    );
}

export default Question;
