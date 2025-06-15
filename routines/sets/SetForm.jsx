import useQuery from "../../api/useQuery";
import useMutation from "../..//api/useMutation";

export default function SetForm ({ routineId }) {
    const {
        data: activities,
        loading: loadingActivities,
        error: activitiesError
    } = useQuery("/activities", "activies");

    const {
        mutate: addSet, 
        loading, 
        error,
    } = useMutation ("POST", "/sets", ["routines", "routine"]);

    if (loadingActivities) return <p>Loading activities...</p>;
    if (activitiesError || !activities) return <p>Sorry {activitiesError}</p>

    const onAddSet = async (formData) => {
        const activityId = formData.get("activity");
        const count = formData.get("count");
        await addSet({ activityId, routineId, count });
    };

    return (
        <>
        <h2>Add A Set</h2>
        <form action={onAddSet}>
            <label>
                Activity
                <select name="activity">
                    {activities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                            {activity.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Count
                <input type="number" name="count" />
            </label>
            <button>{loading ? "Adding..." : "Add Set"}</button>
            {error && <output>{error}</output>}
        </form>
        </>
    )
}