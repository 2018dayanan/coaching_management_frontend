import { AddUserDialog } from "@/components/models/create-user-model";
import { EditUserDialog } from "@/components/models/edit-user-model";
import { DeleteUserDialog } from "@/components/models/delete-user-modal";
import { CreateBatchDialog } from "@/components/models/create-batch-modal";
import { EditBatchDialog } from "@/components/models/edit-batch-modal";
import { DeleteBatchDialog } from "@/components/models/delete-batch-modal";
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
      <EditBatchDialog />
      <DeleteBatchDialog />
    </>
  );
};

export default ModelProvider;

