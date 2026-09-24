import Button from "@/common/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  type DialogHandle,
} from "@/common/components/dialog";
import { CreateItemForm } from "./create-item-form";
import type { CreateItemRequest } from "../types";
import { useCreateItemMutation } from "../hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { getItemsQueryOptions } from "../hooks/queries";
import { useTranslation } from "react-i18next";

type CreateItemDialogProps = {
  handle: DialogHandle;
};

const formId = "CREATE_ITEM_DIALOG";

export function CreateItemDialog({ handle }: CreateItemDialogProps) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const createItemMutation = useCreateItemMutation();

  function handleSubmit(data: CreateItemRequest) {
    createItemMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getItemsQueryOptions().queryKey,
        });

        handle.close();
      },
      onError: (error) => console.error(JSON.stringify(error, null, 2)),
    });
  }

  return (
    <Dialog handle={handle}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{t("createItemDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("createItemDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <DialogContent>
          <CreateItemForm
            formId={formId}
            defaultValues={{
              name: "",
              description: undefined,
              priority: 1,
              dueDateOnUtc: undefined,
            }}
            onSubmit={handleSubmit}
          />
        </DialogContent>

        <DialogFooter>
          <Button
            form={formId}
            type="submit"
            disabled={createItemMutation.isPending}
          >
            {t("createItemDialog.submit")}
          </Button>

          <DialogClose>
            <Button variant="secondary">{t("createItemDialog.close")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
