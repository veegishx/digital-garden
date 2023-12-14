---
title: Hosting your own OpenStreetMap tile server for your own convenience
description: This article digs into some of the ways to download OpenStreetMap(OSM) data and serve it via your own map tile server
date: '2023-12-13'
categories:
  - Open Street Map
  - OSM
  - Tile Server
  - Vector Tiles
published: true
---

## Table of Contents

## Why go through the trouble?

Hosting your own maps really makes a lot of sense when you are trying to avoid the fees associated with services like Google Maps and also when you need continuous access to map tiles without any intermittent network issues. In my case, I wanted to be able to access maps hosted on my local network without being connected to the internet. While there are several options out there for my use case, I opted to use Open Street Map (OSM) since it has a huge community support with all kinds of plugins, and especially because it is free!

## Getting started

Before proceeding there are some technical jargons we need to be familiar with.

- **Raster Tiles**: Raster/Bitmap images that together form part of a grid representing a map
- **Vector Tiles**: Unlike Raster tiles, vector tiles are not images but rather raw vector data (geometry + metadata)
- **Tileset**: A collection of cacheable raster or vector tile data which make up a grid of uniform square tiles. Tilesets can be generated for zoom levels ranging from 1 to 22. Naturally the higher the zoom level, the larger the size of the tileset will be.
- **MBTile**: An SQLite database for storing tilesets

## Finding a data source
