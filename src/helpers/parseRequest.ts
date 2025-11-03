const _$1 = require("lodash");
const _interopDefault = (e) => (e && e.__esModule ? e : { default: e });
const ___default = /* @__PURE__ */ _interopDefault(_$1);
const parseMultipartData = (ctx) => {
  if (!ctx.is("multipart")) {
    return { data: ctx.request.body, files: {} };
  }
  const { body = {}, files = {} } = ctx.request;
  if (!body.data) {
    return ctx.badRequest(
      `When using multipart/form-data you need to provide your data in a JSON 'data' field.`
    );
  }
  let data;
  try {
    data = JSON.parse(body.data);
  } catch (error) {
    return ctx.badRequest(
      `Invalid 'data' field. 'data' should be a valid JSON.`
    );
  }
  const filesToUpload = Object.keys(files).reduce((acc2, key2) => {
    const fullPath = ___default.default.toPath(key2);
    if (fullPath.length <= 1 || fullPath[0] !== "files") {
      return ctx.badRequest(
        `When using multipart/form-data you need to provide your files by prefixing them with the 'files'.
For example, when a media file is named "avatar", make sure the form key name is "files.avatar"`
      );
    }
    const path = ___default.default.tail(fullPath);
    acc2[path.join(".")] = files[key2];
    return acc2;
  }, {});
  return {
    data,
    files: filesToUpload,
  };
};

exports.parseMultipartData = parseMultipartData;
