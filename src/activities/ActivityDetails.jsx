import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext"
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
    const { token } = useAuth();
    const { id } = useParams();
    const {
        data: activity, loading, error,
    } = useQuery (`/activities/${id}`, "activity");

    if(loading) return <p>Loading...</p>
    if (error || !activity) return <p>Sorry {error}</p>

    return (
        <>
        <h1>{activity.name}</h1>
        <p>by {activity.creatorName}</p>
        {token && <DeleteButton id={activity.id} />}
        </>
    );
}

function DeleteButton ({ id }) {
    const navigate = useNavigate();
    const {
        mutate: deleteActivity, loading, error,
    } = useMutation("DELETE", "/activities/" + id, ["activities", "activity"]);

    const onDeleteActivity = async () => {
        const success = await deleteActivity();
        if (success) navigate("/activities")
};

return (
    <button onClick={onDeleteActivity}>
        {loading ? "Deleting" : (error ?? "Delete")}
    </button>
);
}