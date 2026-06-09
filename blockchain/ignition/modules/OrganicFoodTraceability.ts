import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OrganicFoodTraceabilityModule = buildModule("OrganicFoodTraceabilityModule", (m) => {
  const organicFoodTraceability = m.contract("OrganicFoodTraceability");

  return { organicFoodTraceability };
});

export default OrganicFoodTraceabilityModule;
