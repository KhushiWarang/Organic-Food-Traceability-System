import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "./src/lib/wagmi-generated.ts",
  contracts: [],
  plugins: [
    hardhat({ project: "../blockchain" }),
    react(),
  ],
});
