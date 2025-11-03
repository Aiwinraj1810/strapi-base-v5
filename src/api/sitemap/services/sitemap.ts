/**
 * sitemap service
 */

import { factories } from "@strapi/strapi";
const model = "api::sitemap.sitemap";
export default factories.createCoreService(model, ({ strapi }) => ({
  async getData(ctx) {
    const slug = ctx.request.query["slug"];
    const locale = ctx.request.query["locale"];
    const ALL_BLOCKS: any = strapi.config.get("sitemap-components.ALL_BLOCKS");
    const CHANNEL: any = strapi.config.get("sitemap-components.CHANNEL");
    const GLOBAL_BLOCK = {
      "website-blocks.global-block": {
        populate: {
          ...CHANNEL,
          Block: {
            fields: ["BlockName", "BlockUID"],
            populate: {
              Blocks: {
                on: ALL_BLOCKS,
              },
            },
          },
        },
      },
    };

    const response = await strapi.entityService.findMany(model, {
      locale,
      fields: ["PageTitle", "PageURL"],
      populate: {
        ParentPage: {
          fields: ["PageTitle", "PageURL"],
          populate: {
            ParentPage: {
              fields: ["PageTitle", "PageURL"],
              populate: {
                ParentPage: {
                  fields: ["PageTitle", "PageURL"],
                },
              },
            },
          },
        },
        Blocks: {
          on: {
            ...ALL_BLOCKS,
            ...GLOBAL_BLOCK,
          },
        },
      },
      filters: {
        PageURL: {
          $eq: slug,
        },
      },
    });
    return response;
  },
  async getDataDynamic(ctx) {
    const slug = ctx.request.query["slug"];
    const locale = ctx.request.query["locale"];

    let slugs = slug?.split(",") || [];

    const primaryUID = slugs[slugs.length - 1];
    let filterConditions: any[] = [
      {
        PageUid: {
          $eq: primaryUID,
        },
      },
    ];
    if (slugs?.length === 1) {
      filterConditions.push({
        ParentPage: {
          id: {
            $null: true,
          },
        },
      });
    }
    slugs = slug?.split(",").slice(0, -1)?.reverse() || [];

    for (let i = 0; i < slugs.length; i++) {
      const isLast = i === slugs.length - 1;
      let nestedCondition: any = {
        PageUid: {
          $eq: slugs[i],
        },
      };

      if (isLast) {
        nestedCondition.ParentPage = {
          id: {
            $null: true,
          },
        };
      }

      // Nest the condition inside ParentPage for each level
      for (let j = 0; j <= i; j++) {
        nestedCondition = {
          ParentPage: nestedCondition,
        };
      }
      filterConditions.push(nestedCondition);
    }

    const filters = { $and: filterConditions };

    const ALL_BLOCKS: any = strapi.config.get("sitemap-components.ALL_BLOCKS");
    const CHANNEL: any = strapi.config.get("sitemap-components.CHANNEL");
    const GLOBAL_BLOCK = {
      "website-blocks.global-block": {
        populate: {
          ...CHANNEL,
          Block: {
            fields: ["BlockName", "BlockUID"],
            populate: {
              Blocks: {
                on: ALL_BLOCKS,
              },
            },
          },
        },
      },
    };

    const response = await strapi.entityService.findMany(model, {
      locale,
      filters,
      fields: ["PageTitle", "PageURL"],
      populate: {
        ParentPage: {
          fields: ["PageTitle", "PageURL"],
          populate: {
            ParentPage: {
              fields: ["PageTitle", "PageURL"],
              populate: {
                ParentPage: {
                  fields: ["PageTitle", "PageURL"],
                },
              },
            },
          },
        },
        components: {
          on: {
            ...ALL_BLOCKS,
            ...GLOBAL_BLOCK,
          },
        },
      },
    });

    return response;
  },
}));
