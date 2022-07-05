import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Workplace() {
    const [count, setCount] = useState(0);
    const navigator = useNavigate();

    return (
        <div>
            Workplace {count}
            <div>hello ace</div>
            <input type="text" />
            <div>hello ace</div>
            <input type="text" />
            <div>hello ace</div>
            <input type="text" />
            <div>hello ace</div>
            <input type="text" />
            <div>hello ace</div>
            <input type="text" />
            <button onClick={() => setCount((c) => c += 1)}>add</button>
            <button onClick={() => navigator('/list/list1?name=123')}>to list1</button>
        </div>
    )
}

export default Workplace;