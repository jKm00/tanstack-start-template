import z from "zod";

export const addTodoValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const editTodoValidation = z.object({
  id: z.uuid("Invalid ID format"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});
