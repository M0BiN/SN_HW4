# Twitter Network Analysis and Visualization

This project focuses on analyzing and visualizing interactions among Twitter users to uncover community structures and patterns of influence. It employs advanced graph-based algorithms and visualization techniques to showcase how users are grouped into communities based on their interactions and activities on the platform.

## Features

- **Community Detection Algorithms**: Implemented various algorithms such as Louvain, K-Shell, Infomap, Label Propagation, and Spectral Partitioning to detect communities within the Twitter network.
- **Graph Visualization**: Interactive graph visualization using the [Sigma.js](https://sigmajs.org/) library, allowing users to explore the network in a web-based interface.
- **Dynamic Community Switching**: Dropdown menu to switch between the results of different community detection algorithms and visualize the changes in network structure.
- **Node Attributes**: Nodes (users) in the graph are enriched with attributes such as community membership, centrality metrics (PageRank, Betweenness, Authority), and interaction details.
- **HTML Graph Export**: Generates an interactive HTML file to visualize and explore the network offline.

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/M0BiN/SN_HW4.git
   cd twitter-network-analysis
