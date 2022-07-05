import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function List1(props: { activity: any }) {
    const { activity } = props;
    const [count, setCount] = useState(0);
    const location = useLocation();

    useEffect(() => {
        activity(() => {
            console.log('activity',location)
            setCount((c) => c += 10);
        })
    }, [location,activity]);

    const add = useCallback(() => {
        setCount((c) => c += 1);
        console.log('xxxx')
    }, [])

    return (
        <div>
            list1 {count}
            <input type="text" />
            <button onClick={add}>add</button>
        </div>
    )
}

export default List1;