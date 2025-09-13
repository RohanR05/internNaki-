import React from "react";
import dbConnect, { collectionNames } from "../lib/dbConntect";

const page = async () => {
  const jobCollection = await dbConnect(collectionNames.JOB);
  const data = await jobCollection.find({}).toArray();
  return <div>{JSON.stringify(data)}</div>;
};

export default page;
