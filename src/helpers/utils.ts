export const RouteHandler = async (result, collectionType) => {
  // Find the Route entry associated with the updated item
  const routeEntry = await strapi.db.query("api::route.route").findOne({
    where: {
      PageDocumentID: result.documentId,
      PageCollectionType: collectionType,
      locale: result.locale,
    },
  });

  if (routeEntry) {
    // Update existing Route entry
    await strapi.query("api::route.route").update({
      where: { id: routeEntry.id },
      data: {
        PageTitle: result?.PageTitle,
        PageURL: result?.PageURL,
        PageDocumentID: result?.documentId,
        PageType: result?.PageType ?? "default", // Change this according to the collection type
        PageCollectionType: collectionType ?? "", // Change this according to the collection type
        locale: result.locale, // Ensure the same locale is used
      },
    });
  } else {
    // If no entry exists, create a new one
    await strapi.query("api::route.route").create({
      data: {
        PageTitle: result?.PageTitle,
        PageURL: result?.PageURL,
        PageDocumentID: result?.documentId,
        PageType: result?.PageType ?? "default", // Change this according to the collection type
        PageCollectionType: collectionType ?? "", // Change this according to the collection type
        locale: result.locale, // Ensure the same locale is used
      },
    });
  }
};

export const RouteHandlerDelete = async (result, collectionType) => {
  // Delete the Route entry associated with the deleted item
  await strapi.db.query("api::route.route").delete({
    where: {
      PageDocumentID: result.documentId,
      PageCollectionType: collectionType,
      locale: result.locale,
    },
  });
};
