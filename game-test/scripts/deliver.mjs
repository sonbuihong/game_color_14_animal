#!/usr/bin/env node
// Copy dist -> games-dist/games/<id>/<version>/ + manifest.json
import fs from "node:fs"; import fsp from "node:fs/promises"; import path from "node:path";
const ROOT = path.resolve(process.cwd());
const paths = JSON.parse(fs.readFileSync(path.join(ROOT,"scripts/paths.json"),"utf8"));
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT,"package.json"),"utf8"));
const version = pkg.version, gameId = paths.gameId;
const slug = paths.slug || gameId.replace("com.iruka.", "");
const gameConfig = paths.gameConfig || {};
const src = path.join(ROOT,"dist");
const dst = path.resolve(ROOT, paths.artifactsRoot, "games", gameId, version);
if (!fs.existsSync(src)) { console.error("❌ Chưa có dist/. Chạy: npm run build"); process.exit(1); }
await fsp.mkdir(dst, { recursive: true });
async function copyDir(f,t){await fsp.mkdir(t,{recursive:true});for(const e of await fsp.readdir(f,{withFileTypes:true})) {
  const s=path.join(f,e.name), d=path.join(t,e.name); e.isDirectory()?await copyDir(s,d):await fsp.copyFile(s,d);
}}
await copyDir(src,dst);

const cdnBase = paths.cdnBase || "https://storage.googleapis.com/iruka-edu-mini-game";
const manifest = {
  id: gameId,
  slug: slug,
  title: gameConfig.title || pkg.displayName || pkg.name || gameId,
  description: gameConfig.description || "",
  version: version,
  runtime: "iframe-html",
  entryUrl: `${cdnBase}/games/${gameId}/${version}/index.html`,
  iconUrl: gameConfig.iconUrl || "/images/cover.webp",
  thumbnailUrl: gameConfig.thumbnailUrl || `/images/game-cover/${slug}.png`,
  width: 1280,
  height: 720,
  locales: ["vi"],
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
await fsp.writeFile(path.join(dst, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("✅ Deliver OK →", dst);
