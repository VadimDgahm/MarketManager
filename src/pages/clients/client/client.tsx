import { useParams } from "react-router-dom";

export const Client = () => {
  const param = useParams();

  return <div>Client {param.id}</div>;
};
