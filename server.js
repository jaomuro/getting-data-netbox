import express from "express";
import axios from "axios";
import dotenv from "dotenv"; // Carrega as variáveis de ambiente do arquivo .env
import connectionDb from "./configDB.js";
import { Circuit, Site, Device } from "./models/schemas.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/circuits", async (req, res) => {
  try {
    const bearerToken = process.env.TOKEN;
    const response = await axios.get(process.env.API_URL_CIRCUITS, {
      headers: {
        Authorization: `token ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    const formattedData = newCollectionCircuits(data);
    try {
      await Circuit.deleteMany({});
      console.log(
        'Todos os documentos da coleção "circuits" foram excluídos com sucesso.'
      );
    } catch (error) {
      console.error("Erro ao excluir documentos:", error);
    }
    try {
      const circuitCreated = await Circuit.insertMany(formattedData);
      console.log("Circuitos inseridos no banco de dados com sucesso.");
      res.status(201).json(circuitCreated);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Erro ao inserir circuitos no banco de dados:", error);
    }
  } catch (error) {
    console.error("Erro na requisição à API:", error.message);
    if (error.response) {
      console.error("Detalhes da resposta de erro:", error.response.data);
      console.error("Status do erro:", error.response.status);
    }
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/api/sites", async (req, res) => {
  try {
    const bearerToken = process.env.TOKEN;
    const response = await axios.get(process.env.API_URL_SITES, {
      headers: {
        Authorization: `token ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    const formattedData = newCollectionSites(data);
    try {
      await Site.deleteMany({});
      console.log(
        'Todos os documentos da coleção "circuits" foram excluídos com sucesso.'
      );
    } catch (error) {
      console.error("Erro ao excluir documentos:", error);
    }
    try {
      const siteCreated = await Site.insertMany(formattedData);
      console.log("Circuitos inseridos no banco de dados com sucesso.");
      res.status(201).json(siteCreated);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Erro ao inserir circuitos no banco de dados:", error);
    }
  } catch (error) {
    console.error("Erro na requisição à API:", error.message);
    if (error.response) {
      console.error("Detalhes da resposta de erro:", error.response.data);
      console.error("Status do erro:", error.response.status);
    }
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/api/devices", async (req, res) => {
  try {
    const bearerToken = process.env.TOKEN;
    const response = await axios.get(process.env.API_URL_DEVICES, {
      headers: {
        Authorization: `token ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    const formattedData = newCollectionDevices(data);
    try {
      await Device.deleteMany({});
      console.log(
        'Todos os documentos da coleção "circuits" foram excluídos com sucesso.'
      );
    } catch (error) {
      console.error("Erro ao excluir documentos:", error);
    }
    try {
      const deviceCreated = await Device.insertMany(formattedData);
      console.log("Circuitos inseridos no banco de dados com sucesso.");
      res.status(201).json(deviceCreated);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Erro ao inserir circuitos no banco de dados:", error);
    }
  } catch (error) {
    console.error("Erro na requisição à API:", error.message);
    if (error.response) {
      console.error("Detalhes da resposta de erro:", error.response.data);
      console.error("Status do erro:", error.response.status);
    }
    res.status(500).send("Erro interno do servidor");
  }
});

function newCollectionCircuits(obj) {
  if (!obj || !obj.results)
    return console.log("Parâmetro inválido ou propriedade 'results' ausente");
  return obj.results.map((circuit) => {
    const cleanedUrl = circuit.url ? circuit.url.replace("/api", "") : null;

    return {
      circuitDesignation: circuit.display ?? null,
      circuitProvider: circuit.provider?.display ?? null,
      circuitType: circuit.type?.display ?? null,
      providerDesignation: circuit.custom_fields?.designacao_operadora ?? null,
      terminationA: circuit.termination_a?.site?.display ?? null,
      terminationZ: circuit.termination_z?.site?.display ?? null,
      url: cleanedUrl,
    };
  });
}

function newCollectionSites(obj) {
  if (!obj || !obj.results)
    return console.log("Parâmetro inválido ou propriedade 'results' ausente");
  return obj.results.map((site) => {
    const cleanedUrl = site.url ? site.url.replace("/api", "") : null;

    return {
      siteName: site.display ?? null,
      siteAlias: site.facility ?? null,
      siteOwner: site.tenant?.display ?? null,
      latitude: site.latitude ?? null,
      longitude: site.longitude ?? null,
      type: site.custom_fields.abrigo ?? null,
      powerSupplyContract: site.custom_fields?.Conta_contrato ?? null,
      url: cleanedUrl,
    };
  });
}

function newCollectionDevices(obj) {
  if (!obj || !obj.results)
    return console.log("Parâmetro inválido ou propriedade 'results' ausente");
  return obj.results.map((device) => {
    const cleanedUrl = device.url ? device.url.replace("/api", "") : null;

    return {
      deviceName: device.display ?? null,
      deviceRole: device.device_role?.display ?? null,
      deviceVendor: device.device_type?.manufacturer?.display ?? null,
      deviceModel: device.device_type?.model ?? null,
      deviceOwner: device.tenant?.display ?? null,
      primaryIp: device.primary_ip?.display ?? null,
      url: cleanedUrl,
    };
  });
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
