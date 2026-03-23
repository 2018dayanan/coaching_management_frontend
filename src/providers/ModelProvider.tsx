import { AddUserDialog } from "@/components/models/create-user-model";
import { EditUserDialog } from "@/components/models/edit-user-model";
import { useState, useEffect } from "react";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddUserDialog />
      <EditUserDialog />
      {/* Add coaching-specific models here as they are created */}
    </>
  );
};

export default ModelProvider;
