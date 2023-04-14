import React from "react";

interface Props {
  id: number;
  listing: any;
}

const ListingItem = ({ id, listing }: Props) => {
  return <div>{listing.name}</div>;
};

export default ListingItem;
