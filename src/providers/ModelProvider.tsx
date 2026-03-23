import { AddUserDialog } from "@/components/models/create-user-model";
import { EditUserDialog } from "@/components/models/edit-user-model";
import { DeleteUserDialog } from "@/components/models/delete-user-modal";
import { CreateBatchDialog } from "@/components/models/create-batch-modal";
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
      <DeleteUserDialog />
      <CreateBatchDialog />
      {/* Add coaching-specific models here as they are created */}
    </>
  );
};

export default ModelProvider;
