import { Link } from "react-router";

import useQuery from "../api/useQuery";

export default function RoutineList() {
    const { data: routines, loading, error } = useQuery("/routines", "routines");

    if (loading || !routines) return <p>Loading...</p>;
    if (error) return <p>Opps! {error}</p>

    return (
        <ul>
            {routines.map((routine) => (
                <RoutineListItem key={routine.id} routine={routine} />
            ))}
        </ul>
    )
}

function RoutineListItem({ routine }) {
    return (
     <li>
        <p>
         <Link to={"/routines/" + routine.id}>{routine.name}</Link>
        </p>
    </li>
    )
}