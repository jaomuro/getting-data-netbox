import { Schema, model } from "mongoose";

const CircuitSchema = new Schema({
  circuitDesignation: String,
  circuitProvider: String,
  circuitType: String,
  providerDesignation: String,
  terminationA: String,
  terminationZ: String,
  url: String,
});

const SiteSchema = new Schema({
  siteName: String,
  siteAlias: String,
  siteOwner: String,
  latitude: Number,
  longitude: Number,
  type: String,
  powerSupplyContract: String,
  url: String,
});

const DeviceSchema = new Schema({
  deviceName: String,
  deviceRole: String,
  deviceVendor: String,
  deviceModel: String,
  deviceOwner: String,
  primaryIp: String,
  url: String,
});

const Circuit = model("circuits", CircuitSchema);
const Site = model("sites", SiteSchema);
const Device = model("devices", DeviceSchema);

export { Circuit, Site, Device };
