//config\sitemap-components.ts

const POPULATE_ALL = {
  populate: "*",
};
const POPULATE_IMAGE = {
  fields: "*",
  populate: { formats: POPULATE_ALL },
};

const CHANNEL = {
  Channel: {
    fields: ["Channel", "VisibleForLoggedIn"],
  },
};

const BUTTON = {
  Button: {
    fields: ["Title", "URL", "Target"],
    populate: {
      Icon: POPULATE_ALL,
    },
  },
};

module.exports = () => {
  return {
    CHANNEL,
    BUTTON,
    ALL_BLOCKS: {
      "header.header": {
        fields: ["Title", "Subtitle"],
        populate: { Banner: POPULATE_ALL },
      },
      "global.text-image": {
        fields: ["title", "description", "ctaText", "ctaUrl"],
        populate: {
          contentImage: POPULATE_IMAGE,
        },
      },
      "blocks.content": {
        fields: ["content"],
      },
      "blocks.news-listing": {
        fields: ["searchPlaceholder"],
      },
      "blocks.google-map": {
        fields: ["Latitude", "Longitude"],
      },
      "header.banner-slider": {
        populate: {
          Items: {
            fields: ["Title", "Description", "VideoUrl"],
            populate: { Image: POPULATE_IMAGE },
          },
          Common: POPULATE_ALL,
        },
      },
      "blocks.image-info-tabs": {
        fields: ["Title", "Subtitle", "BackgroundColor"],
        populate: {
          Items: {
            fields: ["Title", "Description", "link", "linkLabel"],
            populate: { Image: POPULATE_IMAGE },
          },
          Common: POPULATE_ALL,
        },
      },
      "blocks.about-banner": {
        fields: ["Title", "Subtitle", "VideoUrl"],
        populate: {
          Poster: POPULATE_IMAGE,
          Common: POPULATE_ALL,
        },
      },
      "blocks.counter-main": {
        populate: {
          Counter: POPULATE_ALL,
        },
      },


      "blocks.layered-parent": {
        populate: {
          layeredItem: {
            populate: {
              mainImage: {populate : "*"},
              layerImage: POPULATE_IMAGE,
            },
          },
        },
      },
    },
  };
};
