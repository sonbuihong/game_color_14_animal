#!/usr/bin/env node
// Merge manifest mới vào games-dist/registry/index.json (local). Dùng khi bạn muốn list nhanh cho Hub.
import fs from "node:fs"; import fsp from "node:fs/promises"; import path from "node:path";
const ROOT = path.resolve(process.cwd());
const paths = JSON.parse(await fsp.readFile(path.join(ROOT,"scripts/paths.json"),"utf8"));
const pkg = JSON.parse(await fsp.readFile(path.join(ROOT,"package.json"),"utf8"));
const version = pkg.version, gameId = paths.gameId;
const slug = paths.slug || gameId.replace("com.iruka.", "");
const gameConfig = paths.gameConfig || {};
const registryPath = path.resolve(ROOT, paths.registryFile);
let registry = { generatedAt: new Date().toISOString(), games: [] };
try { registry = JSON.parse(fs.readFileSync(registryPath,"utf8")); } catch {}

const cdnBase = paths.cdnBase || "https://storage.googleapis.com/iruka-edu-mini-game";
const entryUrl = `${cdnBase}/games/${gameId}/${version}/index.html`;

const gameEntry = {
  id: gameId,
  slug: slug,
  title: gameConfig.title || pkg.displayName || pkg.name || gameId,
  description: gameConfig.description || "",
  version: version,
  latest: version,
  versions: [version],
  runtime: "iframe-html",
  entryUrl: entryUrl,
  cdnBase: `${cdnBase}/games/${gameId}/`,
  iconUrl: gameConfig.iconUrl || "/images/cover.webp",
  thumbnailUrl: gameConfig.thumbnailUrl || `/images/game-cover/${slug}.png`,
  capabilities: gameConfig.capabilities || ["telemetry", "score"],
  minHubVersion: gameConfig.minHubVersion || "1.0.0",
  rolloutPercentage: gameConfig.rolloutPercentage ?? 100,
  disabled: gameConfig.disabled ?? false,
  metadata: gameConfig.metadata || {
    difficulty: "Trung bình",
    estimatedTime: 3,
    category: "educational",
    anchors: []
  }
};

const existingIdx = registry.games.findIndex(g => g.id === gameId);
if (existingIdx >= 0) {
  const existing = registry.games[existingIdx];
  gameEntry.versions = existing.versions || [];
  if (!gameEntry.versions.includes(version)) gameEntry.versions.push(version);
  gameEntry.versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  gameEntry.latest = gameEntry.versions[0];
  gameEntry.entryUrl = `${cdnBase}/games/${gameId}/${gameEntry.latest}/index.html`;
  registry.games[existingIdx] = gameEntry;
} else {
  registry.games.push(gameEntry);
}

registry.generatedAt = new Date().toISOString();
await fsp.mkdir(path.dirname(registryPath), { recursive: true });
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log("✅ Registry updated:", registryPath);
