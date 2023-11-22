import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createEventSchema } from "@/validation/create-event";
import { eventSettingsSchema } from "@/validation/event-settings";
import { ImageType } from "@prisma/client";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";

export const eventRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        ownerId: ctx.session?.user.id,
      },
    });
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findFirst({ where: { id: input.id } });
    }),
  settings: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.eventSettings.findUnique({
        where: { eventId: input.id },
        include: { event: true },
      });
    }),
  updateSettings: protectedProcedure
    .input(
      eventSettingsSchema.partial().extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
        data: {
          eventSettings: {
            update: {
              isPublic: input.isPublic,
              isWatermarkHidden: input.isWatermarkHidden,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: {
          ...input,
          ownerId: ctx.session.user.id,
          eventSettings: {
            create: {
              isPublic: true,
              isWatermarkHidden: false,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      createEventSchema.partial().extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
        data: {
          name: input.name,
          date: input.date,
          location: input.location,
        },
      });
    }),
  getImages: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findFirst({
        where: {
          id: input.eventId,
        },
        include: {
          images: true,
        },
      });

      if (!event)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event not found.",
        });

      return event.images;
    }),
  addImages: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        images: z.array(
          z.object({
            key: z.string(),
            name: z.string(),
            type: z.enum([ImageType.JPG, ImageType.PNG]),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { images, eventId } = input;

      const data = images.map((image) => ({
        eventId,
        name: image.name,
        url: `${env.AWS_CLOUDFRONT_DOMAIN}/${image.key}`,
        type: image.type,
      }));

      return await ctx.db.image.createMany({
        data,
      });
    }),
  // TODO: delete images, remove faces from rekognition collection
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // TODO: delete rekognition collection
      return await ctx.db.event.delete({
        where: {
          ownerId: ctx.session.user.id,
          id: input.id,
        },
      });
    }),
});
