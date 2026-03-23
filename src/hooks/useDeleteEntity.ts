import { deleteEducationUser as deleteEntity } from "@/api/educationUserApi";
import { useMutation } from "@tanstack/react-query";

export function useDeleteEntity() {

  return useMutation({
    mutationFn: ({entityId }: {  entityId: string }) =>
      deleteEntity( entityId),
  });
}
