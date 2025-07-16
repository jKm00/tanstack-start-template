import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { todoService } from "./service";
import { getHeaders } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

const addTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const addTodo = createServerFn({
  method: "POST",
})
  .validator(addTodoSchema)
  .handler(async (ctx) => {
    const headers = await getHeaders();
    // @ts-ignore
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthenticated");
    }

    await todoService.addTodo({
      title: ctx.data.title,
      userId: session.user.id,
    });
  });
