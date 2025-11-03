import { execSync } from "child_process";

export default () => {
  let buildID = null;
  if (process.env.ENABLE_BUILD_ID == "true") {
    try {
      let args = "";
      if (process.env.BUID_GIT_DIR) {
        args += `--git-dir=${process.env.BUID_GIT_DIR}`;
      }

      const commitHash = execSync(`git ${args} rev-parse HEAD`).toString().trim();

      if (commitHash) {
        buildID = commitHash;
      }
    } catch (error) {
      //suppress errors
    }
  }

  return buildID;
}
