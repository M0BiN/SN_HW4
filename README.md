# Twitter Network Analysis and Visualization (Social Networks HW4)

This project focuses on analyzing and visualizing interactions within the Twitter network to identify community structures, influential users, and interaction patterns. By leveraging advanced graph-based algorithms and interactive visualizations, it provides insights into how users are grouped and how information flows across the network.

## Key Features

- **Community Detection Algorithms**: 
  - Implemented a range of algorithms, including Louvain, K-Shell, Infomap, Label Propagation, and Spectral Partitioning, to uncover communities within the network.
  - Each algorithm highlights different structural and interactional aspects of the network.
  
- **Interactive Graph Visualization**:
  - Utilized the [Sigma.js](https://sigmajs.org/) library to create a dynamic, web-based interface for exploring the Twitter network.
  - Users can interact with the graph, examine specific nodes, and navigate the network structure.

- **Dynamic Community Exploration**:
  - Includes a dropdown menu to toggle between the results of various community detection algorithms.
  - Visualizes how the network structure shifts with each algorithm's perspective.

- **Node-Level Attributes**:
  - Each node (user) in the network is enriched with detailed attributes, such as:
    - Community membership
    - Centrality metrics: PageRank, Betweenness, and Authority
    - Interaction-related data

- **Exportable HTML Visualization**:
  - Generates an interactive HTML file for offline network visualization.
  - Provides users with the ability to explore and analyze the graph structure independently.

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/M0BiN/SN_HW4.git
   cd SN_HW4
