import { AddressClient } from "@/services/clients/clientsServicesType";

type TFullAddressProps = {
  address: AddressClient;
};
const FullAddress = ({ address }: TFullAddressProps) => {
  return (
    <>
      {address.city && `${address.city},`}{" "}
      {address.street && `${address.street},`}
      {address.numberStreet && ` д.${address.numberStreet},`}
      {address.buildingSection && ` корпус${address.buildingSection},`}
      {address.numberApartment && ` кв.${address.numberApartment},`}
      {address.lobby && ` под.${address.lobby},`}
      {address.floor && ` этаж.${address.floor},`}
      {address.code && ` код.${address.code}`}
    </>
  );
};
export { FullAddress };
