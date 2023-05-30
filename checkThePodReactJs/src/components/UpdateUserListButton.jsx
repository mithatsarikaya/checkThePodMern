import useFetch from "../hooks/useFetch";

export default function UpdateUserList({
  anyChange,
  pod,
  setIsLoading,
  setServerMessage,
}) {
  const { fetchFromUser } = useFetch();
  function handleUpdateUsers(e) {
    e.preventDefault();
    setIsLoading(true);
    fetchFromUser("PATCH", "pods", pod)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((jsonData) => {
        setServerMessage(jsonData.message);
      });
  }

  return (
    <button
      onClick={handleUpdateUsers}
      className="createPod--button"
      disabled={!anyChange}
    >
      Update Users
    </button>
  );
}
